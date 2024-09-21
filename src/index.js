function readAloud() {
    const callback = (mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'characterData') {
                const text = mutation.target.textContent;
                // Add your custom logic here
                window.speechSynthesis.cancel();
                const utter = new SpeechSynthesisUtterance(text);
                utter.lang = 'pl';
                window.speechSynthesis.speak(utter);
            }
          });
    };

    const questionContent = document.getElementById('question-content');

    const observerConfig = {
        characterData: true,
        characterDataOldValue: true,
        subtree: true
    };
    const observer = new MutationObserver(callback);
    observer.observe(questionContent, observerConfig);
}

function autoSubmit() {
    const callback = (mutations) => {
        mutations.forEach(mutation => {
            const element = mutation.target;
            // contains class ng-dirty, means that form has value selected
            if (element.classList.contains('ng-dirty'))
            {
                // click start if it's not clicked
                document.getElementById('button-start')?.click();
                // submit
                document.getElementById('button-next')?.click();
            }
        })
    };
    const answerForm = document.querySelector('.answer form');
    const observer = new MutationObserver(callback)
    observer.observe(answerForm, {
        attributes: true, 
        attributeFilter: ['class'] 
    });
}
const interval = setInterval(() => {
    const testStart = document.getElementById('start-test');
    if (!testStart)
        return;
    clearInterval(interval);
    // test started
    testStart.addEventListener('click', () => {
        // wait for media to render
        const interval = setInterval(() => {
            const mediaContainer = document.querySelector('#test-container section.media');
            if (!mediaContainer)
                return;

            readAloud();
            // add auto submit on answer select
            autoSubmit();
            // add event to show video on media container click 
            mediaContainer.addEventListener('click', () => {
                document.getElementById('button-start')?.click();
            });

            clearInterval(interval);
        }, 100);
    });
}, 100);
