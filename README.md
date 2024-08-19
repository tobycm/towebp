A small [node.js](http://nodejs.org) library for converting any image to webp file format

## What's New

* TypeScript!
* Clean code, use system binaries instead of shipped

# How to use

```js {"id":"01J5MJ5RS0Y602WNP1M29Y6W6E"}
import { cwebp, gwebp } from "towebp";

await cwebp("input.jpg", "output.webp", "-q 80")

// for gifs

await gwebp("input.gif", "output.webp", "-q 80")

```
