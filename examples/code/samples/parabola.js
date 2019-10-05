size(100, 100);
background("#edb");

parabola(20, 20, 60, 60).fill("black").opacity(0.6);
parabola(0, 0, 60, 60).fill("#ec3").opacity(0.6)
  .setAttribute("style", "transform: rotateZ(90deg) translate(20px, -80px);");
parabola(0, 0, 60, 60).fill("#158").opacity(0.6)
  .setAttribute("style", "transform: rotateZ(270deg) translate(-80px, 20px);");
parabola(0, 0, 60, 60).fill("#e53").opacity(0.6)
  .setAttribute("style", "transform: rotateZ(180deg) translate(-80px, -80px);");

rect(20, 20, 60, 60).fill("none").stroke("black");
