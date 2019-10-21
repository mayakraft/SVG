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
    codeContainer.setAttribute("class", "code-container");
    svgContainer.setAttribute("class", "image-container");
    appContainer.appendChild(codeContainer);
    appContainer.appendChild(svgContainer);
    return [codeContainer, svgContainer];
  };
  var initDOM = function initDOM(appContainer) {
    var _buildDOM = buildDOM(appContainer);
    var codeContainer = _buildDOM[0];
    var svgContainer = _buildDOM[1];

    app.svg = SVG(svgContainer);
    return [codeContainer, svgContainer];
  };
  var compileAndRun = function compileAndRun() {
    try {
      if (typeof app.reset === "function") {
        app.reset();
      }
      eval(app.editor.getValue());
    } catch (err) {
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
  var _initDOM = initDOM(container);
  var codeContainer = _initDOM[0];

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

  app.clear = function () {
    app.editor.setValue("");
  };

  compileAndRun();
  return app;
};
