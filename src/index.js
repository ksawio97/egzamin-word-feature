// test started
document.getElementById('start-test').addEventListener('click', () => {
    // wait for media to render
    const interval = setInterval(() => {
        const mediaContainer = document.querySelector('#test-container section.media');
        if (!mediaContainer)
            return;
        // add event to show video on media container click 
        mediaContainer.addEventListener('click', () => {
            document.getElementById('button-start')?.click();
        });

        clearInterval(interval);
    }, 100);
});