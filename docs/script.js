var examples = [
  "window.svg1 = SVG(document.querySelector('#svg-parent'));\n\nsvg1.size(-2, -1, 4, 2);\nsvg1.background('black');\n\nsvg1.circle(0, 0, 1).fill('white');",
  "svg2.line(20, 20, 280, 130)\n  .stroke('black');\n\nsvg2.line([20, 130], [280, 20])\n  .stroke('#0005')\n  .strokeWidth(20)\n  .strokeDasharray('20 5');",
  "svg3.circle(150, 75, 75)\n  .fill('crimson');",
  "for (var i = 0; i < 100; i += 10) {\n  svg4.ellipse(150, 75, 100-i, 75)\n    .fill('#000' + i/10);\n}",
  "svg5.rect(25, 25, 250, 100);",
  "svg6.polygon(10, 10, 300, 50, 180, 150)\n  .fill('black');\n\nvar points = [\n  [200,20],\n  [200,120],\n  [100,20],\n  [100,100]];\n\nsvg6.polygon(points)\n  .fill('thistle');\n",
  "svg7.polyline(0, 10, 280, 0, 260, 140, 10, 150)\n\nvar p = svg7.polyline()\n  .stroke('tomato')\n  .fill('none')\n  .strokeWidth(10);\n\nfor (var x = 0; x < 300; x += 20) {\n  p.addPoint(x, Math.random() * 150);\n}",
  "svg8.path()\n  .fill('gold')\n  .stroke('crimson');",
  "svg9.text('abc あいう 🥰🤩🥳', 0, 100)\n  .fill('gold')\n  .fontSize('34px');",
  "var layer = svg10.g().fill('dodgerblue');\n\nsvg10.rect(130, 0, 40, 150).fill('black');\n\nlayer.rect(0, 55, 300, 40);",
  "var clip = svg11.clipPath();\nclip.text('clipping', 0, 95)\n  .fontSize('80px');\n\nsvg11.line(0, 75, 300, 75)\n  .stroke('black')\n  .strokeWidth(20)\n  .clipPath(clip);\n\nsvg11.line(0, 30, 300, 120)\n  .stroke('crimson')\n  .strokeWidth(20)\n  .clipPath(clip);",
  "var m = svg12.mask();\nm.text('MASK', 0, 95)\n  .fill('white')\n  .fontWeight(900)\n  .fontSize('80px');\nm.text('MASK', 5, 97)\n  .fill('black')\n  .fontWeight(900)\n  .fontSize('80px');\n\nsvg12.rect(0, 0, 300, 150)\n  .strokeWidth(20)\n  .fill('black')\n  .mask(m);",
  "svg13.regularPolygon(150, 75, 75, 10)\n  .stroke('darkseagreen')\n  .strokeWidth(10);\n\nsvg13.regularPolygon(150, 75, 75, 5)\n  .fill('forestgreen');\n",
  "svg14.parabola(0, 150, 300, -150)\n  .fill('crimson');",
  "for (var i = 0; i < 1.25; i += 0.1) {\n  svg15.curve(0, 150, 300, 150, i)\n    .stroke('tomato')\n    .fill('none');\n}",
  "svg16.arc(150, 75, 65, Math.PI/2, Math.PI*7/4)\n  .fill('darkolivegreen')\n  .stroke('yellowgreen')\n  .strokeWidth(10);",
  "svg17.wedge(150, 75, 65, Math.PI/2, Math.PI*7/4)\n  .fill('darkolivegreen')\n  .stroke('yellowgreen')\n  .strokeWidth(10);",
  "svg18.onMove = function (mouse) {\n  svg18.circle(mouse.x, mouse.y, 10)\n    .fill('#0001');\n};",
  "var c = svg19.circle(150, 75, 25)\n\nsvg19.play = function (e) {\n  c.setCenter(Math.sin(e.time) * 100 + 150, 75);\n};\n",
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
