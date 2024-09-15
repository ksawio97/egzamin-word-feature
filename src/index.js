
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

// test started
document.getElementById('start-test').addEventListener('click', () => {
    // wait for media to render
    const interval = setInterval(() => {
        const mediaContainer = document.querySelector('#test-container section.media');
        if (!mediaContainer)
            return;

        // add auto submit on answer select
        autoSubmit();
        // add event to show video on media container click 
        mediaContainer.addEventListener('click', () => {
            document.getElementById('button-start')?.click();
        });

        clearInterval(interval);
    }, 100);
});