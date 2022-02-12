function solve(array) {
    let result = [];

    for (let i = 0; i < array.length; i++) {

        if (array[i] < 0) {
            result.splice(0, 0, array[i]);
        } else {
            result.push(array[i]);
        }
    }

    return result;
}

console.log(solve([7, -2, 8, 9]));
console.log(solve([3, -2, 0, -1]));