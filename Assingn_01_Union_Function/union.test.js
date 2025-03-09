// union.test.js

const union = require("./union");
// import { union } from "./union";

test("Union of two arrays with primitive values", () => {
    expect(union([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]);
    expect(union(["a"], ["b"])).toEqual(["a", "b"]);
    expect(union([1], ["1", 1])).toEqual([1, "1"]);
});

test("Union with objects and nested objects", () => {
    expect(union([{ a: { b: 10 } }], [{ a: { b: 20 } }])).toEqual([{ a: { b: 10 } }, { a: { b: 20 } }]);
    expect(union([{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, 2], [{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, "2"])).toEqual([{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, 2, "2"]);
});

test("Union with mixed types", () => {
    expect(union([true, null, undefined, "hello"], [false, null, "world"])).toEqual([true, null, undefined, "hello", false, "world"]);
});

test("Union with empty arrays", () => {
    expect(union([], [])).toEqual([]);
    expect(union([1, 2, 3], [])).toEqual([1, 2, 3]);
    expect(union([], [4, 5, 6])).toEqual([4, 5, 6]);
});
