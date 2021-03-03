const rollButton = document.querySelector('#roll');
const nextTurn = document.querySelector('#nextTurn');
const p1ScoreBoxes = document.querySelectorAll('.p1Score>row');
const p2ScoreBoxes = document.querySelectorAll('.p2Score>row');
let player1Turn = true;
const playerTurn = document.querySelector('#playerTurn');
let grandTotalRolls = 0;

const p1ScoreNames = [onesScore, twosScore, threesScore, foursScore, fivesScore, sixesScore, threeOfKindScore, fourOfKindScore, fullHouseScore, smallStraightScore, largeStraightScore, yahtzeeScore, chanceScore, yahtzeeBonusScore];
const p1ScratchNames = [onesScore, twosScore, threesScore, foursScore, fivesScore, sixesScore, threeOfKindScore, fourOfKindScore, fullHouseScore, smallStraightScore, largeStraightScore, yahtzeeScore, chanceScore, yahtzeeBonusScore];
const p2ScoreNames = [onesScore, twosScore, threesScore, foursScore, fivesScore, sixesScore, threeOfKindScore, fourOfKindScore, fullHouseScore, smallStraightScore, largeStraightScore, yahtzeeScore, chanceScore, yahtzeeBonusScore];
const p2ScratchNames = [onesScore, twosScore, threesScore, foursScore, fivesScore, sixesScore, threeOfKindScore, fourOfKindScore, fullHouseScore, smallStraightScore, largeStraightScore, yahtzeeScore, chanceScore, yahtzeeBonusScore];
const p1StableNames = [onesScore, twosScore, threesScore, foursScore, fivesScore, sixesScore, threeOfKindScore, fourOfKindScore, fullHouseScore, smallStraightScore, largeStraightScore, yahtzeeScore, chanceScore, yahtzeeBonusScore];
const p2StableNames = [onesScore, twosScore, threesScore, foursScore, fivesScore, sixesScore, threeOfKindScore, fourOfKindScore, fullHouseScore, smallStraightScore, largeStraightScore, yahtzeeScore, chanceScore, yahtzeeBonusScore];

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
        if (numOfRolls == 1) {
            document.querySelector(`#${die.id}`).classList.toggle('highlight');
        }
    }
    if (numOfRolls <= 3) {
        for (let die of dice) {
            if (die.saved == false) {
                die.value = generateNum();
                document.querySelector(`#${die.id}`).innerText = die.value;
            }
        }
        grandTotalRolls++;
        if (grandTotalRolls == 1 && player1Turn === true) {
            p1AddEvents();
        }
        if (grandTotalRolls == 1 && player1Turn === false) {
            p2AddEvents();
        }
        if (player1Turn === true) {
            playerTurn.innerText = `Player 1's Roll #${numOfRolls}`;
        } else {
            playerTurn.innerText = `Player 2's Roll #${numOfRolls}`;
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
            this.classList.toggle('highlight');
            savedDiv.style.display = 'inline-flex';
        }
        i++;
    }
}

function unsave() {
    if (this.innerText != '') {
        for (let die of dice) {
            const activeDiv = document.querySelector(`#${die.id}`);
            if (die.id[3] == this.id[5]) {
                die.saved = !die.saved;
                this.innerText = null;
                this.classList.toggle('highlight');
                this.style.display = 'none';
                activeDiv.style.display = 'inline-flex';
                activeDiv.classList.toggle('highlight');
            }
        }
    }
}

