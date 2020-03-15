/**
 * SVG (c) Robby Kraft
 */

const parseCSSText = function (styleContent) {
  const styleElement = document.createElement("style");
  styleElement.textContent = styleContent;
  document.body.appendChild(styleElement);
  const rules = styleElement.sheet.cssRules;
  document.body.removeChild(styleElement);
  return rules;
};

const getPageCSS = function () {
  const css = [];
  for (let s = 0; s < window.document.styleSheets.length; s += 1) {
    const sheet = window.document.styleSheets[s];
    try {
      const rules = ("cssRules" in sheet) ? sheet.cssRules : sheet.rules;
      for (let r = 0; r < rules.length; r += 1) {
        const rule = rules[r];
        if ("cssText" in rule) {
          css.push(rule.cssText);
        } else {
          css.push(`${rule.selectorText} {\n${rule.style.cssText}\n}\n`);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }
  return css.join("\n");
};

// save file
if (options.windowStyle) {
  // include the CSS inside of <link> style sheets
  const styleContainer = window.document.createElementNS(svgNS, K.style);
  styleContainer.setAttribute("type", "text/css");
  styleContainer.innerHTML = getPageCSS();
  svg.appendChild(styleContainer);
}
