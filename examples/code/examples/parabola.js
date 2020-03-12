svg.size(100, 100);

svg.parabola(0, 0, 60, 60).fill("#000a").translate(20, 20);
svg.parabola(0, 0, 60, 60).fill("#ec3a").rotate(90).translate(20, -80);
svg.parabola(0, 0, 60, 60).fill("#158a").rotate(270).translate(-80, 20);
svg.parabola(0, 0, 60, 60).fill("#e53a").rotate(180).translate(-80, -80);

svg.rect(20, 20, 60, 60).fill("none").stroke("black");