function reset() {
    player1Turn = !player1Turn;
    if (numOfRolls !== 0) {
        numOfRolls = 0;
        rollButton.addEventListener('click', rolldice);
        for (let die of dice) {
            die.saved = false;
            die.value = null;
        }
        for (let div of activeDivs) {
            div.innerText = null;
            div.style.display = 'inline-flex';
            if (div.className.includes('highlight')) {
                div.classList.toggle('highlight');
            }
        }
        for (let div of savedDivs) {
            div.innerText = null;
            if (div.className.includes('highlight')) {
                div.classList.toggle('highlight');
            }
        }
    }
    if (player1Turn === true) {
        playerTurn.innerText = "Player 1";
        p1AddEvents();
        let i = 0;
        for (let item of p2ScoreBoxes) {
            if (item.id.startsWith('p2')) {
                if (item.className.includes('scratch') === true) {
                    p2RemoveEvents(i);
                }
                i++;
            }
        }
    }
    if (player1Turn !== true) {
        playerTurn.innerText = "Player 2";
        p2AddEvents();
        let i = 0;
        for (let item of p1ScoreBoxes) {
            if (item.id.startsWith('p1')) {
                if (item.className.includes('scratch') === true) {
                    p1RemoveEvents(i);
                }
                i++;
            }
        }
    }
}

let p1OnesTotal = 0;
let p2OnesTotal = 0;
function onesScore() {
    if (player1Turn === true && this.id.startsWith('p1') === true) {
        p1OnesTotal = 0;
        for (let die of dice) {
            if (die.value == 1) {
                p1OnesTotal += die.value;
            }
        }
        this.innerText = p1OnesTotal;
        if (p1OnesTotal == 0) {
            scratch(this);
            p1ScratchDisable(0, this);
            return;
        }
        p1RemoveEvents(0);
    }
    if (player1Turn === false && this.id.startsWith('p2') === true) {
        p2OnesTotal = 0;
        for (let die of dice) {
            if (die.value == 1) {
                p2OnesTotal += die.value;
            }
        }
        this.innerText = p2OnesTotal;
        if (p2OnesTotal == 0) {
            scratch(this);
            p2ScratchDisable(0, this);
            return;
        }
        p2RemoveEvents(0);
    }
    upperScore();
    finalScore();
}

let p1TwosTotal = 0;
let p2TwosTotal = 0;
function twosScore() {
    if (player1Turn === true) {
        p1TwosTotal = 0;
        for (let die of dice) {
            if (die.value == 2) {
                p1TwosTotal += die.value;
            }
        }
        this.innerText = p1TwosTotal;
        if (p1TwosTotal == 0) {
            scratch(this);
            p1ScratchDisable(1, this);
            return;
        }
        p1RemoveEvents(1);
    } else {
        p2TwosTotal = 0;
        for (let die of dice) {
            if (die.value == 2) {
                p2TwosTotal += die.value;
            }
        }
        this.innerText = p2TwosTotal;
        if (p2TwosTotal == 0) {
            scratch(this);
            p2ScratchDisable(1, this);
            return;
        }
        p2RemoveEvents(1);
    }
    upperScore();
    finalScore();
}

let p1ThreesTotal = 0;
let p2ThreesTotal = 0;
function threesScore() {
    if (player1Turn === true) {
        p1ThreesTotal = 0;
        for (let die of dice) {
            if (die.value == 3) {
                p1ThreesTotal += die.value;
            }
        }
        this.innerText = p1ThreesTotal;
        if (p1ThreesTotal == 0) {
            scratch(this);
            p1ScratchDisable(2, this);
            return;
        }
        p1RemoveEvents(2);
    } else {
        p2ThreesTotal = 0;
        for (let die of dice) {
            if (die.value == 3) {
                p2ThreesTotal += die.value;
            }
        }
        this.innerText = p2ThreesTotal;
        if (p2ThreesTotal == 0) {
            scratch(this);
            p2ScratchDisable(2, this);
            return;
        }
        p2RemoveEvents(2);
    }
    upperScore();
    finalScore();
}

