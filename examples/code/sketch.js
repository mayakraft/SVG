const welcomeScreens = [`size(100, 100);

rect(0,0,100,100)
  .fill("#ec3")
  .stroke("#158")
  .strokeDasharray("4 2")
  .strokeWidth("2");

bezier(0, 0, 5, 95, 95, 5, 100, 100)
  .fill("#158")
  .stroke("#e53")
  .strokeWidth(2);
`, `size(100, 100);

let clip = app.svg.clipPath("clip-path");
clip.appendChild(circle(50, 0, 70.7));

circle(0,50,50).fill("#e53");
circle(50,50,50).fill("#158").opacity(0.75);
circle(100,50,50).fill("#ec3");
circle(50, 100, 70.7)
  .fill("#e53")
  .opacity(0.75)
  .clipPath("url(#clip-path)");
`, `size(1, 1);

let pts300 = Array.from(Array(300)).map(() => [Math.random(), Math.random()]);
let pts150 = Array.from(Array(150)).map(() => [Math.random(), Math.random()]);

let clip = app.svg.clipPath("clip-path");

rect(-1, -1, 3, 3).fill("black");
circle(Math.random(), Math.random(), 0.5).fill("#158");

polygon(pts300)
  .fill("black")
  .fillRule("evenodd");

polygon(pts150)
  .fill("#158")
  .fillRule("evenodd")
  .appendTo(clip);

circle(Math.random(), Math.random(), 0.5)
  .fill("#ec3")
  .clipPath("url(#clip-path)");
`, `size(1, 1);

Array.from(Array(50))
  .map(() => Math.floor(3 + Math.random()*2))
  .map(sides => regularPolygon(Math.random(), Math.random(), Math.random(), sides))
  .forEach((c, i) => c.opacity(0.5).fill(["#158","#e53","#ec3"][i%3]));
`, `size(600, 600);

function dragon(a, b, turn, level) {
  if (level < 0) {
    return [a, b];
  }
  let vector = { x: b.x - a.x, y: b.y - a.y };
  let midPt = {
      x: a.x + vector.x*0.5 + turn * vector.y*0.5,
      y: a.y + vector.y*0.5 + (-1*turn) * vector.x*0.5
  };
  let first = dragon(a, midPt, 1, level-1);
  let second = dragon(midPt, b, -1, level-1);
  if (first.length > 1) { first.pop(); }
  return first.concat(second);
}

let a = {x: app.svg.w*0.225, y: app.svg.h*0.6 };
let b = {x: app.svg.w*0.85, y: app.svg.h*0.6 };

polyline(dragon(a, b, 1, 7))
  .fill("none").stroke("#e53").opacity(0.8).strokeWidth(13);
polyline(dragon(a, b, 1, 1))
  .fill("none").stroke("#ec3").opacity(0.5).strokeWidth(90);
polyline(dragon(a, b, 1, 10))
  .fill("none").stroke("#158").opacity(1).strokeWidth(2);
polyline(dragon(a, b, 1, 4))
  .fill("none").stroke("#158").opacity(0.5).strokeWidth(60);
`];

const CodeSVGxMenu = function (container) {
  const app = CodeSVG(container);
  const queryCode = QueryWatcher("code");

  const downloadButton = document.createElement("div");
  downloadButton.setAttribute("class", "menu-button");
  const downloadButtonP = document.createElement("p");
  downloadButtonP.innerHTML = "⤓"; // "▼";
  downloadButton.appendChild(downloadButtonP);
  container.appendChild(downloadButton);
  downloadButton.onclick = function () {
    app.svg.save();
  };

  const questionButton = document.createElement("div");
  questionButton.setAttribute("class", "question-button");
  const questionButtonP = document.createElement("p");
  questionButtonP.innerHTML = "?";
  questionButton.appendChild(questionButtonP);
  container.appendChild(questionButton);
  questionButton.onclick = function () {
    const win = window.open("https://robbykraft.github.io/SVG/docs.html", "_blank");
    win.focus();
  };

  const shareButton = document.createElement("div");
  shareButton.setAttribute("class", "share-button");
  const shareButtonP = document.createElement("p");
  shareButtonP.innerHTML = "☛";
  shareButton.appendChild(shareButtonP);
  container.appendChild(shareButton);
  // boot, fill code console with query string if it exists. or welcome sketch.
  const bootQueryValue = queryCode.value;
  if (bootQueryValue === "") {
    app.injectCode(welcomeScreens[Math.floor(Math.random() * welcomeScreens.length)]);
  } else {
    app.injectCode(bootQueryValue);
    queryCode.value = undefined;
  }
  shareButton.onclick = function () {
    const url = queryCode.makeURLWithQueryValue(app.editor.getValue());
    navigator.clipboard.writeText(url).then(() => {
      alert("✓ Shareable link copied to clipboard.");
    }, err => alert(err));
  };

  return app;
};

document.addEventListener("DOMContentLoaded", () => {
  window.app = CodeSVGxMenu(document.querySelectorAll(".app")[0]);
});
