# SVG

A simple creative coding Javascript library to make SVG interactive and a little bit more accessible

# Usage

Include svg.js in your project.

```html
<script src="svg.js"></script>
```

# Introduction

At its simplest, this library can be used to create SVG elements. 

* `svg()` creates an `<svg>` 
* `line()` creates a `<line>`

At a minimum, you can use these methods to create familiar DOM level 1 objects, saving you time:

```
SVG.rect(10, 10, 640, 480);
```

takes the place of:

```
let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
rect.setAttribute("x", 10);
rect.setAttribute("y", 10);
rect.setAttribute("width", 640);
rect.setAttribute("height", 480);
```

At its most complex, this library includes an `image()` object which incorporates svg with event handling, automatic binding to the page, and wrapping convenience methods onto objects.

# Examples

Read [this introduction blog post](https://blog.rabbitear.org/2018/12/29/svg/) and check out the `examples/` folder included in this project for more demos:

* [random walker](https://robbykraft.github.io/SVG/examples/random-walker.html) ([source](https://github.com/robbykraft/SVG/blob/master/examples/random-walker.html))
* [Georg Nees](https://robbykraft.github.io/SVG/examples/georg-nees.html) ([source](https://github.com/robbykraft/SVG/blob/master/examples/georg-nees.html))
* [Sol Lewitt](https://robbykraft.github.io/SVG/examples/sol-lewitt.html) ([source](https://github.com/robbykraft/SVG/blob/master/examples/sol-lewitt.html))
* [Vera Molnar](https://robbykraft.github.io/SVG/examples/vera-molnar.html) ([source](https://github.com/robbykraft/SVG/blob/master/examples/vera-molnar.html))
* [10-print](https://robbykraft.github.io/SVG/examples/ten-print.html) ([source](https://github.com/robbykraft/SVG/blob/master/examples/ten-print.html))

The following code draws the [Japanese flag](https://robbykraft.github.io/SVG/examples/japanese-flag.html):

```javascript
let flag = SVG.image(600, 400);
let rect = flag.rect(0, 0, flag.w, flag.h);
let circle = flag.circle(flag.w/2, flag.h/2, flag.h*0.3);

rect.setAttribute("fill", "white");
circle.setAttribute("fill", "#BC002D");
```

# Methods

create an SVG. create a group (a container, like *layers* in Photoshop)

```javascript
svg(className, id, parent)
group(className, id, parent)
```

save or load an SVG

```javascript
save(svg, filename = "image.svg")
load(input, callback)
```

geometry primitives

```javascript
line(x1, y1, x2, y2, className, id, parent)
circle(x, y, radius, className, id, parent)
rect(x, y, width, height, className, id, parent)
polygon(pointsArray, className, id, parent)
polyline(pointsArray, className, id, parent)
bezier(fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY, className, id, parent)
text(textString, x, y, className, id, parent)
wedge(x, y, radius, startAngle, endAngle, className, id, parent)
arc(x, y, radius, startAngle, endAngle, className, id, parent)
curve(fromX, fromY, midX, midY, toX, toY, className, id)
regularPolygon(cX, cY, radius, sides, className, id, parent)
```

update geometry for polygon/polyline or arc/wedge

```javascript
setPoints(polygon, pointsArray)
setArc(shape, x, y, radius, startAngle, endAngle, includeCenter = false)
```

class/id convenience methods

```javascript
addClass(xmlNode, newClass)
removeClass(xmlNode, newClass)
setId(xmlNode, newID)
```

clear the contents of an SVG or a group

```javascript
removeChildren(group)
```

setDefaultViewBox matches viewBox to visible dimensions. getViewBox returns an array of 4 numbers

```javascript
setViewBox(svg, x, y, width, height, padding = 0)
setDefaultViewBox(svg)
getViewBox(svg)
```

these alter the viewBox. no CSS transforms here.

```javascript
scale(svg, scale, origin_x = 0, origin_y = 0)
translate(svg, dx, dy)
```

![example](https://robbykraft.github.io/SVG/examples/vera.svg)

everything is accessible under the `SVG` namespace. additionally, draw methods are attached to `<svg>` and `<g>` elements saving you the step of calling `appendChild`.

1. create an svg or group
2. draw *from* this element

```javascript
let g = SVG.group()
g.line(1,2,3,4)
```

creates

```html
<g>
    ​<line x1=​"1" y1=​"2" x2=​"3" y2=​"4">​</line>​
</g>​
```

# the Image() object

One Image() instance gives you an SVG with a bunch of convenience methods and event handlers. Optional initializers are 

* 2 numbers: width *then* height
* string ID name, or DOM pointer to the parent element to append this SVG. otherwise the SVG will be appended to the body.

```javascript
let sketch = SVG.image(640, 480, "parent-element");
```

many of the methods are copied from greater SVG namespace, but often with fewer arguments as its implied that operations are performed on *this* SVG.

```javascript
load(data, callback)
save(filename)
```

get or set the visible dimensions. not the viewBox

```javascript
width
height
```

removeChildren can accept an optional *group* argument, otherwise it removes all children from this SVG.

```javascript
appendChild(node)
removeChildren()
```


```javascript
setViewBox(x, y, width, height)
getViewBox()
```

a pointer to the actual DOM level SVG object

```javascript
svg
```

event handlers

```javascript
myImage.onMouseMove = function(mouse) { }
myImage.onMouseDown = function(mouse) { }
myImage.onMouseUp = function(mouse) { }
myImage.onMouseLeave = function(mouse) { }
myImage.onMouseEnter = function(mouse) { }
myImage.animate = function(event) { }
```

all the mouse handlers provide this object

```javascript
{
  isPressed: false, // is the mouse button pressed (y/n)
  position: [0,0],  // the current position of the mouse [x,y]
  pressed: [0,0],   // the last location the mouse was pressed
  drag: [0,0],      // vector, displacement from start to now
  prev: [0,0],      // on mouseMoved, the previous location
  x: 0,             //
  y: 0              // -- x and y, these are the same as position
};
```

and the animate handler provides elapsed seconds (float) and frame number (integer)

```javascript
{
  time: 0.0
  frame: 0
};
```

# Appendix

the entire contents of SVG:

```
arc: ƒ (x, y, radius, angleA, angleB)
bezier: ƒ (fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY)
circle: ƒ (x, y, radius)
controls: ƒ controls(svgObject, number = 1, options)
convertToViewBox: ƒ (svg, x, y)
ellipse: ƒ (x, y, rx, ry)
getViewBox: ƒ (svg)
group: ƒ ()
image: ƒ image()
line: ƒ (x1, y1, x2, y2)
load: ƒ (input, callback)
polygon: ƒ (pointsArray)
polyline: ƒ (pointsArray)
rect: ƒ (x, y, width, height)
regularPolygon: ƒ (cX, cY, radius, sides)
removeChildren: ƒ (parent)
save: ƒ (svg, filename = "image.svg")
scaleViewBox: ƒ (svg, scale, origin_x = 0, origin_y = 0)
setArc: ƒ (shape, x, y, radius, startAngle, endAngle, includeCenter = false)
setPoints: ƒ (polygon, pointsArray)
setViewBox: ƒ (svg, x, y, width, height, padding = 0)
svg: ƒ ()
text: ƒ (textString, x, y)
translateViewBox: ƒ (svg, dx, dy)
wedge: ƒ (x, y, radius, angleA, angleB)
```

![example](https://robbykraft.github.io/SVG/examples/dragon.svg)
