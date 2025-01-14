const defaultAttributeScores = [ 15, 14, 13, 12, 10, 8 ];

let toDisplay = [];

/**
* Fisher-Yates Standard Shufle
* Adapted from: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
*/
function fisherYates(arr) {
    let shuffled = Array.from(arr);
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}

class Player {
    constructor(characterName = 'Naruto') {
        this.name = characterName;
        this.attributes = {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
        let res = fisherYates(defaultAttributeScores);

        for (const [key, value] of Object.entries(this.attributes)) {
            this.attributes[key] = res.pop();
        }
    }

    rollAttributes() {
        for (const key in this.attributes) {
            let res = diceRoller(4, 6);
            res.sort(function(a, b){return a - b});
            res.shift();
            let sum = sumArrElements(res);
            this.attributes[key] = sum;
        }
    }

    printPlayer() {
        console.log(this.name);
        
        let cont = `Name: ${this.name} `;

        for (const [key, value] of Object.entries(this.attributes)) {
            let v = `${key.slice(0, 3).toUpperCase()}: ${value}`;
            console.log(v);
            cont += ` ${v}`;
        }
 
        toDisplay.push(cont);
    }
}

const player01 = new Player();
player01.printPlayer();
const player02 = new Player('Son Goku');
player02.rollAttributes();
player02.printPlayer();

function diceRoller(times, sides) {
    let res = [];
    for (let i = 0; i < times; i++) {
        res.push(Math.floor(Math.random() * sides + 1));
    }

    return res;
}

function sumArrElements(arr) {
    return arr.reduce((sum, current) => sum + current, 0);
}


document.addEventListener('DOMContentLoaded', function () {
   for (const i in toDisplay) {
        const p = document.createElement('p');
        p.textContent = toDisplay[i];
        document.body.appendChild(p);
    } 
});
