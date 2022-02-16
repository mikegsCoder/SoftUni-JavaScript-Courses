function colorize() {
    let tableElements = document.querySelectorAll('tr:nth-child(even)');

    for (const child of tableElements) {
        child.style.backgroundColor = "Teal";
    }
}