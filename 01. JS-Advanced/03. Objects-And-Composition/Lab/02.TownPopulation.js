function solve(input) {
    let cities = {};

    for (const inputInfo of input) {
        const tokens = inputInfo.split(' <-> ');
        const name = tokens[0];
        const population = tokens[1];

        if (!cities[name]) {
            cities[name] = 0;
        }

        cities[name] += Number(population);
    }

    for (const key in cities) {
        console.log(key + ' : ' + cities[key]);

    }
}

solve(
    ['Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Las Vegas <-> 1000000']);