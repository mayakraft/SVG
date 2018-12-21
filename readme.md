# SVG

a simple creative coding Javascript module to make SVG interactive and a little bit more accessible.

![example](https://cdn.rawgit.com/robbykraft/SVG/master/examples/dragon.svg)

# Features

create a `View()` object, think of it like an SVG. it *contains* the SVG, but also comes with event handlers and convenience functions.

```
let sketch = SVG.View()
```

## View() constructors

* `id` *string* the name of DOM object-the SVG will be appended as a child. otherwise, the SVG will be appended to the body.

* `width` `height` *number* if you supply a pair of numbers, these define the canvas size.

**example** full-screen svg:

```
let sketch = SVG.View(window.innerWidth, window.innerHeight);
```

**example** 500px by 300px width/height svg, appended as a child to the element with id="introduction":

```
let sketch = SVG.View("introduction", 500, 300);
```

## Drawing primitives

The drawing primitives are a growing list that includes:

* `line (x1, y1, x2, y2)`
* `circle (x, y, radius)`
* `rect (x, y, width, height)`
* `polygon (pointsArray)`
* `polyline (pointsArray)`
* `bezier (fromX, fromY, c1X, c1Y, c2X, c2, toX, toY)`
* `arc(x, y, radius, startAngle, endAngle)`
* `wedge(x, y, radius, startAngle, endAngle)`
* `text(textString, x, y)`
* `regularPolygon (cX, cY, radius, sides)`

It's possible to `download()` and `load("filename.svg")` svg files to and from the View.

See the `examples/` folder to get started.

## Event handlers

You're able to implement any of the following optional mouse handlers.

```javascript
let sketch = SVG.View(window.innerWidth, window.innerHeight);

sketch.onMouseMove = function(mouse) {}
sketch.onMouseDown = function(mouse) {}
sketch.onMouseUp = function(mouse) {}
sketch.onMouseLeave = function(mouse) {}
sketch.onMouseEnter = function(mouse) {}
```

# Usage

Everything is accessible under the `SVG` namespace. Include the script in the html file:

```html
<script type="text/javascript" src="svg.js"></script>
```
Drawing a shape might look something like:

```javascript
let circle = SVG.circle(100, 100, 50);
circle.setAttribute("fill", "red");  // using builtin setAttribute
sketch.appendChild(circle);
```

Nothing is overloaded, this library depends on conventional SVG, CSS, and HTML commands. *circle* is nothing more than a SVG circle object. It's possible to call familiar HTML DOM object methods on these, as is happening with `appendChild`. And the attributes being set are simply SVG-spec attributes.
