var CodeSVGxMenu = function CodeSVGxMenu(container) {
  var app = CodeSVG(container);
  var queryCode = QueryWatcher("code"); // attach as early as possible

  window.svg = app.svg;
  var questionButton = document.createElement("div");
  questionButton.setAttribute("class", "question-button");
  questionButton.setAttribute("title", "~ Reserved Keywords ~\narc\narcArrow\narcEllipse\nbackground\nbezier\ncircle\nclipPath\ncontrols\ndefs\nellipse\ngetWidth\ngetHeight\ngroup\nline\nmask\nparabola\npath\npolygon\npolyline\nrect\nregularPolygon\nsave\nsetWidth\nsetHeight\nsize\nstraightArrow\nstylesheet\nsvg\ntext\nwedge\nwedgeEllipse");
  var questionButtonP = document.createElement("p");
  questionButtonP.innerHTML = "?";
  questionButton.appendChild(questionButtonP);
  container.appendChild(questionButton);

  var shareButton = document.createElement("div");
  shareButton.setAttribute("class", "share-button");
  shareButton.setAttribute("title", "Share");
  var shareImage = document.createElement("img");
  shareImage.src = "share.svg";
  shareImage.setAttribute("width", "30px");
  shareImage.setAttribute("height", "30px");
  shareButton.appendChild(shareImage);
  container.appendChild(shareButton);

  var downloadButton = document.createElement("div");
  downloadButton.setAttribute("class", "menu-button");
  downloadButton.setAttribute("title", "Download");
  var downloadImg = document.createElement("img");
  downloadImg.src = "download.svg";
  downloadImg.setAttribute("width", "30px");
  downloadImg.setAttribute("height", "30px");
  downloadButton.appendChild(downloadImg);
  container.appendChild(downloadButton);

  var randomSketchButton = document.createElement("div");
  randomSketchButton.setAttribute("class", "random-button");
  randomSketchButton.setAttribute("title", "Load an example");
  var randomSketchImage = document.createElement("img");
  randomSketchImage.src = "dice.svg";
  randomSketchImage.setAttribute("width", "30px");
  randomSketchImage.setAttribute("height", "30px");
  randomSketchButton.appendChild(randomSketchImage);
  container.appendChild(randomSketchButton);

  var loadAndRunExamples = function loadAndRunExamples(callback) {
    var examples = [];
    var exampleFilenames = [
      "albers1.js",
      "albers2.js",
      "arrows.js",
      "astroid.js",
      "bezier.js",
      "bugs.js",
      "clock.js",
      "conics.js",
      "dragon.js",
      "draw.js",
      "harmonic.js",
      "mask.js",
      "mystify.js",
      "parabola.js",
      "riley1.js",
      "ten-print.js",
      "text.js"
    ];
    exampleFilenames.forEach(function (file) {
      fetch("samples/" + file).then(function (data) {
        return data.text();
      }).then(function (result) {
        examples.push(result);
        if (examples.length === exampleFilenames.length) {
          callback(examples);
        }
      });
    });
  };

  var bootQueryValue = queryCode.value;

  if (bootQueryValue === "") {
    // loadAndRunExamples(function (examples) {
    //   return app.injectCode(examples[Math.floor(Math.random() * examples.length)]);
    // });
  } else {
    app.injectCode(bootQueryValue);
    queryCode.value = undefined;
  }

  shareButton.onclick = function () {
    var url = queryCode.makeURLWithQueryValue(app.editor.getValue());
    navigator.clipboard.writeText(url).then(function () {
      alert("✓ Shareable link copied to clipboard.");
    }, function (err) {
      return alert(err);
    });
  };

  downloadButton.onclick = function () {
    // inject the code into a new section in the header
    var defs = app.svg.getElementsByTagName("defs");
    if (defs.length === 0) {
      defs = [document.createElementNS(SVG.NS, "defs")];
      app.svg.prepend(defs[0]);
    }
    var codes = defs[0].getElementsByTagName("code");
    var code = codes.length === 0
      ? document.createElementNS(SVG.NS, "code")
      : codes[0];
    code.innerHTML = "";
    var cdata = new window.DOMParser().parseFromString("<root></root>", "text/xml").createCDATASection("\n" + app.getCode() + "\n");
    code.appendChild(cdata);
    defs[0].prepend(code);
    app.svg.save();
  };

  questionButton.onclick = function () {
    var win = window.open("https://robbykraft.github.io/SVG/docs.html", "_blank");
    win.focus();
  };

  randomSketchButton.onclick = function () {
    loadAndRunExamples(function (examples) {
      app.clear();
      return app.injectCode(examples[Math.floor(Math.random() * examples.length)]);
    });
  };

  return app;
};

document.addEventListener("DOMContentLoaded", function () {
  window.app = CodeSVGxMenu(document.querySelectorAll(".app")[0]);
});