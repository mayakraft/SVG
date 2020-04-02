Vue.component("button-mode", {
  props: ["mode"],
  template: `<div class="button-tap-mode">
    <i :class="mode" :style="'background-image: url(./images/'+mode+'.svg)'"></i>
  </div>`
});

const states = {
  select: {
    shape: pts => SVG.rect(
      pts[0].x,
      pts[0].y,
      pts[pts.length-1].x - pts[0].x,
      pts[pts.length-1].y - pts[0].y)
    .strokeWidth(0.004)
    .strokeDasharray(0.01),
    math: math.rectangle.fromPoints,
  },
  remove: {
    shape: SVG.g,
    math: pts => {},
  },
  line: {
    shape: (...pts) => SVG.line(infinityBox.clipLine(math.line.fromPoints(...pts))),
    math: math.line.fromPoints,
  },
  ray: {
    shape: SVG.g,
    math: math.ray,
  },
  segment: {
    shape: SVG.line,
    math: math.segment,
  },
  circle: {
    shape: SVG.circle,
    math: math.circle,
  },
  "perpendicular-bisector": {
    shape: SVG.g,
    math: math.line.perpendicularBisector,
  },
  bisect: {
    shape: SVG.polyline,
    math: pts => {},
  },
  "perpendicular-to": {
    shape: SVG.g,
    math: pts => {},
  },
  polygon: {
    shape: SVG.g,
    math: math.polygon,
  },
  // this will create an entry in the Data that a previous
  // shape has been mutated.
  alter: {
    shape: SVG.g,
    math: pts => {},
  }
};
// <i class='icon {{mode}}'></i>

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

const UI = function (svg) {
  const ui = {};
  ui.layer = svg.g()
    .stroke("black")
    .fill("none")
    .strokeWidth(0.001);
  const dragPoints = [];
  let press;
  ui.onMove = function (e) {
    ui.layer.removeChildren();
    // ui.layer.circle(e.x, e.y, 0.002).fill("red").stroke("none");
    if (e.buttons > 0) {
      dragPoints.push(e);
      ui.layer.appendChild(states[app.state].shape([press, e]));
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

const Maths = function (data) {
  const maths = {};
  maths.points = [];
  maths.intersections = [];
  maths.mathObjects = [];
  maths.nearest = {
    vertex: undefined,
    edge: undefined,
    face: undefined,
  };
  let press;
  maths.onMove = function (e) {
    const pts = maths.points.concat(maths.intersections)
      .reduce((a, b) => a.concat(b), [])
      .map(a => a.x != null ? [a.x, a.y] : a);
    maths.nearest.vertex = math.core.nearest_point([e.x, e.y], pts);
    // remove points too far away
    if (maths.nearest.vertex && math.core.distance2([e.x, e.y], maths.nearest.vertex) > 0.02) {
      maths.nearest.vertex = undefined;
    }
  };
  maths.onPress = function (e) {
    if (maths.nearest.vertex) {
      e = maths.nearest.vertex;
    }
    press = e;
    return e;
  };
  maths.onRelease = function (e) {
    if (maths.nearest.vertex) {
      e = maths.nearest.vertex;
    }
    const mathObject = states[app.state].math([press, e]);
    maths.mathObjects.push(mathObject);
    const newIntersections = mathObject.intersect == null
      ? []
      : Array.from(Array(maths.intersections.length))
        .map((_, i) => mathObject.intersect(maths.mathObjects[i]));
    maths.intersections.push(newIntersections);
    maths.points.push([press, e]);
    console.log(maths.mathObjects);
    console.log(maths.intersections);
    return e;
  };
  return maths;
};

const Data = function () {
  const data = [];
  let press;
  data.onMove = function (e) {};
  data.onPress = function (e) {
    press = e;
  };
  data.onRelease = function (e) {
    data.push({
      state: app.state,
      points: [press, e],
    });
  };
  return data;
};

window.data;

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
  const data = Data();
  const maths = Maths(data);
  window.data = data;

  const draw = () => {
    drawLayer.removeChildren();
    data.map(d => states[d.state].shape(d.points))
      .filter(el => el != null)
      .forEach(el => drawLayer.appendChild(el));
  };

  svg.onPress = function (e) {
    e = maths.onPress(e);
    ui.onPress(e);
    data.onPress(e);
  };
  svg.onRelease = function (e) {
    e = maths.onRelease(e);
    ui.onRelease(e);
    data.onRelease(e);
    draw();
  };
  svg.onMove = function (e) {
    ui.onMove(e);
    data.onMove(e);
    maths.onMove(e);
    Object.keys(maths.nearest)
      .filter(a => maths.nearest[a] !== undefined)
      .forEach(p => ui.layer.circle(maths.nearest[p])
        .radius(0.005)
        .fill("#e53")
        .stroke("none"));
  };
});

