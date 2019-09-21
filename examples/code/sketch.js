const welcomeScreens = [`size(100, 100);

let r = rect(0,0,100,100);
r.setAttribute("fill", "#ec3");
r.setAttribute("stroke", "#158");
r.setAttribute("stroke-dasharray", "4 2");
r.setAttribute("stroke-width", "2");

let c = bezier(0, 0, 25, 75, 75, 25, 100, 100)
c.setAttribute("stroke", "#e53");
c.setAttribute("stroke-width", "2");
c.setAttribute("fill", "#158");
`,
// app.svg.animate = function(event) {
//   let drift = 50*Math.sin(event.time);
//   c.setBezierPoints(
//     0, 0,
//     50 + drift, 50 - drift,
//     50 - drift, 50 + drift,
//     100, 100
//   );
// };
// `
];

const CodeSVGxSave = function (container) {
  const menuButton = document.createElement("div");
  menuButton.setAttribute("class", "menu-button");
  const buttonP = document.createElement("p");
  buttonP.innerHTML = "▼";
  menuButton.appendChild(buttonP);
  container.appendChild(menuButton);

  const app = CodeSVG(container);
  document.querySelectorAll(".menu-button").onclick = function () {
    app.svg.save();
  };
  return app;
};

document.addEventListener("DOMContentLoaded", () => {
  const app = CodeSVGxSave(document.querySelectorAll(".app")[0]);
  app.injectCode(welcomeScreens[Math.floor(Math.random() * welcomeScreens.length)]);
  window.app = app;
});
