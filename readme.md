# SVG

[![Build Status](https://travis-ci.org/robbykraft/SVG.svg?branch=master)](https://travis-ci.org/robbykraft/SVG)

creative coding with SVG.

The library offers argument parsing, styling via method-chaining, event handlers that work for computers and touch screens, and can run in the browser or Node.

```html
<script src="svg.js"></script>
```

```javascript
const SVG = require("rabbit-ear-svg")
```

## Examples

[svg.rabbitear.org](https://svg.rabbitear.org), a live code editor, including examples.

There are also examples in the `examples/` folder when you download it.

## Usage

```javascript
const svg = SVG()
```

This creates an `<svg>` element.

```javascript
const svg = SVG(document.body)
```

This creates an `<svg>` element and appends it to the body

```javascript
const svg = SVG(800, 600)
```

This creates an `<svg>` with viewBox dimensions 800x600.

```javascript
svg.rect(x, y, width, height)
svg.line(x, y, x2, y2).stroke("#000")
```

Drawing is done by *appending* children to a parent. The last line will appear on top; the painter's algorithm.

```javascript
const layer = svg.g()
layer.rect(x, y, width, height)
```

Groups are used to manage layer order.

```javascript
svg.path().Move(x1, y1).line(x2, y2).Curve(cx1, cy1, cx2, cy2, x3, y3)
```

Capitalized path commands relate to the capitalized [path commands in the spec](https://www.w3.org/TR/SVG/paths.html#PathData)

- upper: absolutely positioned
- lowercase: relative

```javascript
svg.line(0, 0, 300, 300)
  .stroke("#F08")
  .strokeWidth(3)
  .strokeDasharray("5 3")
```

**Style** is applied using method-chaining, camel-case svg attributes.

```javascript
svg.onPress = function (mouse) {
  // mobile tablet screen touch or mouse press
}
```

**Events**

- onPress
- onRelease
- onMove
- play

```javascript
svg.play = function (mouse) {
  // video frame based loop
}
```

## Reference

container and header types

```javascript
group()
defs()
clipPath()
mask()
createElement(nodeName) // create any element under the svg namespace
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
