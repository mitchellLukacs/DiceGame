const rollButton = document.querySelector('#roll');

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

function rolldice() {
    numOfRolls++;
    for (let die of dice) {
        if (die.saved == false) {
            die.value = generateNum();
            const divID = document.querySelector(`#${die.id}`)
            divID.innerText = die.value;
        }
    }
}

function save() {
    i = 0;
    for (let die of dice) {
        const savedDiv = document.querySelector(`#saved${i}`);
        const activeDiv = document.querySelector(`#${die.id}`);
        if (die.saved == false && die.id == this.id) {
            die.saved = true;
            savedDiv.classList.toggle('highlight');
            savedDiv.innerText = die.value;
            activeDiv.style.display = 'none';
        }
        i++;
    }
}

function unsave() {
    i = 0;
    for (let die of dice) {
        const savedDiv = document.querySelector(`#saved${i}`);
        const activeDiv = document.querySelector(`#${die.id}`);
        if (die.saved == true && (die.id[3] == this.id[5])) {
            die.saved = false;
            savedDiv.innerText = null;
            savedDiv.classList.toggle('highlight');
            activeDiv.style.display = 'block';
        }
        i++;
    }
}

rollButton.addEventListener('click', rolldice);

for (let div of activeDivs) {
    div.addEventListener('click', save);
}

for (let div of savedDivs) {
    div.addEventListener('click', unsave);
}

// if (numOfRolls = 3) {
//     alert("That's the end of your turn. Take your score!");
//     rollButton.removeEventListener('click', rolldice);
// }