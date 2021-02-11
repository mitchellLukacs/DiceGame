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

const diceValues = [];

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
        diceValues.push(die.value);
        console.log(diceValues);
    }
}

score.addEventListener('click', saveDice);

let scoreTotal = 0;
function diceTotal() {
    for (let die of dice) {
        scoreTotal += die.value;
    }
    return scoreTotal;
}

let onesTotal = 0;
function onesScore() {
    for (let die of dice) {
        if (die.value == 1) {
            onesTotal += die.value;
        }
    }
    return onesTotal;
}

let twosTotal = 0;
function twosScore() {
    for (let die of dice) {
        if (die.value == 2) {
            twosTotal += die.value;
        }
    }
    return twosTotal;
}

let threesTotal = 0;
function threesScore() {
    for (let die of dice) {
        if (die.value == 3) {
            threesTotal += die.value;
        }
    }
    return threesTotal;
}

let foursTotal = 0;
function foursScore() {
    for (let die of dice) {
        if (die.value == 4) {
            foursTotal += die.value;
        }
    }
    return foursTotal;
}

let fivesTotal = 0;
function fivesScore() {
    for (let die of dice) {
        if (die.value == 5) {
            fivesTotal += die.value;
        }
    }
    return fivesTotal;
}

let sixesTotal = 0;
function sixesScore() {
    for (let die of dice) {
        if (die.value == 6) {
            sixesTotal += die.value;
        }
    }
    return sixesTotal;
}

let threeOfKind = 0;
function threeOfKindScore() {
    let multiplesScore = 0;
    let singlesScore = 0;
    let numOfMultiples = 0;
    for (let die of dice) {
        let dieValue = die.value;
        console.log(dieValue);
        if (die.value != dieValue) {
            console.log(die.value);
            singlesScore += die.value;
            //console.log(die.value, die.id, singlesScore);
        } else {
            numOfMultiples++;
            multiplesScore += die.value;
            //console.log(`num of Multiples: ${numOfMultiples}`);
            //console.log(`Multiples score: ${multiplesScore}`);
        }
    }
    if (numOfMultiples >= 3) {
        threeOfKind = singlesScore + multiplesScore;
        //console.log(`Singles score: ${singlesScore}`, `Multiples score: ${multiplesScore}`);
    }
    return threeOfKind;
}
//     let numOfMultiples = 0;
//     for (let die of dice) {
//         const dieValue = die.value;
//         for (let die of dice) {
//             if (die.value == dieValue) {
//                 numOfMultiples++;
//                 console.log(die.id, numOfMultiples);
//             }
//         }
//         if (numOfMultiples >= 3) {
//             threeOfKind += die.value;
//             console.log(threeOfKind);
//         }
//     }
//     console.log(threeOfKind);
//     return threeOfKind;
// }


let upperSection = onesTotal + twosTotal + threesTotal + foursTotal + fivesTotal + sixesTotal;
const bonus = 35;