let p1FoursTotal = 0;
let p2FoursTotal = 0;
function foursScore() {
    if (player1Turn === true) {
        p1FoursTotal = 0;
        for (let die of dice) {
            if (die.value == 4) {
                p1FoursTotal += die.value;
            }
        }
        this.innerText = p1FoursTotal;
        if (p1FoursTotal == 0) {
            scratch(this);
            p1ScratchDisable(3, this);
            return;
        }
        p1RemoveEvents(3);
    } else {
        p2FoursTotal = 0;
        for (let die of dice) {
            if (die.value == 4) {
                p2FoursTotal += die.value;
            }
        }
        this.innerText = p2FoursTotal;
        if (p2FoursTotal == 0) {
            scratch(this);
            p2ScratchDisable(3, this);
            return;
        }
        p2RemoveEvents(3);
    }
    upperScore();
    finalScore();
}

let p1FivesTotal = 0;
let p2FivesTotal = 0;
function fivesScore() {
    if (player1Turn === true) {
        p1FivesTotal = 0;
        for (let die of dice) {
            if (die.value == 5) {
                p1FivesTotal += die.value;
            }
        }
        this.innerText = p1FivesTotal;
        if (p1FivesTotal == 0) {
            scratch(this);
            p1ScratchDisable(4, this);
            return;
        }
        p1RemoveEvents(4);
        upperScore();
        finalScore();
    }
    if (player1Turn !== true) {
        p2FivesTotal = 0;
        for (let die of dice) {
            if (die.value == 5) {
                p2FivesTotal += die.value;
            }
        }
        this.innerText = p2FivesTotal;
        if (p2FivesTotal == 0) {
            scratch(this);
            p2ScratchDisable(4, this);
            return;
        }
        p2RemoveEvents(4);
        upperScore();
        finalScore();
    }
}

let p1SixesTotal = 0;
let p2SixesTotal = 0;
const p1SixesRow = document.querySelector('#p1Sixes');
const p2SixesRow = document.querySelector('#p2Sixes');
function sixesScore() {
    if (player1Turn === true) {
        p1SixesTotal = 0;
        for (let die of dice) {
            if (die.value == 6) {
                p1SixesTotal += die.value;
            }
        }
        this.innerText = p1SixesTotal;
        if (p1SixesTotal == 0) {
            scratch(this);
            p1ScratchDisable(5, this);
            return;
        }
        p1RemoveEvents(5);
    } else {
        p2SixesTotal = 0;
        for (let die of dice) {
            if (die.value == 6) {
                p2SixesTotal += die.value;
            }
        }
        this.innerText = p2SixesTotal;
        if (p2SixesTotal == 0) {
            scratch(this);
            p2ScratchDisable(5, this);
            return;
        }
        p2RemoveEvents(5);
    }
    upperScore();
    finalScore();
}

let p1FirstUpperTotal = 0;
let p1Bonus = 0;
let p1FinalUpperTotal = 0;
let p2FirstUpperTotal = 0;
let p2Bonus = 0;
let p2FinalUpperTotal = 0;
function upperScore() {
    if (player1Turn === true) {
        p1FirstUpperTotal = p1OnesTotal + p1TwosTotal + p1ThreesTotal + p1FoursTotal + p1FivesTotal + p1SixesTotal;
        document.querySelector('#firstUpperTotalP1').innerText = p1FirstUpperTotal;
        if (p1FirstUpperTotal >= 63) {
            p1Bonus = 35;
            document.querySelector('#upperBonusP1').innerText = p1Bonus;
        }
        p1FinalUpperTotal = p1FirstUpperTotal + p1Bonus;
        document.querySelector('#secondUpperTotalP1').innerText = p1FinalUpperTotal;
        document.querySelector('#thirdUpperTotalP1').innerText = p1FinalUpperTotal;
    } else {
        p2FirstUpperTotal = p2OnesTotal + p2TwosTotal + p2ThreesTotal + p2FoursTotal + p2FivesTotal + p2SixesTotal;
        document.querySelector('#firstUpperTotalP2').innerText = p2FirstUpperTotal;
        if (p2FirstUpperTotal >= 63) {
            p2Bonus = 35;
            document.querySelector('#upperBonusP2').innerText = p2Bonus;
        }
        p2FinalUpperTotal = p2FirstUpperTotal + p2Bonus;
        document.querySelector('#secondUpperTotalP2').innerText = p2FinalUpperTotal;
        document.querySelector('#thirdUpperTotalP2').innerText = p2FinalUpperTotal;
    }
}

