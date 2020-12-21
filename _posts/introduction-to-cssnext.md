---
title: Introduction to cssnext
description: cssnext, a CSS transpiler that allows you to use tomorrow’s CSS syntax today
date: '2015-06-02'
---

From the [official website](http://cssnext.io/):

> **cssnext** is a CSS transpiler that allows you to use tomorrow’s CSS syntax
> today. It transforms CSS specs that are not yet implemented in popular
> browsers into more compatible CSS.

## What does it mean?

Since CSS3, you may have heard that CSS is divided into several independent
documents called “modules”. Those modules can have different levels of stability
and [statuses](http://www.w3.org/Style/CSS/current-work#legend). It can take
quite some time for the browsers to implement those modules and even more for
the W3C to give them the ultimate status of
[Recommandation](http://www.w3.org/2005/10/Process-20051014/tr#RecsW3C).

With **cssnext**, you can use the syntax of 
[CSS Module Level 4](http://www.xanthir.com/b4Ko0) such as custom properties or 
custom media queries. **cssnext** will transform this new strange syntax into 
something that the browser can actually understand.

In short, it makes you **taste the future**.

I don’t know about you but speaking as someone who loves to experiment with
cutting-edge technologies, I think this is pretty cool!

You should take a look at the [feature list](http://cssnext.io/features/).

## What about my current CSS preprocessor?

Forget about the dangers of mixins, @extend and infinite nesting; mostly caused
by overzealous use and/or misuse of such tools, but still.

Guess what, you don’t really need this.

You should give **cssnext** a shot and go back to Vanilla CSS. And with a nice 
and clean touch of BEM syntax, you will feel alive again.

## Examples

Let’s take a look at the features that **cssnext** offers at the moment.

First of all, be sure to check out the 
[playground](http://cssnext.io/playground/) on the official website.

## Automatic vendor prefixes

```css
.h1 {
  transform: skewX(25deg);
  transition: transform 1s;
}
```

This will be transformed by **cssnext** via Autoprefixer in:

```css
.h1 {
  -webkit-transform: skewX(25deg);
      -ms-transform: skewX(25deg);
          transform: skewX(25deg);
  -webkit-transition: -webkit-transform 1s;
          transition: transform 1s;
}
```

## Custom properties & var() limited to :root

Also known as the much awaited 
[CSS variables](http://www.w3.org/TR/css-variables/).

```css
:root {
  --primary-Color:                 #E86100;
  --secondary-Color:               #2c3e50;
  --r-Grid-baseFontSize:           1rem;
}
```

You can use them this way:

```css
.h1 {
  color: var(--primary-Color);
}
.h1:hover {
  color: var(--secondary-Color);
}
body {
  font-size: var(--r-Grid-baseFontSize);
}
```

## Custom Media Queries

Simply-named and semantic aliases
([check the specs](http://dev.w3.org/csswg/mediaqueries/#custom-mq))

```css
@custom-media --viewport-medium (width <= 40rem);
@custom-media --viewport-large (max-width: 50em);
```

Usage:

```css
:root {
  --fontSize: 1.2rem;
}

@media (--viewport-medium) {
  body {
    font-size: calc(var(--fontSize) * 1.2);
  }
}
@media (--viewport-large) {
  body {
    font-size: calc(var(--fontSize) * 1.4);
  }
}
```

The output will be:

```css
@media (max-width: 40rem) {
  body {
    font-size: 1.44rem;
  }
}
@media (max-width: 50em) {
  body {
    font-size: 1.68rem;
  }
}
```

## Custom selectors

Take a look at the 
[specs](http://dev.w3.org/csswg/css-extensions/#custom-selectors) first. 
Let’s say we want to apply some styles to all headings.

```css
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

:--heading {
  margin-top: 0;
}
```

This will output the following:

```css
h1,
h2,
h3,
h4,
h5,
h6 { margin-top; 0; }
```

## color()

A simple [color function](http://dev.w3.org/csswg/css-color/#modifying-colors) 
to apply color adjusters (hue, lightness, tint, and so on) to a base color.

Examples:

```css
.class {
  background-color: color(#2b88e6);
  color: color(#2b88e6 red(+30) green(-50) blue(6%) alpha(0.65));
  border-top-color: color(#2b88e6 saturation(-8%) whiteness(+50%));
  border-right-color: color(#2b88e6 lightness(5%) blackness(-25%));
  border-bottom-color: color(#2b88e6 tint(80%));
  border-left-color: color(#2b88e6 shade(75%));
}
```

The code above will be transformed into…

```css
.class {
  background-color: rgb(43, 136, 230);
  color: rgba(73, 86, 15, 0.65);
  border-top-color: rgb(181, 201, 222);
  border-right-color: rgb(3, 45, 87);
  border-bottom-color: rgb(213, 231, 250);
  border-left-color: rgb(11, 34, 58);
}
```

**cssnext** also offers the following color-related features.

## hwb()

From the [specifications](http://dev.w3.org/csswg/css-color/#the-hwb-notation), 
HWB (Hue-Whiteness-Blackness) is similar to HSL but easier for humans to work
with.

```css
.title {
  color: hwb(125, 32%, 47%);
}
```

Output:

```css
.title {
  color: rgb(33, 135, 42);
}
```

## gray()

Grays are [so cool](http://dev.w3.org/csswg/css-color/#grays) they have a 
function of their own.

```css
.section {
  background-color: gray(120, 50%);
  border-color: gray(17%, 25%);
}
```

This will output:

```css
.section {
  background-color: rgba(120, 120, 120, 0.5);
  border-color: rgba(43, 43, 43, 0.25);
}
```

## #rrggbbaa

**cssnext** transforms the
[hexadecimal notations](http://dev.w3.org/csswg/css-color/#hex-notation) 
#RRGGBBAA and #RGBA into rgba().

```css
body {
  color: #5c69;
  background-color: #c73d5c59;
}
```

Output:

```css
body {
  color: rgba(85, 204, 102, 0.6);
  background-color: rgba(199, 61, 92, 0.34902);
}
```

## rebeccapurple

Simply transforms the color [`rebeccapurple`](https://github.com/postcss/postcss-color-rebeccapurple#why-this-plugin-) into rgb(102, 51, 153).

## filter properties

A whole new world of image modifications!

```css
.awesome-Image {
  filter: sepia(.7) hue-rotate(23deg);
}

.awesome-Picture {
  filter: blur(8px);
}
```

Will be transformed into:

```css
.awesome-Image {
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feColorMatrix type="matrix" color-interpolation-filters="sRGB" values="0.5751000000000001 0.5383 0.1323 0 0 0.24429999999999996 0.7802000000000001 0.11760000000000001 0 0 0.1904 0.3738 0.39170000000000005 0 0 0 0 0 1 0" /><feColorMatrix type="hueRotate" color-interpolation-filters="sRGB" values="23" /></filter></svg>#filter');
  -webkit-filter: sepia(.7) hue-rotate(23deg);
          filter: sepia(.7) hue-rotate(23deg);
}

.awesome-Picture {
  filter: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="filter"><feGaussianBlur stdDeviation="8" /></filter></svg>#filter');
  -webkit-filter: blur(8px);
          filter: blur(8px);
}
```

## rem units

Nothing extraordinary here, it generates pixel fallback for rem units.
Oh, come on! Do we really need an example for this one? Alright, here you go!

```css
.section-Highlight {
  font-size: 2.5rem;
}
```

Output:

```css
.section-Highlight {
  font-size: 40px;
  font-size: 2.5rem;
}
```

## Bonus features

The two following features are not really related to CSS specifications.
However, they are definitely worth mentioning in this introduction.

## `import`

What if you could import inline local files and modules (`node_modules` or 
`web_modules`) to output a bundled CSS file? Yes, I’m looking at you 
[Sass users](https://github.com/sass/sass/issues/193), ahem. 
Well, with cssnext, you can.

## compress

As you may have guessed, this is just an option to compress or not your output
file. By the way, this option uses [cssnano](https://github.com/ben-eb/cssnano).

## Usage

Below is a basic example of these two features. I used 
[gulp-cssnext](https://github.com/cssnext/gulp-cssnext), one of the 
[many plugins](http://cssnext.io/setup/)  to help you start with cssnext.

```js
var gulp = require('gulp'),
    cssnext = require("gulp-cssnext");

gulp.task('styles', function() {
  gulp.src("css/index.css")
  .pipe(cssnext({
    compress: true,  // default is false
  }))
  .pipe(gulp.dest("./dist/"))
});
```

Then, in my index.css file, I will have:

```css
@import "normalize.css"; /* == @import "./node_modules/normalize.css/index.css"; */
@import "cssrecipes-defaults"; /* == @import "./node_modules/cssrecipes-defaults/index.css"; */
@import "project-modules/partner"; /* relative to css/ */
@import "typo"; /* same level as my main index.css located in css/ */
@import "highlight" (min-width: 25em);
```

And the final output will be:

```css
/* content of ./node_modules/normalize.css/index.css */
/* content of ./node_modules/cssrecipes-defaults/index.css */
/* content of project-modules/partner.css */
/* content of typo.css */
@media (min-width: 25em) {
  /* content of highlight.css */
}
```

Well, just to wrap it up here, let’s say that the main purpose of **cssnext** is
to build things according to the W3C specifications keeping in mind that,
theoretically, it can be removed later on (when not needed anymore).

Now it’s your time to play. Be sure to check the GitHub repository, follow
[@cssnext](https://twitter.com/cssnext) on Twitter to get the latest news and 
join the **cssnext** room on Gitter if you have any questions.

