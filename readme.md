# SVG

a simple creative coding Javascript module to make SVG interactive and a little bit more accessible.

![example](https://cdn.rawgit.com/robbykraft/SVG/master/examples/dragon.svg)

# Features

`View()` object which manages the svg, interaction, and provides convenience methods.

The drawing primitives are a growing list that includes:

* `line (x1, y1, x2, y2)`
* `circle (x, y, radius)`
* `rect (x, y, width, height)`
* `polygon (pointsArray)`
* `polyline (pointsArray)`
* `bezier (fromX, fromY, c1X, c1Y, c2X, c2, toX, toY)`
* `regularPolygon (cX, cY, radius, sides)`

It's possible to `download()` and `load("filename.svg")` svg files to and from the View.

See the `examples/` folder to get started.

# Usage

Everything is accessible under the `SVG` namespace. Include the script in the html file:

```html
<script type="text/javascript" src="svg.js"></script>
```

An example sketch begins by creating the **View()**. You're able to implement any of the following optional mouse handlers.

```javascript
let sketch = SVG.View(window.innerWidth, window.innerHeight);

sketch.onMouseMove = function(mouse) {}
sketch.onMouseDown = function(mouse) {}
sketch.onMouseUp = function(mouse) {}
sketch.onMouseLeave = function(mouse) {}
sketch.onMouseEnter = function(mouse) {}
```

Drawing a shape might look something like:

```javascript
let circle = SVG.circle(100, 100, 50);
circle.setAttribute("fill", "red");  // using builtin setAttribute
sketch.appendChild(circle);
```

*circle* is nothing more than a SVG circle object. It's possible to call familiar HTML DOM object methods on these, as is happening with `appendChild`. And the attributes being set are simply SVG-spec attributes.
