window.addEventListener('DOMContentLoaded', function () {
    const votingPlace = document.querySelector('.voting-place');
    const resultVoting = document.querySelector('.result-voting');
    const toVoteBtn = document.querySelector('.js-to-vote-btn');
    const voteForCats = document.querySelector('.js-voting-cats');
    const voteForDogs = document.querySelector('.js-voting-dogs');
    const voteForParrots = document.querySelector('.js-voting-parrots');
    const resultProgressCats = document.querySelector('.js-progress-cats');
    const resultProgressDogs = document.querySelector('.js-progress-dogs');
    const resultProgressParrots = document.querySelector('.js-progress-parrots');
    const resultVoicesCats = document.querySelector('.js-voices-cats');
    const resultVoicesDogs = document.querySelector('.js-voices-dogs');
    const resultVoicesParrots = document.querySelector('.js-voices-parrots');
    const header = new Headers({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
    });
    const url = new URL('https://sf-pyw.mosyag.in/sse/vote/stats');
    const ES = new EventSource(url, header);


    ES.addEventListener('error', error => {
        ES.readyState ? console.log(error) : null;
    });

    ES.addEventListener('message', function (message) {
        const data = JSON.parse(message.data);
        let maxValue = 0;

        for (let item in data) {
            maxValue < data[item] ? maxValue = data[item] : false;
        }

        const progress = document.querySelectorAll('progress');
        progress.forEach(el => el.max = maxValue);
        resultProgressCats.value = data["cats"];
        resultProgressDogs.value = data["dogs"];
        resultProgressParrots.value = data["parrots"];

        resultVoicesCats.textContent = `${data["cats"]}`;
        resultVoicesDogs.textContent = `${data["dogs"]}`;
        resultVoicesParrots.textContent = `${data["parrots"]}`;
    });

    voteForCats.addEventListener('click', () => {
        sendPOST('/sse/vote/cats');
        checkHidden();
    });

    voteForDogs.addEventListener('click', () => {
        sendPOST('/sse/vote/dogs');
        checkHidden();
    });

    voteForParrots.addEventListener('click', () => {
        sendPOST('/sse/vote/parrots');
        checkHidden();
    });

    toVoteBtn.addEventListener('click', () => checkHidden());


    function sendPOST(url) {
        fetch(`https://sf-pyw.mosyag.in${url}`, {
            method: 'POST',
        })
    }

    function checkHidden() {
        votingPlace.classList.toggle('hide');
        resultVoting.classList.toggle('hide');
    }
});