# SVG

[![Build Status](https://travis-ci.org/robbykraft/SVG.svg?branch=master)](https://travis-ci.org/robbykraft/SVG)

creative coding with SVG.

*easy drawing, easy styling, event handlers, browser or node.js*

## Examples

[svg.rabbitear.org](https://svg.rabbitear.org), a live code editor, including examples.

There are also examples in the `examples/` folder when you download it.

## Usage

download and include `svg.js`, or in node `npm i rabbit-ear-svg`

This creates an `<svg>` element.

```javascript
const svg = SVG()
```

This creates an `<svg>` element **and** appends it to the body

```javascript
const svg = SVG(document.body)
```

This creates an `<svg>` with viewBox dimensions 800x600.

```javascript
const svg = SVG(800, 600)
```

Drawing is done by *appending* children to a parent. The last line will appear on top; the painter's algorithm.

```javascript
svg.rect(x, y, width, height)
svg.line(x, y, x2, y2).stroke("#000")
```

Groups are used to manage layer order.

```javascript
const layer = svg.g()
layer.rect(x, y, width, height)
layer.path().Move(x1, y1).line(x2, y2).Curve(cx1, cy1, cx2, cy2, x3, y3)
```

*Path command upper/lower case relates to their [path commands in the spec](https://www.w3.org/TR/SVG/paths.html#PathData)*

**Style** is applied using method-chaining, camel-case svg attributes.

```javascript
svg.line(0, 0, 300, 300)
  .stroke("#F08")
  .strokeWidth(3)
  .strokeDasharray("5 3")
```

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

all supported elements

```
svg, defs, desc, filter, metadata, style, script, title, view, cdata, g, circle, ellipse, line, path, polygon, polyline, rect, text, marker, symbol, clipPath, mask, linearGradient, radialGradient, pattern, textPath, tspan, stop, feBlend, feColorMatrix, feComponentTransfer, feComposite, feConvolveMatrix, feDiffuseLighting, feDisplacementMap, feDistantLight, feDropShadow, feFlood, feFuncA, feFuncB, feFuncG, feFuncR, feGaussianBlur, feImage, feMerge, feMergeNode, feMorphology, feOffset, fePointLight, feSpecularLighting, feSpotLight, feTile, feTurbulence,
```

geometry primitives with setters/getters

```javascript
line(x1, y1, x2, y2)
circle(x, y, radius)
ellipse(x, y, radiusX, radiusY)
rect(x, y, width, height)
polygon(pointsArray)
polyline(pointsArray)
path()
text(textString, x, y)

wedgeEllipse(x, y, radiusX, radiusY, startAngle, endAngle)
parabola(x, y, width, height)
regularPolygon(cX, cY, radius, sides)
roundRect(x, y, width, height, cornerRadius)
```

methods on the `<svg>` element

```javascript
clear()
size(x, y, w, h)
size(w, h)
setViewBox(x, y, w, h)
background(color)
getWidth()
getHeight()
stylesheet(css)
load(file)
save()
```

methods on the `<path>` element

```javascript
clear()
command(command, ...args)
get()
set(...)
add(string)
```


## Credit

- [vkBeautify](https://github.com/vkiryukhin/vkBeautify)
- [XML DOM](https://github.com/xmldom/xmldom)

## License

MIT