let p1ThreeOfKind = 0;
let p2ThreeOfKind = 0;
function threeOfKindScore() {
    const diceCount = [0, 0, 0, 0, 0, 0];
    let diceTotal = 0;
    for (let die of dice) {
        diceCount[die.value - 1]++;
        diceTotal += die.value;
    }
    if (player1Turn === true) {
        p1ThreeOfKind = 0;
        for (let count of diceCount) {
            if (count >= 3) {
                p1ThreeOfKind = diceTotal;
                this.innerText = p1ThreeOfKind;
            }
        }
        if (p1ThreeOfKind == 0) {
            scratch(this);
            p1ScratchDisable(6, this);
            return;
        }
        p1RemoveEvents(6);
    } else {
        p2ThreeOfKind = 0;
        for (let count of diceCount) {
            if (count >= 3) {
                p2ThreeOfKind = diceTotal;
                this.innerText = p2ThreeOfKind;
            }
        }
        if (p2ThreeOfKind == 0) {
            scratch(this);
            p2ScratchDisable(6, this);
            return;
        }
        p2RemoveEvents(6);
    }
    lowerScore();
    finalScore();
}

let p1FourOfKind = 0;
let p2FourOfKind = 0;
function fourOfKindScore() {
    const diceCount = [0, 0, 0, 0, 0, 0];
    let diceTotal = 0;
    for (let die of dice) {
        diceCount[die.value - 1]++;
        diceTotal += die.value;
    }
    if (player1Turn === true) {
        p1FourOfKind = 0;
        for (let count of diceCount) {
            if (count >= 4) {
                p1FourOfKind = diceTotal;
                this.innerText = p1FourOfKind;
            }
        }
        if (p1FourOfKind == 0) {
            scratch(this);
            p1ScratchDisable(7, this);
            return;
        }
        p1RemoveEvents(7);
    } else {
        p2FourOfKind = 0;
        for (let count of diceCount) {
            if (count >= 4) {
                p2FourOfKind = diceTotal;
                this.innerText = p2FourOfKind;
            }
        }
        if (p2FourOfKind == 0) {
            scratch(this);
            p2ScratchDisable(7, this);
            return;
        }
        p2RemoveEvents(7);
    }
    lowerScore();
    finalScore();
}

let p1FullHouse = 0;
let p2FullHouse = 0;
function fullHouseScore() {
    const diceCount = [0, 0, 0, 0, 0, 0];
    for (let die of dice) {
        diceCount[die.value - 1]++;
    }
    if (player1Turn === true) {
        p1FullHouse = 0;
        for (let count of diceCount) {
            if (count == 3) {
                for (let count2 of diceCount) {
                    if (count2 == 2) {
                        p1FullHouse = 25;
                        this.innerText = p1FullHouse;
                    }
                }
            }
        }
        if (p1FullHouse == 0) {
            scratch(this);
            p1ScratchDisable(8, this);
            return;
        }
        p1RemoveEvents(8);
    } else {
        p2FullHouse = 0;
        for (let count of diceCount) {
            if (count == 3) {
                for (let count2 of diceCount) {
                    if (count2 == 2) {
                        p2FullHouse = 25;
                        this.innerText = p2FullHouse;
                    }
                }
            }
        }
        if (p2FullHouse == 0) {
            scratch(this);
            p2ScratchDisable(8, this);
            return;
        }
        p2RemoveEvents(8);
    }
    lowerScore();
    finalScore();
}

