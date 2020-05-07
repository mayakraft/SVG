Vue.component("button-mode", {
  props: ["mode"],
  template: `<div class="button-tap-mode">
    <i :class="mode" :style="'background-image: url(./images/'+mode+'.svg)'"></i>
  </div>`
});

var app = new Vue({
  el: "#app",
  data: {
    state: "bisect",
    states,
    moves: []
  },
  methods: {
    changeMode: function (...args) {
      this.state = args[0].target.className;
    },
  }
});

const Snap = (points, point) => {
  const pt = point.x != null ? [point.x, point.y] : point;
  const pts = points.map(a => a.x != null ? [a.x, a.y] : a);
  const nearest = math.core.nearest_point(pt, pts);
  if (nearest && math.core.distance2(pt, nearest) < 0.05) {
    delete point.x;
    delete point.y;
    Object.defineProperty(point, "x", {get: () => nearest[0], enumerable: true});
    Object.defineProperty(point, "y", {get: () => nearest[1], enumerable: true});
  }
  return point;
};

const UI = function (svg) {
  const ui = {};
  ui.layer = svg.g().stroke("black").fill("none").strokeWidth(0.001);
  const dragPoints = [];
  let press;
  ui.onMove = function (e) {
    ui.layer.removeChildren();
    if (e.buttons > 0) {
      dragPoints.push(e);
      ui.layer.appendChild(states[app.state].svg([press, e]));
    }
  };
  ui.onPress = function (e) {
    press = e;
    dragPoints.length = 0;
    dragPoints.push(e);
  };
  ui.onRelease = function (e) {
    dragPoints.length = 0;
    ui.layer.removeChildren();
  };
  return ui;
};

const History = function () {
  const history = [];
  let press;
  history.onPress = function (e) {
    press = e;
  };
  history.onRelease = function (e) {
    history.push({
      state: app.state,
      arguments: [press, e],
    });
  };
  return history;
};

const Intersections = function (history) {
  const primitives = history
    .map(entry => states[entry.state].math(...entry.arguments))
    .filter(el => el != null);

  return Array.from(Array(primitives.length))
    .map((_, i) => Array.from(Array(i))
      .map((_, j) => primitives[i].intersect(primitives[j]))
      .filter(a => a != null)
      .map(s => s.constructor === Array && typeof s[0] != "number" ? s : [s]))
    .map(a => a.reduce((a,b) => a.concat(b), []))
    .reduce((a,b) => a.concat(b), []);
};

// infinity box
const infinityBox = math.polygon(
  [-1000, -1000],
  [1000, -1000],
  [1000, 1000],
  [-1000, 1000]);

SVG(1, 1, document.querySelectorAll(".canvas-container")[0], (svg) => {
  svg.background("white");
  const drawLayer = svg.g()
    .stroke("black")
    .fill("none")
    .strokeWidth(0.001);

  const ui = UI(svg);
  const history = History();
  let snapPoints = [];
  window.hist = history;

  const didChange = () => {
    drawLayer.removeChildren();

    // convert the history into svg shapes
    history.map(entry => states[entry.state].svg(...entry.arguments))
      .filter(el => el != null)
      .forEach(el => drawLayer.appendChild(el));

    // snap-points are arguments + intersections 
    const args = history.map(h => h.arguments).reduce((a,b) => a.concat(b), []);
    const intersects = Intersections(history);
    snapPoints = args.concat(intersects);

    // draw all the arguments and intersection points
    [args, intersects].forEach((arr, i) => arr
      .forEach(p => drawLayer.circle(p).radius(0.01)
        .fill(["#fb4", "#e53"][i])
        .stroke("none")));
  };

  svg.onPress = function (e) {
    e = Snap(snapPoints, e);
    ui.onPress(e);
    history.onPress(e);
  };
  svg.onRelease = function (e) {
    e = Snap(snapPoints, e);
    ui.onRelease(e);
    history.onRelease(e);
    didChange();
  };
  svg.onMove = function (e) {
    e = Snap(snapPoints, e);
    ui.onMove(e);
  };
});

