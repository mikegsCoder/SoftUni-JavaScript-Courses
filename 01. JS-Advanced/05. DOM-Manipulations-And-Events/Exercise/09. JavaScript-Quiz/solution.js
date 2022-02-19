function solve() {
    let sectionsElements = Array.from(document.querySelectorAll('section'));
    let correctAnswersArr = [
        'onclick',
        'JSON.stringify()',
        'A programming API for HTML and XML documents',
    ];
    let correctAnswers = 0;

    nextSection(0);

    function nextSection(index) {
        let sectionElement = sectionsElements[index];
        sectionElement.style.display = 'block';

        Array.from(sectionElement.querySelectorAll('ul li div p.answer-text')).forEach(answer => {
            answer.addEventListener('click', (e) => {
                if (correctAnswersArr.includes(e.target.textContent)) correctAnswers++;
                sectionElement.style.display = 'none';

                if (index == sectionsElements.length - 1) {
                    let resultElement = document.querySelector('#results li h1');

                    if (correctAnswers == 3) {
                        resultElement.textContent = 'You are recognized as top JavaScript fan!'
                    } else {
                        resultElement.textContent = `You have ${correctAnswers} right answers`;
                    }

                    resultElement.parentElement.parentElement.style.display = 'block';

                    return;
                }
                
                nextSection(index + 1);
            });
        });
    }
}
