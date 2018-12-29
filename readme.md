# SVG

A simple creative coding Javascript library to make SVG interactive and a little bit more accessible

# Usage

Include svg.js in your project

```html
<script src="svg.js"></script>
```

Read [this introduction blog post](https://blog.rabbitear.org/2018/12/29/svg/) and see the `examples/` folder included in this project to get started.

The following code draws the Japanese flag:

```javascript
let flag = SVG.Image(600, 400);
let rect = SVG.rect(0, 0, flag.width, flag.height);
let circle = SVG.circle(flag.width/2, flag.height/2, flag.height*0.3);

rect.setAttribute("fill", "white");
circle.setAttribute("fill", "#BC002D");

flag.appendChild(rect);
flag.appendChild(circle);
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

```
setViewBox(svg, x, y, width, height, padding = 0)
setDefaultViewBox(svg)
getViewBox(svg)
```

these alter the viewBox. no CSS transforms here.

```
scale(svg, scale, origin_x = 0, origin_y = 0)
translate(svg, dx, dy)
```

![example](https://cdn.rawgit.com/robbykraft/SVG/master/examples/vera.svg)

# the Image() object

One Image() instance gives you an SVG with a bunch of convenience methods and event handlers. Optional initializers are 

* 2 numbers: width *then* height
* string ID name, or DOM pointer to the parent element to append this SVG. otherwise the SVG will be appended to the body.

```javascript
let sketch = Image(640, 480, "parent-element");
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

```
{
  time: 0.0
  frame: 0
};
```

![example](https://cdn.rawgit.com/robbykraft/SVG/master/examples/dragon.svg)