# SVG

[![Build Status](https://travis-ci.org/robbykraft/SVG.svg?branch=master)](https://travis-ci.org/robbykraft/SVG)

creative coding with SVG.

This library makes drawing SVGs nearly easy enough to be used by people new to coding. The library introduces method-chaining for styling, event handlers that work for computers and touch screens, and can run in the browser or Node.

```html
<script src="svg.js"></script>
```

```javascript
const SVG = require("rabbit-ear-svg")
```

## Usage

```javascript
const svg = SVG()
```

This creates an `<svg>` element.

**optional init parameters** can contain: *2 numbers*: viewBox width and height, *DOM node*: the svg's parent in the window, *function*: a callback after window.onload and after the SVG is on screen.

All drawing primitives can be created as children of this new instance.

```javascript
svg.rect(x, y, width, height)
svg.path().moveTo(x1, y1).lineTo(x2, y2).curveTo(cx1, cy1, cx2, cy2, x3, y3)
```

A **group** is one container-type element that can also be used to create primitives or more groups. Groups are used to manage layer order.

```javascript
const topLayer = svg.group()
topLayer.rect(x, y, width, height)
```

**Style** is applied using method-chaining.

```javascript
svg.line(0, 0, 300, 300)
  .stroke("#F08")
  .strokeWidth(3)
  .strokeDasharray("5 3")
```

**Events** combine both mouse and touch ('onmousedown' and 'ontouchstart'). **Animate** is a simple way to initialize a 60-fps game loop.

- mousePressed
- mouseReleased
- mouseMoved
- animate

```javascript
svg.mousePressed = function (mouse) {

}
```

## Examples

Check out the examples in the `examples/` folder.

`examples/code/` contains a live-coding window, perfect for becoming acquainted. This example is also here [svg.rabbitear.org](https://svg.rabbitear.org).

## Reference

container and header types

```javascript
group()
defs()
clipPath()
mask()
createElement(tagName) // create any element under the svg namespace
```

geometry primitives

```javascript
line(x1, y1, x2, y2)
circle(x, y, radius)
ellipse(x, y, radiusX, radiusY)
rect(x, y, width, height)
polygon(pointsArray)
polyline(pointsArray)
path() // method-chain with .moveTo() .curveTo() ...
bezier(fromX, fromY, c1X, c1Y, c2X, c2Y, toX, toY)
text(textString, x, y)
arc(x, y, radius, startAngle, endAngle)
wedge(x, y, radius, startAngle, endAngle)
arcEllipse(x, y, radiusX, radiusY, startAngle, endAngle)
wedgeEllipse(x, y, radiusX, radiusY, startAngle, endAngle)
parabola(x, y, width, height)
regularPolygon(cX, cY, radius, sides)
roundRect(x, y, width, height, cornerRadius)
arrow() // method-chain with .head() .tail()
```

more SVG methods

```javascript
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

## Credit

- [vkBeautify](https://github.com/vkiryukhin/vkBeautify)
- [XML DOM](https://github.com/xmldom/xmldom)

## License

MIT