let p1SmallStraight = 0;
let p2SmallStraight = 0;
function smallStraightScore() {
    const diceCount = [0, 0, 0, 0, 0, 0];
    let numInRow = 0;
    for (let die of dice) {
        diceCount[die.value - 1]++;
    }
    for (let count of diceCount) {
        if (count != 0) {
            numInRow++;
        }
        if (count == 0 && numInRow < 4) {
            numInRow = 0;
        }
    }
    if (player1Turn === true) {
        p1SmallStraight = 0;
        if (numInRow >= 4) {
            p1SmallStraight = 30;
            this.innerText = p1SmallStraight;
        } else {
            scratch(this);
            p1ScratchDisable(9, this);
            return;
        }
        p1RemoveEvents(9);
    } else {
        p2SmallStraight = 0;
        if (numInRow >= 4) {
            p2SmallStraight = 30;
            this.innerText = p2SmallStraight;
        } else {
            scratch(this);
            p2ScratchDisable(9, this);
            return;
        }
        p2RemoveEvents(9);
    }
    lowerScore();
    finalScore();
}

let p1LargeStraight = 0;
let p2LargeStraight = 0;
function largeStraightScore() {
    const diceCount = [0, 0, 0, 0, 0, 0];
    let numInRow = 0;
    for (let die of dice) {
        diceCount[die.value - 1]++;
    }
    for (let count of diceCount) {
        if (count != 0) {
            numInRow++;
        }
        if (count == 0 && numInRow < 5) {
            numInRow = 0;
        }
    }
    if (player1Turn === true) {
        p1LargeStraight = 0;
        if (numInRow == 5) {
            p1LargeStraight = 40;
            this.innerText = p1LargeStraight;
        } else {
            scratch(this);
            p1ScratchDisable(10, this);
            return;
        }
        p1RemoveEvents(10);
    } else {
        p2LargeStraight = 0;
        if (numInRow == 5) {
            p2LargeStraight = 40;
            this.innerText = p2LargeStraight;
        } else {
            scratch(this);
            p2ScratchDisable(10, this);
            return;
        }
        p2RemoveEvents(10);
    }
    lowerScore();
    finalScore();
}

let p1NumOfYahtzees = 1;
let p1Yahtzee = 0;
let p1YahtzeeBonusTotal = 0;
let p1YahtzeeTotal = 0;
let p2NumOfYahtzees = 0;
let p2Yahtzee = 0;
let p2YahtzeeBonusTotal = 0;
let p2YahtzeeTotal = 0;
const p1YahtzeeRow = document.querySelector('#p1Yahtzee');
const p2YahtzeeRow = document.querySelector('#p2Yahtzee');
const p1YahtzeeBonusRow = document.querySelector('#p1YahtzeeBonusTotal');
const p2YahtzeeBonusRow = document.querySelector('#p2YahtzeeBonusTotal');
function yahtzeeScore() {
    const diceCount = [0, 0, 0, 0, 0, 0];
    for (let die of dice) {
        diceCount[die.value - 1]++;
    }
    if (player1Turn === true) {
        for (let count of diceCount) {
            if (count == 5) {
                p1NumOfYahtzees++;
                p1Yahtzee = 50;
                this.innerText = p1Yahtzee;
                this.removeEventListener('click', yahtzeeScore);
                p1YahtzeeBonusRow.removeEventListener('click', yahtzeeBonusScore);
            }
        }
        if (p1Yahtzee == 0) {
            scratch(this);
            p1ScratchDisable(11, this);
            return;
        }
        p1YahtzeeTotal = p1Yahtzee + p1YahtzeeBonusTotal;
        p1RemoveEvents(11);
    } else {
        for (let count of diceCount) {
            if (count == 5) {
                p2NumOfYahtzees++;
                p2Yahtzee = 50;
                this.innerText = p2Yahtzee;
                this.removeEventListener('click', yahtzeeScore);
                p2YahtzeeBonusRow.removeEventListener('click', yahtzeeBonusScore);

            }
        }
        if (p2Yahtzee == 0) {
            scratch(this);
            p2ScratchDisable(11, this);
            return;
        }
        p2YahtzeeTotal = p2Yahtzee + p2YahtzeeBonusTotal;
        p2RemoveEvents(11);
    }
    lowerScore();
    finalScore();
}

