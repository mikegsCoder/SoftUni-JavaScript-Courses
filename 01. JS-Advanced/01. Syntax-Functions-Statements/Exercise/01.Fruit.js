function solve(fruit, weight, money){
    const kilograms = weight / 1000;

    console.log(`I need $${(kilograms * money).toFixed(2)} to buy ${kilograms.toFixed(2)} kilograms ${fruit}.`);
}

solve('apple', 1563, 2.35);