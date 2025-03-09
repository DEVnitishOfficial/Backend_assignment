# Union Function

This project implements a JavaScript function `union()` that merges two arrays while preserving order and avoiding duplicates.

## Features
- Supports primitive values, objects, and nested arrays
- Uses ES6 features (`Set`, recursion, spread operator)
- Includes Jest test cases

## Usage

```js
const union = require("./union");

console.log(union([1, 2, 3], [2, 3, 4]));
// Output: [1, 2, 3, 4]