function yahtzeeBonusScore() {
    const diceCount = [0, 0, 0, 0, 0, 0];
    for (let die of dice) {
        diceCount[die.value - 1]++;
    }
    if (player1Turn === true) {
        for (let count of diceCount) {
            if (count == 5 && p1NumOfYahtzees != 0) {
                p1NumOfYahtzees++;
                p1YahtzeeBonusTotal = 100 * (p1NumOfYahtzees - 1);
                p1YahtzeeTotal = p1Yahtzee + p1YahtzeeBonusTotal;
                this.innerText = p1YahtzeeBonusTotal;
                if (p1NumOfYahtzees == 2) {
                    document.querySelector('#p1Bonus1').innerHTML = '&#10003';
                }
                if (p1NumOfYahtzees == 3) {
                    document.querySelector('#p1Bonus2').innerHTML = '&#10003';
                }
                if (p1NumOfYahtzees == 4) {
                    document.querySelector('#p1Bonus3').innerHTML = '&#10003';
                }
            }
        }
        this.removeEventListener('click', yahtzeeBonusScore);
    } else {
        for (let count of diceCount) {
            if (count == 5 && p2NumOfYahtzees != 0) {
                p2NumOfYahtzees++;
                p2YahtzeeBonusTotal = 100 * (p2NumOfYahtzees - 1);
                this.innerText = p2YahtzeeBonusTotal;
                p2YahtzeeTotal = p2Yahtzee + p2YahtzeeBonusTotal;
                if (p2NumOfYahtzees == 2) {
                    document.querySelector('#p2Bonus1').innerHTML = '&#10003';
                }
                if (p2NumOfYahtzees == 3) {
                    document.querySelector('#p2Bonus2').innerHTML = '&#10003';
                }
                if (p2NumOfYahtzees == 4) {
                    document.querySelector('#p2Bonus3').innerHTML = '&#10003';
                }
            }
        }
        this.removeEventListener('click', yahtzeeBonusScore);

    }
    lowerScore();
    finalScore();
}

let p1Chance = 0;
let p2Chance = 0;
function chanceScore() {
    let total = 0;
    for (let die of dice) {
        total += die.value;
    }
    if (player1Turn === true) {
        p1Chance = total;
        this.innerText = p1Chance;
        p1RemoveEvents(12);
    } else {
        p2Chance = total;
        this.innerText = p2Chance;
        p2RemoveEvents(12);
    }
    lowerScore();
    finalScore();
}

let p1LowerTotal = 0;
let p2LowerTotal = 0;
function lowerScore() {
    if (player1Turn === true) {
        p1LowerTotal = p1ThreeOfKind + p1FourOfKind + p1FullHouse + p1SmallStraight + p1LargeStraight + p1YahtzeeTotal + p1Chance;
        document.querySelector('#lowerTotalP1').innerText = p1LowerTotal;
    } else {
        p2LowerTotal = p2ThreeOfKind + p2FourOfKind + p2FullHouse + p2SmallStraight + p2LargeStraight + p2YahtzeeTotal + p2Chance;
        document.querySelector('#lowerTotalP2').innerText = p2LowerTotal;
    }
}

