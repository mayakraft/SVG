const CodeSVGxMenu = function (container) {
  const app = CodeSVG(container);
  const queryCode = QueryWatcher("code");

  const downloadButton = document.createElement("div");
  downloadButton.setAttribute("class", "menu-button");
  const downloadButtonP = document.createElement("p");
  downloadButtonP.innerHTML = "⤓"; // "▼";
  downloadButton.setAttribute("title", "download image");
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
      "bezier.js",
      "conics.js",
      "clipping.js",
      "dragon.js",
      "text.js"
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
  window.svg = window.app.svg;
});
