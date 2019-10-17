const CodeSVGxMenu = function (container) {
  const app = CodeSVG(container);
  const queryCode = QueryWatcher("code");
  // attach as early as possible
  window.svg = app.svg;

  const downloadButton = document.createElement("div");
  downloadButton.setAttribute("class", "menu-button");
  const downloadButtonP = document.createElement("p");
  downloadButtonP.innerHTML = "⤓"; // "▼";
  downloadButton.setAttribute("title", "download image");
  downloadButton.appendChild(downloadButtonP);
  container.appendChild(downloadButton);
  downloadButton.onclick = function () {
    // inject the code into a new section in the header
    let defs = app.svg.getElementsByTagName("defs");
    const code = document.createElementNS(SVG.NS, "code");
    const cdata = (new window.DOMParser())
      .parseFromString("<root></root>", "text/xml")
      .createCDATASection(`\n${app.getCode()}\n`);
    code.appendChild(cdata);
    if (defs.length === 0) {
      defs = [document.createElementNS(SVG.NS, "defs")];
      app.svg.prepend(defs[0]);
    }
    defs[0].prepend(code);
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
  questionButton.setAttribute("title", "~ reserved keywords ~\narc\nbackground\nbezier\ncircle\nclipPath\nellipse\ngroup\nline\nmask\npolygon\npolyline\nrect\nregularPolygon\nsize\nstyle\nsvg\ntext\nwedge");

  const shareButton = document.createElement("div");
  shareButton.setAttribute("class", "share-button");
  const shareButtonP = document.createElement("p");
  shareButton.setAttribute("title", "create shareable link");
  shareButtonP.innerHTML = "☛";
  shareButton.appendChild(shareButtonP);
  container.appendChild(shareButton);

  const loadAndRunExamples = function (callback) {
    const examples = [];
    const exampleFilenames = [
      "astroid.js",
      "bezier.js",
      "bugs.js",
      "clock.js",
      "conics.js",
      "dragon.js",
      "draw.js",
      "harmonic.js",
      "lerp.js",
      "mask.js",
      "mystify.js",
      "parabola.js",
      "ten-print.js",
      "text.js",
      "walker.js"
    ];
    exampleFilenames.forEach((file) => {
      fetch(`samples/${file}`)
        .then(data => data.text())
        .then((result) => {
          examples.push(result);
          if (examples.length === exampleFilenames.length) {
            callback(examples);
          }
        });
    });
  };

  // boot, fill code console with query string if it exists. or welcome sketch.
  const bootQueryValue = queryCode.value;
  if (bootQueryValue === "") {
    loadAndRunExamples(examples => app
      .injectCode(examples[Math.floor(Math.random() * examples.length)]));
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
