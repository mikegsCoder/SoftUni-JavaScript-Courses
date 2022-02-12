function solve(array) {
    let startIndex = Math.floor(array.length / 2);
    array.sort(function (a, b) { return a - b });

    return array.slice(startIndex, array.length);
}

solve([4, 7, 2, 5]);
solve([3, 19, 14, 7, 2, 19, 6]);