function calc() {
    let one = document.querySelector('#num1');
    let two = document.querySelector('#num2');
    let sum = Number(one.value) + Number(two.value);
    
    document.querySelector('#sum').value = sum;
}
