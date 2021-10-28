var examples = [
  "var elementParent = document.querySelector('#svg-parent');\nsvg1 = SVG(elementParent);\n\nsvg1.size(-2, -1, 4, 2);\nsvg1.background('black');\n\nsvg1.circle(1).fill('white');",
  "svg2.line(20, 20, 280, 130)\n  .stroke('black');\n\nsvg2.line([20, 130], [280, 20])\n  .stroke('#000')\n  .strokeWidth(12)\n  .strokeDasharray('16 4 36');",
  "svg3.circle(150, 75, 75);",
  "for (var i = 0; i < 100; i += 10) {\n  svg4.ellipse(150, 75, 100-i, 75)\n    .fill('#000' + i/10);\n}",
  "svg5.rect(25, 25, 250, 100)\n  .stroke('crimson')\n  .strokeWidth(10);",
  "svg6.polygon(10, 10, 300, 50, 180, 150)\n  .fill('black');\n\nvar points = [\n  [200,20],\n  [200,120],\n  [100,20],\n  [100,100]];\n\nsvg6.polygon(points)\n  .fill('crimson');\n",
  "svg7.polyline(0, 10, 280, 0, 260, 140, 10, 150);\n\nvar p = svg7.polyline()\n  .stroke('crimson')\n  .fill('none')\n  .strokeWidth(10);\n\nfor (var x = 0; x < 300; x += 20) {\n  p.addPoint(x, Math.random() * 150);\n}",
  "svg8.path()\n  .stroke('crimson')\n  .strokeWidth(10)\n  .fill('none')\n  .Move(250, 100)\n  .Line(60, 10)\n  .curve(-20, 100, 300, 0, 200, 100)\n  .ellipse(50, 50, 0, 0, 1, -80, -80);",
  "svg9.text('abc あいう 🥰🤩🥳', 0, 100)\n  .fill('gold')\n  .fontSize('34px');",
  "var layer = svg10.g().fill('crimson');\n\nsvg10.rect(130, 0, 40, 150).fill('black');\n\nlayer.rect(0, 55, 300, 40);",
  "var clip = svg11.clipPath();\nclip.text('clipping', 0, 95)\n  .fontSize('80px');\n\nsvg11.line(0, 75, 300, 75)\n  .stroke('black')\n  .strokeWidth(20)\n  .clipPath(clip);\n\nsvg11.line(0, 30, 300, 120)\n  .stroke('crimson')\n  .strokeWidth(20)\n  .clipPath(clip);",
  "svg12.rect(300, 30, 0, 90).fill('crimson');\nsvg12.fontWeight(900)\n  .fontSize('100px');\n\nvar m = svg12.mask();\nm.text('MASK', 0, 100).fill('white');\nm.text('MASK', 5, 102).fill('black');\nsvg12.rect(300, 150)\n  .fill('black')\n  .mask(m);",
  "svg13.strokeWidth(10)\n  .stroke('black')\n  .fill('crimson');\n\nsvg13.regularPolygon(10, 150, 75, 72);\nsvg13.regularPolygon(5, 150, 75, 48);",
  "svg14.parabola(0, 150, 300, -150)\n  .fill('crimson');",
  "for (var i = 0; i < 1.25; i += 0.1) {\n  svg15.curve(0, 150, 300, 150)\n    .bend(i)\n    .stroke('crimson')\n    .fill('none');\n}",
  "svg16.arc(150, 75, 65, Math.PI/2, Math.PI*7/4)\n  .fill('crimson')\n  .stroke('black')\n  .strokeWidth(10);",
  "svg17.wedge(150, 75, 65, Math.PI/2, Math.PI*7/4)\n  .fill('crimson')\n  .stroke('black')\n  .strokeWidth(10);",
  "svg18.arrow(50, 75, 250, 75)\n  .head({ width: 20, height: 30 })\n  .bend(0.33)\n  .fill('crimson')\n  .stroke('crimson')\n  .strokeWidth(5);",
  "svg19.onMove = function (mouse) {\n  svg19.circle(mouse.x, mouse.y)\n    .radius(10)\n    .fill('#0001');\n};",
  "var c = svg20.circle(150, 75, 25);\n\nsvg20.play = function (e) {\n  c.setCenter(Math.sin(e.time) * 100 + 150, 75);\n};\n",
];

document.addEventListener("DOMContentLoaded", function () {
  examples.forEach(function(code, i) {
    var app = LiveCode(document.querySelectorAll(".sketch-" + (i+1))[0]);
    
    var svg;

    if (i+1 === 1) {
      app.dom.canvas.setAttribute("id", "svg-parent");
    } else {
      svg = window["svg" + (i+1)] = SVG(app.dom.canvas, 300, 150);
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    }
    app.injectCode(code);

    app.didPause = function (paused) { };
    app.didUpdate = function () { };
    app.didBeginUpdate = function () {
      if (i+1 === 1) {
        if (window.svg1) {
          window.svg1.remove();
        }
        svg = null;
      }
      if (svg == null) { return };

      var keepThese = ["version", "xmlns", "class", "width", "height"];
      while (svg.lastChild) { svg.removeChild(svg.lastChild); }
      Array.from(svg.attributes)
        .filter(function (a) { return keepThese.indexOf(a.nodeName) === -1; })
        .forEach(function(attr) { svg.removeAttribute(attr.nodeName); });
      svg.off();
      svg.stop();
      svg.size(0, 0, 300, 150);
    };
  });
});
