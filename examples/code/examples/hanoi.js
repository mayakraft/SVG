svg.size(100, 33);

const DISKS = 7;
const SPEED = 4; // (int) lower is faster
let steps = [];
let left = Array.from(Array(DISKS))
  .map(function(_, i) { return DISKS-i; });
const poles = [left, [], []];

var resetTimer = undefined;
var resetCount = 0;

const resetFunc = () => {
  resetCount++;
  resetTimer = undefined;
  frame = 0;
  step = 0;
  steps = [];
  poles[0] = resetCount % 2 === 0 ? Array.from(Array(DISKS)).map((_, i) => DISKS-i) : [];
  poles[1] = [];
  poles[2] = resetCount % 2 === 0 ? [] : Array.from(Array(DISKS)).map((_, i) => DISKS-i);
  if (resetCount % 2 === 0) {
    Hanoi(DISKS, 0, 1, 2);
  } else {
    Hanoi(DISKS, 2, 1, 0);
  }
};

const Hanoi = function (disk, from, buffer, to) {
  if (disk <= 0) { return; }
  Hanoi(disk - 1, from, to, buffer);
  steps.push({ from, to });
  Hanoi(disk - 1, buffer, from, to);
};
Hanoi(DISKS, 0, 1, 2);

const draw = function () {
  var thick = 4;
  svg.removeChildren();
  poles.forEach(function (pole, p) {
    var x = 25*(p+1);
    svg.line(x, 0, x, svg.getHeight()).stroke("black");
    pole.forEach(function (plate, i) {
      var w = plate * 25/DISKS;
      svg.rect(x-w/2, svg.getHeight()-(i+1)*thick - 0.5, w, thick)
        .stroke("black")
        .fill("hsl("+(36/DISKS*(plate-1))+",80%,45%)");
    });
  });
};

let frame = 0;
let step = 0;
svg.play = function (e) {
  // if (step >= steps.length) { svg.stop(); }
  if (step >= steps.length) {
    if (!resetTimer) { resetTimer = setTimeout(resetFunc, 1000); }
    return;
  }
  if (frame % SPEED === 0) {
    poles[steps[step].to].push(poles[steps[step].from].pop());
    draw();
    step++;
  }
  frame++;
};

