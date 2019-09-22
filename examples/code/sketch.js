const welcomeScreens = [`size(100, 100);

let r = rect(0,0,100,100);
r.setAttribute("fill", "#ec3");
r.setAttribute("stroke", "#158");
r.setAttribute("stroke-dasharray", "4 2");
r.setAttribute("stroke-width", "2");

let c = bezier(0, 0, 25, 75, 75, 25, 100, 100);
c.setAttribute("stroke", "#e53");
c.setAttribute("stroke-width", "2");
c.setAttribute("fill", "#158");
`, `size(100, 100);

let c1 = circle(0,50,50);
c1.setAttribute("fill", "#e53");
let c2 = circle(50,50,50);
c2.setAttribute("fill", "#158");
c2.setAttribute("opacity", 0.75);
let c3 = circle(100,50,50);
c3.setAttribute("fill", "#ec3");
c3.setAttribute("opacity", 1.0);

let b1 = bezier(0, 50, 25, 15, 75, 15, 100, 50);
let b2 = bezier(0, 50, 25, 85, 75, 85, 100, 50);
b1.setAttribute("fill", "#e53");
b2.setAttribute("fill", "#e53");
b1.setAttribute("opacity", 0.75);
b2.setAttribute("opacity", 0.75);
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