let p1FinalTotal = 0;
let p2FinalTotal = 0;
function finalScore() {
    if (player1Turn === true) {
        p1FinalTotal = p1FinalUpperTotal + p1LowerTotal;
        document.querySelector('#grandTotalP1').innerText = p1FinalTotal;
    } else {
        p2FinalTotal = p2FinalUpperTotal + p2LowerTotal;
        document.querySelector('#grandTotalP2').innerText = p2FinalTotal;
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

function dummyFunc() {
    return;
}

function p1AddEvents() {
    let i = 0;
    for (let element of p1ScoreBoxes) {
        if (element.id.startsWith('p1') && player1Turn === true) {
            element.addEventListener('click', p1ScoreNames[i])
            i++;
        }
    }
}

function p1ScratchAddEvents() {
    let i = 0;
    for (let element of p1ScoreBoxes) {
        if (element.id.startsWith('p1') && player1Turn === true) {
            element.addEventListener('click', p1ScratchNames[i])
            i++;
        }
    }
}

function p2ScratchAddEvents() {
    let i = 0;
    for (let element of p2ScoreBoxes) {
        if (element.id.startsWith('p2') && player1Turn !== true) {
            element.addEventListener('click', p2ScratchNames[i])
            i++;
        }
    }
}

function p1AddEvents() {
    let i = 0;
    for (let element of p1ScoreBoxes) {
        if (element.id.startsWith('p1') && player1Turn === true) {
            element.addEventListener('click', p1ScoreNames[i])
            i++;
        }
    }
}

function p2AddEvents() {
    i = 0;
    for (let element of p2ScoreBoxes) {
        if (element.id.startsWith('p2') && player1Turn !== true) {
            element.addEventListener('click', p2ScoreNames[i])
            i++;
        }
    }
}

function p1RemoveEvents(num) {
    let i = 0;
    for (let element of p1ScoreBoxes) {
        if (element.id.startsWith('p1')) {
            element.removeEventListener('click', p1ScoreNames[i])
            i++;
        }
    }
    p1ScoreNames.splice(num, 1, dummyFunc);
}

function p2RemoveEvents(num) {
    i = 0;
    for (let element of p2ScoreBoxes) {
        if (element.id.startsWith('p2')) {
            element.removeEventListener('click', p2ScoreNames[i])
            i++;
        }
    }
    p2ScoreNames.splice(num, 1, dummyFunc);
}

//Because the p1ScratchNames contains dummyFunc when item is scratched, the removeEventListener
//does not remove previously scratched item when a second item is scratched

function p1ScratchDisable(num, thisParam) {
    p1ScratchNames.splice(num, 1, dummyFunc);
    if (thisParam.className.includes('scratch') === true && player1Turn === true) {
        let i = 0;
        for (let element of p1ScoreBoxes) {
            if (p1ScratchNames[i] === dummyFunc && (i !== num)) {
                p1ScratchNames.splice(i, 1, p1StableNames[i]);
            }
            if (element.id.startsWith('p1')) {
                element.removeEventListener('click', p1ScratchNames[i]);
                i++;
            }
        }
    } else {
        p1ScratchAddEvents();
    }
}
function p2ScratchDisable(num, thisParam) {
    p2ScratchNames.splice(num, 1, dummyFunc);
    if (thisParam.className.includes('scratch') === true && player1Turn !== true) {
        let i = 0;
        for (let element of p2ScoreBoxes) {
            if (p2ScratchNames[i] === dummyFunc && (i !== num)) {
                p2ScratchNames.splice(i, 1, p2StableNames[i]);
            }
            if (element.id.startsWith('p2')) {
                element.removeEventListener('click', p2ScratchNames[i]);
                i++;
            }
        }
    } else {
        p2ScratchAddEvents();
    }
}

function scratch(element) {
    if (player1Turn === true && element.id.startsWith('p1')) {
        if (element.className.includes('scratch') === true) {
            element.innerText = '-';
        }
        element.classList.toggle('scratch');
    }
    if (player1Turn !== true && element.id.startsWith('p2')) {
        if (element.className.includes('scratch') === true) {
            element.innerText = '-';
        }
        element.classList.toggle('scratch');
    }
}