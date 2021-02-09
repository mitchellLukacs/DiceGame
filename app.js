const rollButton = document.querySelector('#roll');

function generateNum() {
    return Math.floor((Math.random() * 6) + 1);
}

const activeDivs = document.querySelectorAll('.active');
const savedDivs = document.querySelectorAll('.saved');


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

const roll = () => {
    for (let die of dice) {
        if (die.saved == false) {
            die.value = generateNum();
            const divID = document.querySelector(`#${die.id}`)
            divID.innerText = die.value;
        }
    }
}

rollButton.addEventListener('click', roll);

function save() {
    i = 0;
    for (let die of dice) {
        const savedDiv = document.querySelector(`#saved${i + 1}`);
        const activeDiv = document.querySelector(`#${die.id}`);
        if (die.saved == false && die.id == this.id) {
            die.saved = true;
            savedDiv.classList.toggle('highlight');
            savedDiv.innerText = die.value;
            console.log(activeDiv.attributes);
            activeDiv.style.display = 'none';
            //console.log(dice[i]);
        }
        i++;
    }
}

function unsave() {
    i = 0;
    for (let die of dice) {
        const savedDiv = document.querySelector(`#saved${i + 1}`);
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

for (let div of activeDivs) {
    div.addEventListener('click', save);
}

for (let div of savedDivs) {
    div.addEventListener('click', unsave);
} 