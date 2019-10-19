var CodeSVG = function CodeSVG(container) {
  var SVG = window.SVG;
  var ace = window.ace;
  var app = {};

  if (document.readyState === "loading") {
    console.warn("CodeSVG(): wait until DOM has loaded. use DOMContentLoaded");
  }
  var buildDOM = function buildDOM(appContainer) {
    var codeContainer = document.createElement("div");
    var svgContainer = document.createElement("div");
    var consoleContainer = document.createElement("div");
    codeContainer.setAttribute("class", "code-container");
    svgContainer.setAttribute("class", "image-container");
    consoleContainer.setAttribute("class", "console");
    appContainer.appendChild(codeContainer);
    appContainer.appendChild(svgContainer);
    appContainer.appendChild(consoleContainer);
    return [codeContainer, svgContainer, consoleContainer];
  };
  var initDOM = function initDOM(appContainer) {
    var _buildDOM = buildDOM(appContainer);
    var codeContainer = _buildDOM[0];
    var svgContainer = _buildDOM[1];
    var consoleContainer = _buildDOM[2];

    app.svg = SVG(svgContainer, 512, 512, { window: true });
    app.console = consoleContainer;
    return [codeContainer, svgContainer, consoleContainer];
  };
  var compileAndRun = function compileAndRun() {
    try {
      if (typeof app.reset === "function") {
        app.reset();
      }
      eval(app.editor.getValue());
      app.console.innerHTML = "";
    } catch (err) {
      app.console.innerHTML = "<p>" + err + "</p>";
    }
  };
  var editorDidUpdate = function editorDidUpdate() {
    compileAndRun();

    if (typeof app.didUpdate === "function") {
      app.didUpdate();
    }
  };
  var injectCode = function injectCode(text) {
    app.editor.session.insert({
      row: app.editor.session.getLength(),
      column: 0
    }, text);
  };
  var getCode = function getCode() {
    return app.editor.getValue();
  };
  // init app
  var _initDOM = initDOM(container),
      codeContainer = _initDOM[0];

  try {
    app.editor = ace.edit(codeContainer);
  } catch (err) {
    throw new Error("bad internet connection. or Ace CDN moved-see index.html");
  }

  app.code = app.editor.container;
  app.editor.setTheme("ace/theme/monokai");
  app.editor.setKeyboardHandler("ace/keyboard/sublime");
  app.editor.session.setMode("ace/mode/javascript");
  app.editor.session.on("change", editorDidUpdate);
  Object.defineProperty(app, "getCode", { value: getCode });
  Object.defineProperty(app, "injectCode", { value: injectCode });

  // allow these to be overwritten
  app.didUpdate = function () {};

  app.reset = function () {
    document.querySelectorAll(".image-container")[0].removeAttribute("style");

    if (app.svg !== undefined) {
      while (app.svg.lastChild) {
        app.svg.removeChild(app.svg.lastChild);
      }
      // remove any Timer functions. handlers will get cleaned up automatically
      app.svg.freeze();
      app.svg.clearTransforms();
      app.svg.size(300, 150);
      app.svg.fps = 60;
    }
  };

  compileAndRun();
  return app;
};
