const SVG = require("../svg");

test("viewBox get and set", () => {
	const svg = SVG();
	svg.setViewBox(1,2,3,4);
	expect(svg.getAttribute("viewBox")).toBe("1 2 3 4");
	svg.setViewBox("-10 -10 400 500");
	expect(svg.getAttribute("viewBox")).toBe("-10 -10 400 500");
	svg.setViewBox(300, 200);
	expect(svg.getAttribute("viewBox")).toBe("0 0 300 200");
});

test("get width and height", () => {
	const svg = SVG();
	expect(svg.getWidth()).toBe(undefined);
	expect(svg.getHeight()).toBe(undefined);
	const svg2 = SVG(400, 300);
	expect(svg2.getWidth()).toBe(400);
	expect(svg2.getHeight()).toBe(300);
	const svg3 = SVG(0, 0, 800, 600);
	expect(svg3.getWidth()).toBe(800);
	expect(svg3.getHeight()).toBe(600);
});
