const rollButton = document.querySelector('#roll');

function generateNum() {
    return Math.floor((Math.random() * 6) + 1);
}

const divs = document.querySelectorAll('.active');
const saveDivs = document.querySelectorAll('.saved')


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
    for (let die of dice) {
        if (die.saved == false && die.id == this.id) {
            die.saved = true;
            this.classList.toggle('highlight');
        }
        else if (die.saved == true && die.id == this.id) {
            die.saved = false;
            this.classList.toggle('highlight');
        }
    }
    console.log(dice);
}

for (let div of divs) {
    div.addEventListener('click', save);
}

//02/05 12:51PM - currently having issue where sometimes it shows objects to be all true or all false instead of individually. May have to do with multiple die having same
//value when rolled/selected