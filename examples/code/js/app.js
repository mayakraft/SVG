document.addEventListener("DOMContentLoaded", function () {
  var app = LiveCode(document.querySelector("#app"));
  var SVG = window.SVG;
  var queryCode = QueryWatcher("code"); // attach as early as possible
  var zoom = false;

  var svg = SVG(app.dom.canvas, 300, 150, { window: true });
  window.svg = svg;
  svg.setAttribute("class", "svg-code");

  var questionButton = document.createElement("div");
  questionButton.setAttribute("class", "question-button");
  questionButton.setAttribute("title", "Help");
  document.querySelector("#app").appendChild(questionButton);

  var downloadButton = document.createElement("div");
  downloadButton.setAttribute("class", "download-button");
  downloadButton.setAttribute("title", "Download");
  document.querySelector("#app").appendChild(downloadButton);

  var shareButton = document.createElement("div");
  shareButton.setAttribute("class", "share-button");
  shareButton.setAttribute("title", "Share");
  document.querySelector("#app").appendChild(shareButton);

  var randomSketchButton = document.createElement("div");
  randomSketchButton.setAttribute("class", "random-button");
  randomSketchButton.setAttribute("title", "Load an example");
  document.querySelector("#app").appendChild(randomSketchButton);

  var shuffle = function shuffle(array) {
    for (var i = array.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * i);
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

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
    "mask.js",
    "parabola.js",
    "riley1.js",
    "ten-print.js",
  ];
  shuffle(exampleFilenames);
  var examples = [];
  var exampleIndex = 0;

  var loadExamples = function loadExamples(callback) {
    exampleFilenames.forEach(function (file, i) {
      var iteration = i;
      fetch("samples/" + file).then(function (data) {
        return data.text();
      }).then(function (result) {
        examples.push(result);
        if (examples.length === exampleFilenames.length) {
          examples = examples.filter(function (e) { return e != null; });
          callback(examples);
        }
      }).catch(function(error) {
        app.dom.console.innerHTML = "<p>examples require a localhost server. instead, run examples here: https://svg.rabbitear.org</p>";
      });
    });
  };

  var loadAndRunExamples = function loadAndRunExamples(callback) {
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
    // blank screen
    const welcomeText = `// ~ Welcome to coding with SVG ~
// here are some commands to get you started:

// size(600, 600); // the viewBox size. default is 300x150
// background("white") // background color

// primitives:
// line(x1, y1, x2, y2).stroke("black");
// circle(x, y, radius);
// rect(x, y, width, height)
// path().moveTo(x1, y1).lineTo(x2, y2).curveTo(cx1, cy1, cx2, cy2, x3, y3)
// (and many more)

// style:
// rect(10, 10, 280, 130).fill("linen").stroke("sienna").strokeWidth(5)
// default style is black fill AND NO STROKE (lines are invisible!)

// more info: https://svg.rabbitear.org/docs/
// or roll the dice for an example!

`;
    app.injectCode(welcomeText);
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
    var defs = svg.getElementsByTagName("defs");
    if (defs.length === 0) {
      defs = [document.createElementNS(SVG.NS, "defs")];
      svg.prepend(defs[0]);
    }
    var codes = defs[0].getElementsByTagName("code");
    var code = codes.length === 0
      ? document.createElementNS(SVG.NS, "code")
      : codes[0];
    code.innerHTML = "";
    var cdata = new window.DOMParser().parseFromString("<root></root>", "text/xml")
      .createCDATASection("\n" + app.code + "\n");
    code.appendChild(cdata);
    defs[0].prepend(code);
    svg.save();
  };

  questionButton.onclick = function () {
    var win = window.open("//svg.rabbitear.org/docs/", "_blank");
    win.focus();
  };

  randomSketchButton.onclick = function () {
    if (examples.length === 0) {
      // first boot
      // loadAndRunExamples(function (examples) {
      loadExamples(function (examples) {
        if (app.paused) { app.paused = false; }
        app.clear();
        exampleIndex = (exampleIndex + 1) % examples.length;
        return app.injectCode(examples[exampleIndex]);
      });
    } else {
      if (app.paused) { app.paused = false; }
      app.clear();
      exampleIndex = (exampleIndex + 1) % examples.length;
      return app.injectCode(examples[exampleIndex]);
    }
  };

  app.didPause = function (paused) { };
  app.didUpdate = function () { };
  app.reset = function () {
    app.dom.canvas.removeAttribute("style");

    if (svg !== undefined) {
      while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
      }
      Array.from(svg.attributes).filter(function (a) {
        return ["version", "xmlns", "class", "width", "height"].indexOf(a.nodeName) === -1;
      }).forEach(function(attr) { svg.removeAttribute(attr.nodeName); });
      // while (svg.attributes.length > 0) {
      //   svg.removeAttribute(svg.attributes[0].nodeName);
      // }

      // remove any Timer functions. handlers will get cleaned up automatically
      svg.freeze();
      svg.clearTransforms();
      svg.size(300, 150);
      svg.fps = 60;
    }
  };

  window.app = app;
});
