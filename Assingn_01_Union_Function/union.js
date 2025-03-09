// union.js

  function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every(key => deepEqual(obj1[key], obj2[key]));
}

  function union(arr1, arr2) {
    const result = [];
    const seen = new Set();

    function addItem(item) {
        if (typeof item === "object" && item !== null) {
            if (!result.some(existingItem => deepEqual(existingItem, item))) {
                result.push(item);
            }
        } else {
            if (!seen.has(item)) {
                seen.add(item);
                result.push(item);
            }
        }
    }

    arr1.forEach(addItem);
    arr2.forEach(addItem);

    return result;
}

module.exports = union;
