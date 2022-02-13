function solve(array) {
    let result = [];

    array.reduce((acc, curr, index) => {
        if (acc <= curr) {
            result.push(acc);
            acc = curr;
        }

        if (index == array.length - 1) {
            result.push(acc);
        }

        return acc;
    })

    return result;
}

solve([1, 3, 8, 4, 10, 12, 3, 2, 24]);

solve([1, 2, 3, 4]);

solve([20, 3, 2, 15, 6, 1]);