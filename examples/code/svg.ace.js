const CodeSVG = function (container) {
  const { SVG, ace } = window;
  const app = {};

  if (document.readyState === "loading") {
    console.warn("CodeSVG(): wait until DOM has loaded. use DOMContentLoaded");
  }
  const buildDOM = function (appContainer) {
    const codeContainer = document.createElement("div");
    const svgContainer = document.createElement("div");
    const consoleContainer = document.createElement("div");
    codeContainer.setAttribute("class", "code-container");
    svgContainer.setAttribute("class", "image-container");
    consoleContainer.setAttribute("class", "console");
    appContainer.appendChild(codeContainer);
    appContainer.appendChild(svgContainer);
    appContainer.appendChild(consoleContainer);
    return [
      codeContainer,
      svgContainer,
      consoleContainer
    ];
  };
  const initDOM = function (appContainer) {
    const [
      codeContainer,
      svgContainer,
      consoleContainer
    ] = buildDOM(appContainer);

    app.svg = SVG(svgContainer, 512, 512);
    app.console = consoleContainer;
    return [
      codeContainer,
      svgContainer,
      consoleContainer
    ];
  };
  const compileAndRun = function () {
    try {
      if (typeof app.reset === "function") { app.reset(); }
      eval(app.editor.getValue());
      app.console.innerHTML = "";
    } catch (err) {
      app.console.innerHTML = `<p>${err}</p>`;
    }
  };
  const editorDidUpdate = function () {
    compileAndRun();
    if (typeof app.didUpdate === "function") { app.didUpdate(); }
  };
  const injectCode = function (text) {
    app.editor.session.insert({
      row: app.editor.session.getLength(),
      column: 0
    }, text);
  };

  const bindToWindow = function () {
    // bind all member methods of app.svg to the window
    Object.getOwnPropertyNames(app.svg)
      .filter(p => typeof app.svg[p] === "function")
      .forEach((name) => { window[name] = app.svg[name].bind(app.svg); });
    // special case: interaction handlers
    ["onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseUp",
      "onScroll"].forEach((key) => {
      Object.defineProperty(window, key, {
        set: function (f) {
          app.svg[key] = f;
        },
        get: function () { return; }
      });
    });
  };

  // init app
  const [codeContainer] = initDOM(container);
  bindToWindow();
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

  Object.defineProperty(app, "injectCode", { value: injectCode });
  // allow these to be overwritten
  app.didUpdate = function () {};
  app.reset = function () {
    document.querySelectorAll(".image-container")[0].removeAttribute("style");
    if (app.svg !== undefined) {
      while (app.svg.lastChild) {
        app.svg.removeChild(app.svg.lastChild);
      }
    }
  };

  compileAndRun();

  return app;
};
