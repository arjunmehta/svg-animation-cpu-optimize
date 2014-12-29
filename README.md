svg-animation-cpu-optimize
==========================

A javascript module to optimize svg animations to consume less cpu cycles and less energy when embedded in HTML.

## Efficiency
Animated SVG files are an extremely useful and powerful online communication tool. **Scalable*** animated diagrams and images are highly sought after for information visualization and animated SVGs (using SMIL instructions) can be entirely self-contained.

While most modern browsers (with the exception of IE) do an amazing job displaying SVG animations, there are a few issues with processor usage and thus energy consumption.

This library helps resolve added CPU consumption by controlling Animated SVGs embedded in an HTML page:
- Synchronizes all SVG animations to their beginning on page load.
- Pauses all animations that do not appear on screen.
- Plays animations when they appear on screen, and pauses them again when they leave the screen (on scroll)
- Group animations that need to be synchronized as they appear/disappear from view
- Pauses all animations when the page is no longer visible (ie. changing tabs)



## Installation

### Using bower
```bash
bower install arjunmehta/svg-animation-cpu-optimize
```

### Using npm
```bash
npm install arjunmehta/svg-animation-cpu-optimize
```

## Usage
This script depends on the [Waypoints library](https://github.com/imakewebthings/waypoints/blob/master/lib/noframework.waypoints.min.js) and its [inview shortcut](https://github.com/imakewebthings/waypoints/blob/master/lib/shortcuts/inview.min.js) in order to function. These should be installed when you install the package using `bower` or `npm`. The location of these files will be in either `bower_components/waypoints/lib` or `node_modules/jquer-waypoints/lib`.

### Including Dependencies
```html
<script src="waypoints/noframework.waypoints.min.js" type="text/javascript"/>
<script src="waypoints/shortcuts/inview.min.js" type="text/javascript"/>

<script src="svg-anim-opt.js" type="text/javascript"/>
```

### Embedding SVG Animations
Now every SVG Animation `object` you have embedded will be controlled by the library. Just make sure that your `object` has `type="image/svg+xml"`.

```html
<object data="/img/time/time_continuum_anim.svg" type="image/svg+xml"></object>
```

### Grouping SVG Animations
Sometimes you might want to make sure that SVG animations are paused and unpaused together as they appear/disappear from the screen. To do this, just add the `data-svg-anim-group` attribute with a unique group name to your html `object`.

```html
<object data-svg-anim-group="groupA" data="/img/geohash/geohash_zoom-01.svg" type="image/svg+xml"></object>
<object data-svg-anim-group="groupA" data="/img/geohash/geohash_range-01a.svg" type="image/svg+xml"></object>
```

## License

The MIT License (MIT)

Copyright (c) 2014 Arjun Mehta

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
