# SVG

a simple creative coding Javascript module to make SVG interactive and a little bit more accessible.

# Features

create a `View()` object, think of it like an SVG. it *contains* the SVG, but also comes with event handlers and convenience functions.

```
let sketch = SVG.View()
```

## View() constructors

* `id` *string* the name of DOM object-the SVG will be appended as a child. otherwise, the SVG will be appended to the body.

* `width` `height` *number* if you supply a pair of numbers, these define the canvas size.

**example** full-screen svg:

```javascript
let sketch = SVG.View(window.innerWidth, window.innerHeight);
```

**example** 500px by 300px width/height svg, appended as a child to the element with id="introduction":

*it's implied that width comes before height, otherwise these can be in any order.*

```javascript
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
* `arc (x, y, radius, startAngle, endAngle)`
* `wedge (x, y, radius, startAngle, endAngle)`
* `text (textString, x, y)`
* `regularPolygon (cX, cY, radius, sides)`

It's possible to `download()` and `load("filename.svg")` svg files to and from the View.

All of these primitives end with an optional 3 parameters:

* className
* id
* parent node

`circle (x, y, radius, className, id, parentNode)`

abbreviate your code by turning these lines:

```
let c = circle (100, 50, 2);
c.setAttribute("class", "fill-circle");
sketch.appendChild(c);
```

into just one:

```
circle (100, 50, 2, "fill-circle", id, sketch);
```

## Update geometry once it's been created

**setPoints** works on `polygon` and `polyline` objects:

`setPoints(polygon, pointsArray)`

**setArc** works on `arc` and `wedge` types (**path** objects):

setArc(shape, x, y, radius, startAngle, endAngle, includeCenter)

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

## Import / Export

It's possible to download the current state of the SVG, or load from file.

* `download(svg, filename)`
* `load(input, callback)`

![example](https://cdn.rawgit.com/robbykraft/SVG/master/examples/vera.svg)

# Usage

See the `examples/` folder to get started.

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

![example](https://cdn.rawgit.com/robbykraft/SVG/master/examples/dragon.svg)
