Vue.component("button-mode", {
  props: ["mode"],
  template: `<div class="button-tap-mode">
    <i :class="mode" :style="'background-image: url(./images/'+mode+'.svg)'"></i>
  </div>`
});

const states = {
  select: {
    shape: (e, pts) => {},
  },
  remove: {
    shape: (e, pts) => {},
  },
  line: {
    shape: (e, pts) => {},
  },
  ray: {
    shape: (e, pts) => {},
  },
  segment: {
    shape: (e, pts) => SVG.line(pts[0], pts[pts.length-1]),
  },
  circle: {
    shape: (e, pts) => SVG.circle(pts[0], pts[pts.length-1]),
  },
  "perpendicular-bisector": {
    shape: (e, pts) => {},
  },
  bisect: {
    shape: (e, pts) => SVG.polyline(dragPoints),
  },
  "perpendicular-to": {
    shape: (e, pts) => {},
  },
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
  const layer = svg.g()
    .stroke("black")
    .fill("none")
    .strokeWidth(0.001);
  const dragPoints = [];
  ui.onMove = function (e) {
    layer.removeChildren();
    if (e.buttons > 0) {
      dragPoints.push(e);
      if (typeof states[app.state].shape === "function") {
        const el = states[app.state].shape(e, dragPoints);
        if (el) {
          layer.appendChild(el);
        }
      }
    }
  };
  ui.onPress = function (e) {
    dragPoints.length = 0;
    dragPoints.push(e);
  };
  ui.onRelease = function (e) {
    dragPoints.length = 0;
  };
  return ui;
};

const Data = function () {
  const data = [];
  let press;
  data.onMove = function (e) {
  };
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

SVG(1, 1, document.querySelectorAll(".canvas-container")[0], (svg) => {
  svg.background("white");
  const ui = UI(svg);
  const data = Data();
  window.data = data;
  const drawLayer = svg.g()
    .stroke("black")
    .fill("none")
    .strokeWidth(0.001);

  const draw = () => {
    drawLayer.removeChildren();
    data.map(d => states[d.state].shape(undefined, d.points))
      .filter(el => el != null)
      .forEach(el => drawLayer.appendChild(el));
  };

  svg.onPress = function (e) {
    ui.onPress(e);
    data.onPress(e);
  };
  svg.onMove = function (e) {
    ui.onMove(e);
    data.onMove(e);
  };
  svg.onRelease = function (e) {
    ui.onRelease(e);
    data.onRelease(e);
    draw();
  };
});

