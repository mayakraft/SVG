/**
 * SVG (c) Robby Kraft
 */
import vkXML from "../../include/vkbeautify-xml";
import svgNS from "../environment/namespace";
import window from "../environment/window";
import {
  isBrowser,
  isNode,
  isWebWorker
} from "../environment/detect";
import * as K from "../environment/keys";

const SAVE_OPTIONS = () => ({
  download: false, // trigger a file download (browser only)
  output: K._string, // output type ("string", "svg") string or XML DOM object
  windowStyle: false, // include any external stylesheets present on the window object
  filename: "image.svg" // if "download" is true, the filename for the downloaded file
});

const getWindowStylesheets = function () {
  const css = [];
  if (window.document.styleSheets) {
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
  }
  return css.join("\n");
};

const downloadInBrowser = function (filename, contentsAsString) {
  const blob = new window.Blob([contentsAsString], { type: "text/plain" });
  const a = window.document.createElement("a");
  a.setAttribute("href", window.URL.createObjectURL(blob));
  a.setAttribute("download", filename);
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
};

const save = function (svg, options) {
  options = Object.assign(SAVE_OPTIONS(), options);
  // if this SVG was created inside the browser, it inherited all the <link>
  // stylesheets present on the window, this allows them to be included.
  // default: not included.
  if (options.windowStyle) {
    const styleContainer = window.document.createElementNS(svgNS, K._style);
    styleContainer.setAttribute("type", "text/css");
    styleContainer.innerHTML = getWindowStylesheets();
    svg.appendChild(styleContainer);
  }
  // convert the SVG to a string and format it with good indentation
  const source = (new window.XMLSerializer()).serializeToString(svg);
  const formattedString = vkXML(source);
  //
  if (options.download && isBrowser && !isNode) {
    downloadInBrowser(options.filename, formattedString);
  }
  return (options.output === K._svg ? svg : formattedString);
};

export default save;
