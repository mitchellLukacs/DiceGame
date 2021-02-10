const rollButton = document.querySelector('#roll');
const nextTurn = document.querySelector('#nextTurn');
const score = document.querySelector('#score');

function generateNum() {
    return Math.floor((Math.random() * 6) + 1);
}

const activeDivs = document.querySelectorAll('.active');
const savedDivs = document.querySelectorAll('.saved');

let numOfRolls = 0;

const dice = [
    {
        id: 'die1',
        saved: false,
        value: null,
    },
    {
        id: 'die2',
        saved: false,
        value: null,
    },
    {
        id: 'die3',
        saved: false,
        value: null,
    },
    {
        id: 'die4',
        saved: false,
        value: null,
    },
    {
        id: 'die5',
        saved: false,
        value: null,
    },
]

const playerRoll = [];

function rolldice() {
    numOfRolls++;
    if (numOfRolls <= 3) {
        for (let die of dice) {
            document.querySelector(`#${die.id}`).className = 'highlight';
            if (die.saved == false) {
                die.value = generateNum();
                document.querySelector(`#${die.id}`).innerText = die.value;
            }
        }
    }
}

function save() {
    i = 1;
    for (let die of dice) {
        const savedDiv = document.querySelector(`#saved${i}`);
        if (die.id == this.id) {
            die.saved = !die.saved;
            savedDiv.classList.toggle('highlight');
            savedDiv.innerText = die.value;
            this.style.display = 'none';
        }
        i++;
    }
}

function unsave() {
    for (let die of dice) {
        const activeDiv = document.querySelector(`#${die.id}`);
        if (die.id[3] == this.id[5]) {
            die.saved = !die.saved;
            this.innerText = null;
            this.classList.toggle('highlight');
            activeDiv.style.display = 'block';
        }
    }
}

function reset() {
    numOfRolls = 0;
    rollButton.addEventListener('click', rolldice);
    for (let die of dice) {
        die.saved = false;
        die.value = null;
    }
    for (let div of activeDivs) {
        div.innerText = null;
        div.style.display = 'block';
        div.classList.toggle('highlight');
    }
    for (let div of savedDivs) {
        div.innerText = null;
        if (div.className.includes('highlight')) {
            div.classList.toggle('highlight');
        }
    }
}

rollButton.addEventListener('click', rolldice);
nextTurn.addEventListener('click', reset);

for (let div of activeDivs) {
    div.addEventListener('click', save);
}

for (let div of savedDivs) {
    div.addEventListener('click', unsave);
}

function saveDice() {
    for (let die of dice) {
        playerRoll.push(die.value);
        console.log(playerRoll);
    }
}

score.addEventListener('click', saveDice);