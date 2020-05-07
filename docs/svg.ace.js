var LiveCode = function LiveCode(container) {
  var ace = window.ace;
  var app = {};
  var isPaused = false;
  var darkMode = true;
  var zoom = false;

  if (document.readyState === "loading") {
    console.warn("LifeCode(): please initialize using DOMContentLoaded");
  }

  var initDOM = function initDOM(appContainer) {
    var codeContainer = document.createElement("div");
    var canvasContainer = document.createElement("div");
    codeContainer.setAttribute("class", "code-editor");
    canvasContainer.setAttribute("class", "code-canvas");
    appContainer.appendChild(codeContainer);
    appContainer.appendChild(canvasContainer);
    return {
      code: codeContainer,
      canvas: canvasContainer,
    };
  };  
  var compileAndRun = function compileAndRun() {
    try {
      if (typeof app.didBeginUpdate === "function") {
        app.didBeginUpdate();
      }
      eval(app.editor.getValue());
    } catch (err) { }
    if (typeof app.didUpdate === "function") {
      app.didUpdate();
    }
  };

  var detectLoop = function detectLoop() {
    var position = app.editor.getCursorPosition();
    var token = app.editor.session.getTokenAt(position.row, position.column);
    if (token) {
      if (token.type === "keyword") {
        if (token.value === "for") { return true; }
        if (token.value === "while") { return true; }
        if (token.value === "do") { return true; }
      }
    }
    return false;
  };

  var editorDidUpdate = function editorDidUpdate() {
    compileAndRun();
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

  var setCode = function setCode(value) {
    app.editor.setValue(value);
  };

  var clear = function clear() {
    app.editor.setValue("");
  };

  // init app
  app.dom = initDOM(container);

  try {
    app.editor = ace.edit(app.dom.code);
  } catch (err) {
    throw new Error("Bad internet connection, cannot load Ace editor");
  }

  app.editor.setTheme("ace/theme/xcode");
  app.editor.setKeyboardHandler("ace/keyboard/sublime");
  app.editor.session.setMode("ace/mode/javascript");
  app.editor.session.on("change", editorDidUpdate);
  app.editor.session.setTabSize(2);
  app.editor.setOptions({ fontSize: "9pt" });
  // app.editor.focus();

  Object.defineProperty(app, "clear", { value: clear });
  Object.defineProperty(app, "injectCode", { value: injectCode });
  Object.defineProperty(app, "code", { get: getCode, set: setCode });

  // allow these to be overwritten. these are async methods
  app.didUpdate = function () {}; // callback. after code runs
  app.didPause = function () {}; // callback. after "paused" is modified
  app.didBeginUpdate = function () {}; // this is called at the beginning of every execution cycle

  compileAndRun();
  return app;
};
