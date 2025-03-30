// ERROR MESSAGES
const errorMessages = document.querySelector('.error-messages');

// WORD CONTAINERS
const wordContainers = document.querySelectorAll('.main-word-inner');

// KEYS
const keyButtons = document.querySelectorAll('.main-keyboard button');
const letterKeys = document.querySelectorAll('.main-keyboard-button-letter');
const enterKey = document.querySelector('.main-keyboard-button-enter');
const removeKey = document.querySelector('.main-keyboard-button-remove');

// WORDLE
const wordle = {
    try: {
        tryCount: 0,
        tryParentIndex: 0,
        tryChildIndex: 0,
        tryArr: [],
    },
    randomWord: undefined,
    words: [],
};

async function gettingRandomWord() {
    try {
        const request = new Request('../words/words.json');

        const response = await fetch(request);

        const data = await response.json();

        // GETTING RANDOM WORD
        wordle.randomWord = data.words[Math.floor(Math.random() * data.words.length)];

        // PUSHING ALL THE WORDS INTO MY WORDS PROPERTY
        for (let i = 0; i < data.words.length; i++) {
            wordle.words.push(data.words[i]);
        };

        // ENABLING THE KEYBOARD
        for (const keyButton of keyButtons) {
            keyButton.disabled = false;
        };
    } catch (error) {
        console.log(error);
    };
};

gettingRandomWord()

// SETTING ATTRIBUTES TO THE WORD ELEMENT

for (let i = 0; i < wordContainers.length; i++) {
    for (let iterator = 0; iterator < wordContainers[i].children.length; iterator++) {
        wordContainers[i].children[iterator].setAttribute('data-word-index', iterator);
    };
};

// HANDLING THE KEYS' FUNCTIONALITIES

for (let i = 0; i < letterKeys.length; i++) {
    letterKeys[i].addEventListener('click', () => {
        if (wordle.try.tryArr.length < 5) {
            wordContainers[wordle.try.tryParentIndex].children[wordle.try.tryChildIndex].textContent = letterKeys[i].value;
            wordContainers[wordle.try.tryParentIndex].children[wordle.try.tryChildIndex].classList.add('main-word-inner-itself-occupied');
            wordle.try.tryArr.push(letterKeys[i].value);
            wordle.try.tryChildIndex++;
        };
    });
};

// HANDLING THE REMOVE FUNCTIONALITY

function handlingTheRemoveFunctionality() {
    if (wordle.try.tryArr.length > 0) {
        wordle.try.tryChildIndex--;
        wordContainers[wordle.try.tryParentIndex].children[wordle.try.tryChildIndex].textContent = '';
        wordContainers[wordle.try.tryParentIndex].children[wordle.try.tryChildIndex].classList.remove('main-word-inner-itself-occupied');
        wordle.try.tryArr.pop();
    };
};

// CHECKING THE GUESS

function checkingTheGuess() {
    const errors = [];

    // CHECKING IF THE ARRAY'S LENGTH IS 5
    if (wordle.try.tryArr.length < 5) {
        errors.push('Array is not completely filled.');
        wordContainers[wordle.try.tryParentIndex].classList.add('main-word-inner-error');
        setTimeout(() => wordContainers[wordle.try.tryParentIndex].classList.remove('main-word-inner-error'), 300);
        errorMessage('Not enough letters');
    };

    // CHECKING IF THE INPUT IS A REAL WORD OR NOT
    if (wordle.try.tryArr.length === 5) {
        const enteredGuess = wordle.try.tryArr.join(',').replaceAll(',', '');
        if (!wordle.words.includes(enteredGuess)) {
            errors.push('It is not listed word');
            wordContainers[wordle.try.tryParentIndex].classList.add('main-word-inner-error');
            setTimeout(() => wordContainers[wordle.try.tryParentIndex].classList.remove('main-word-inner-error'), 300);
            errorMessage('It is not in the list.');
        };
    };


    if (errors.length === 0) {
        // CHECKING IF THE GUESS WAS CORRECT
        const enteredGuess = wordle.try.tryArr.join(',').replaceAll(',', '');

        if (enteredGuess === wordle.randomWord) {
            // ADDING THE WIN CLASS
            for (const word of wordContainers[wordle.try.tryParentIndex].children) {
                word.classList.add('main-word-inner-itself-correct-spot');
            };

            // DISABLING THE KEYBOARD
            for (const keyButton of keyButtons) {
                keyButton.disabled = true;
            };
        } else {
            // IF NOT:
            for (let i = 0; i < wordle.try.tryArr.length; i++) {
                if (wordle.randomWord.includes(wordle.try.tryArr[i])) {
                    if (wordle.try.tryArr[i] === wordle.randomWord[i]) {
                        wordContainers[wordle.try.tryParentIndex].children[i].classList.add('main-word-inner-itself-correct-spot');
                    } else {
                        wordContainers[wordle.try.tryParentIndex].children[i].classList.add('main-word-inner-itself-incorrect-spot');
                    };
                } else {
                    wordContainers[wordle.try.tryParentIndex].children[i].classList.add('main-word-inner-itself-not-found');
                };
            };

            // GOING TO THE NEXT TRY
            wordle.try.tryArr = [];
            wordle.try.tryParentIndex++;
            wordle.try.tryChildIndex = 0;
            wordle.try.tryCount++;

            // IF TRIED 6 TIMES
            if (wordle.try.tryCount === 6) {
                // DISABLING THE KEYBOARD
                for (const keyButton of keyButtons) {
                    keyButton.disabled = true;
                };
            };
        };
    };
};

// ERROR MESSAGE

function errorMessage(errorMessageText) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = errorMessageText;

    errorMessages.appendChild(errorMessage);
    setTimeout(() => errorMessages.removeChild(errorMessage), 1200);
};

// INITIALIZE BUTTONS
enterKey.addEventListener('click', checkingTheGuess);
removeKey.addEventListener('click', handlingTheRemoveFunctionality);

//

window.addEventListener('keydown', e => {
    for (const keyButton of keyButtons) {
        keyButton.blur();
    };

    // IF TRIED 6 TIMES
    if (wordle.try.tryCount < 6) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';

        // LETTER KEYS
        if (alphabet.includes(e.key)) {
            if (wordle.try.tryArr.length < 5) {
                wordContainers[wordle.try.tryParentIndex].children[wordle.try.tryChildIndex].textContent = e.key;
                wordContainers[wordle.try.tryParentIndex].children[wordle.try.tryChildIndex].classList.add('main-word-inner-itself-occupied');
                wordle.try.tryArr.push(e.key);
                wordle.try.tryChildIndex++;
            };
        };

        // REMOVE
        if (e.key === 'Backspace') {
            handlingTheRemoveFunctionality();
        };

        // ENTER
        if (e.key === 'Enter') {
            checkingTheGuess();
        };  
    };
});