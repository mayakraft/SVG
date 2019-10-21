# SVG

[![Build Status](https://travis-ci.org/robbykraft/SVG.svg?branch=master)](https://travis-ci.org/robbykraft/SVG)

make it a little easier to code and play with SVGs

# Usage

Include svg.js in your project.

```html
<script src="svg.js"></script>
```

# Introduction

`SVG` is the global namespace. It's also a constructor.

```javascript
const mySVG = SVG();
```

All other constructors exist in two places:

* global level: `SVG.rect()` creates a `<rect>`.
* object level: `mySVG.rect()` creates a `<rect>` and appends it to mySVG.

*you probably want to use the 2nd approach.*

```javascript
mySVG.rect(10, 10, 280, 130);
```

Calling the one line above is synonymous with writing

```javascript
const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
rect.setAttribute("x", 10);
rect.setAttribute("y", 10);
rect.setAttribute("width", 280);
rect.setAttribute("height", 130);
mySVG.appendChild(rect);
```

Groups are an SVG's *layers*. Groups can create geometry too.

```javascript
const mySVG = SVG();
const group1 = mySVG.group();
group1.rect(10, 10, 280, 130);
```

The code above will create:

```html
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
  <g>
    ​<rect x=​"10" y=​"10" width=​"620" height=​"460">​</line>​
  </g>​
</svg>
```

# Examples

This page contains live-code examples: [svg.rabbitear.org](https://svg.rabbitear.org)

After download, check out the `examples/` folder.

![example](https://robbykraft.github.io/SVG/examples/vera.svg)

# Methods: style

```
stroke: none
fill: black
```

This is an SVG shape's default style, causing some shapes like <line> to be initially invisible! Typically, there are three ways to change this:

1. `line.setAttribute("stroke", "black")`
2. `line.setAttribute("style", "stroke: black;")`
3. `<style> line { stroke: black; } </style>`

This library introduces a fourth: chaining methods (which ultimately call setAttribute). The name of the function is the name of the style attribute (kebab-case is converted to camel-case).

```javascript
line(0, 0, 300, 300)
  .stroke("#F08")
  .strokeWidth(3);
```

# Methods: constructors

container and header types

```javascript
group()
defs()
clipPath()
mask()
create(tagName) // create any element under the svg namespace
```

geometry primitives

```javascript
line(x1, y1, x2, y2)
circle(x, y, radius)
ellipse(x, y, radiusX, radiusY)
rect(x, y, width, height)
polygon(pointsArray)
polyline(pointsArray)
bezier(fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY)
text(textString, x, y)
arc(x, y, radius, startAngle, endAngle)
wedge(x, y, radius, startAngle, endAngle)
arcEllipse(x, y, radiusX, radiusY, startAngle, endAngle)
wedgeEllipse(x, y, radiusX, radiusY, startAngle, endAngle)
parabola(x, y, width, height)
regularPolygon(cX, cY, radius, sides)
straightArrow(start, end, options)
arcArrow(start, end, options)
```

svg: optional initializers

* 2 numbers: width *then* height
* DOM object, this will be the parent to attach the SVG

```javascript
let mySVG = SVG(640, 480, parent_element);
```

# Methods: object functions

```javascript
save(svg, filename = "image.svg")
load(filename, callback)

removeChildren()
appendTo(parent)
setAttributes(attributeObject)
addClass(className)
removeClass(className)
setClass(className)
setID(idName)

translate(tx, ty)
rotate(degrees)
scale(sx, sy)

getViewBox()
setViewBox(x, y, w, h)
convertToViewBox(x, y)
translateViewBox(dx, dy)
scaleViewBox(scale, origin_x = 0, origin_y = 0)

getWidth()
getHeight()
setWidth(w)
setHeight(h)
background(color)
size(width, height)
size(x, y, width, height)
```

# Methods: interaction

```javascript
// a property of an SVG (not a method), the current location of the pointer
mouse

// event handlers
mouseMoved = function (event) { }
mousePressed = function (event) { }
mouseReleased = function (event) { }
scroll = function (event) { }
animate = function (event) { }

// clear all event handlers
clear()
```

the mouse event is

```javascript
{
  isPressed: false, // is the mouse button pressed (y/n)
  position: [0,0],  // the current position of the mouse [x,y]
  pressed: [0,0],   // the last location the mouse was pressed
  drag: [0,0],      // vector, displacement from start to now
  prev: [0,0],      // on mouseMoved, the previous location
  x: 0,             //
  y: 0              // -- x and y, these are the same as position
}
```

the animate event is

```javascript
{
  time: 0.0, // in seconds
  frame: 0  // integer
}
```

# Methods: on geometry primitives

```javascript
poly.setPoints(pointsArray)
arc.setArc(x, y, radius, startAngle, endAngle, includeCenter = false)
ellipseArc.setEllipticalArc(x, y, rX, rY, startAngle, endAngle, includeCenter = false)
bezier.setBezier(fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY)

shape.mask(m) // the mask "m" will be 
```

# Methods: masking and clipping

```javascript
const c = clipPath(); // create a clip path
c.rect(20, 20, 80, 80) // define the clip path

line(0, 0, 100, 100).clipPath(c) // make a shape follow the clip path
```

![example](https://robbykraft.github.io/SVG/examples/dragon.svg)
