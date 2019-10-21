var examples = [
  "svg1.line(20, 20, 280, 130)\n  .stroke('white');\n\nsvg1.line(20, 130, 280, 20)\n  .stroke('sienna')\n  .strokeWidth(7)\n  .strokeDasharray('7 5');",
  "svg2.circle(150, 75, 50)\n  .fill('peru');",
  "svg3.ellipse(150, 75, 100, 50)\n  .fill('linen');",
  "svg4.rect(100, 50, 100, 50)\n  .fill('steelblue');",
  "svg5.polygon(10, 10, 150, 50, 80, 90)\n  .fill('thistle');\n\nvar points = [\n  [240,20],\n  [250,120],\n  [150,20],\n  [170,100]];\n\nsvg5.polygon(points)\n  .fill('sienna');\n",
  "svg6.polyline(40, 40, 100, 140, 150, 30, 250, 140)\n  .stroke('tomato')\n  .strokeWidth(10);",
  "svg7.bezier(40, 40, 100, 140, 150, 30, 250, 140)\n  .stroke('tomato')\n  .strokeWidth(10);",
  "svg8.arc(150, 75, 65, Math.PI/2, Math.PI*7/4)\n  .fill('darkolivegreen')\n  .stroke('yellowgreen')\n  .strokeWidth(10);",
  "svg9.wedge(150, 75, 65, Math.PI/2, Math.PI*7/4)\n  .fill('darkolivegreen')\n  .stroke('yellowgreen')\n  .strokeWidth(10);",
  "svg10.regularPolygon(100, 75, 65, 5)\n  .fill('forestgreen');\n\nsvg10.regularPolygon(200, 75, 40, 7)\n  .fill('white');",
  "svg11.parabola(50, 20, 130, 130)\n  .fill('crimson');\n\nsvg11.parabola(200, 120, 40, -80)\n  .fill('white');",
  "svg12.text('abc あいう 🥰🤩🥳', 20, 75)\n  .fill('gold')\n  .fontSize('30px');",
  "// this example does not visualize anything\n\nvar d = svg13.defs();\n\nvar t = SVG.createElement('title');\nt.innerHTML = 'metadata';\nd.appendChild(t);\n\nd.rect(20, 20, 100, 100);",
  "svg14.setClass('styled');\nvar css = '.styled rect { fill: crimson }';\nvar s = svg14.stylesheet(css);\n\nsvg14.rect(100, 25, 100, 100);",
  "var clip = svg15.clipPath();\nclip.text('clipping', 0, 95)\n  .fontSize('80px');\n\nsvg15.line(0, 75, 300, 75)\n  .stroke('orchid')\n  .strokeWidth(20)\n  .clipPath(clip);\n\nsvg15.line(0, 30, 300, 120)\n  .stroke('forestgreen')\n  .strokeWidth(20)\n  .clipPath(clip);",
  "var m = svg16.mask();\nm.text('masking', 0, 95)\n  .fill('white')\n  .fontSize('80px');\nm.text('masking', 2, 97)\n  .fill('black')\n  .fontSize('80px');\n\nsvg16.rect(0, 0, 300, 150)\n  .strokeWidth(20)\n  .fill('orchid')\n  .mask(m);",
  "var g = svg17.group().fill('dodgerblue');\n\nsvg17.rect(140, 0, 20, 150).fill('white');\n\ng.rect(0, 65, 300, 20);",
  "// var svg18 = SVG();\n\nsvg18.size(300, 50);\nsvg18.background('plum', false);\n\nsvg18.circle(25, 25, 25)\n  .fill('fuchsia');\n",
  "svg19.mouseMoved = function (mouse) {\n  svg19.circle(mouse.x, mouse.y, 10)\n    .fill('white')\n    .opacity(0.2);\n};",
  "var c = svg20.circle(25, 25, 25)\n  .fill('wheat');\n\nsvg20.animate = function (e) {\n  var x = Math.sin(e.time) * 100 + 150;\n  c.setCenter(x, 75);\n};\n",
  "var y = random(130);\n\nvar hex = '0123456789abcdef';\nvar c = randomString(6, hex);\n\nsvg21.rect(20, y, 260, 40)\n  .fill('#' + c);\n",
];



document.addEventListener("DOMContentLoaded", function () {
  examples.forEach(function(code, i) {
    var sketch = CodeSVG(document.querySelectorAll(".sketch-" + (i+1))[0]);
    window["svg" + (i+1)] = sketch.svg;
    sketch.injectCode(code);
  });
});