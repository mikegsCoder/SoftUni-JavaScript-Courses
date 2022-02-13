function solve(input) {
    let value = 0;
    let numbers = [];
    
    for (const command of input) {
        value++;
        command == 'add' ? numbers.push(value) : numbers.pop();
    }
    
    return numbers.length == 0 ? 'Empty' : numbers.join('\n');
}

let result = solve(
    ['add', 
    'add', 
    'remove', 
    'add', 
    'add']);

console.log(result);