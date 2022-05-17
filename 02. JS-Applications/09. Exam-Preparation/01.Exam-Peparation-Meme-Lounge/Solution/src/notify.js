const element = document.getElementById('errorBox');
const output = document.getElementById('errMsg');

export function notify(msg){
    output.textContent = msg;
    element.style.display = 'block';

    setTimeout (() => element.style.display = 'none', 3000); // timeout of 3 seconds!
}