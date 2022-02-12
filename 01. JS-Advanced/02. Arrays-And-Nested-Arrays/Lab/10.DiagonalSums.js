function solve(matrix) {
    let mainDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < matrix.length; i++) {
        mainDiagonalSum += matrix[i][i];
        secondaryDiagonalSum += matrix[i][matrix[i].length - 1 - i];
    }

    console.log(`${mainDiagonalSum} ${secondaryDiagonalSum}`);
}

solve([[20, 40], [10, 60]]);

solve([[3, 5, 17], [-1, 7, 14], [1, -8, 89]]);