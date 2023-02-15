const btn = document.querySelector('.talk');
const content = document.querySelector('.content');



const greetings = [
    'im good and you',
    'how is it homeboy',
    'im not feeling well',
    'i need coffee first',
    'leave me alone bro'
];

const weather = [' weather is fine', ' you need help']


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();



recognition.onstart = function() {
    console.log('voice activated');

};
recognition.onresult = function(event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);

};


btn.addEventListener('click', () => {
    recognition.start();
});

function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = 'say it louder';


    if (message.includes('how are', 'how is ')) {
        const finalText =
            greetings[Math.floor(Math.random() * greetings || weather
                .length)];
        speech.text = finalText;
    }
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}