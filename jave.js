const bilde = document.getElementById("kortbilde");
const hitknapp = document.getElementById("higher");
const standknapp = document.getElementById("lower");
const scoreDisplay = document.getElementById("score");
const melding = document.getElementById("melding");

let spillerKort = [];
let dealerKort = [];
let penger = document.getElementById("veridpenger")
let innskudd = document.getElementById("innskudd")


function trekkKort() {
    const tall = Math.floor(Math.random() * 13) + 1;
    const sort = Math.floor(Math.random() * 4) + 1;
    let a = "";

    if (sort === 1) a = "_of_diamonds.png";
    else if (sort === 2) a = "_of_spades.png";
    else if (sort === 3) a = "_of_hearts.png";
    else a = "_of_clubs.png";

    return { tall: tall > 10 ? 10 : tall, image: `${tall}${a}` };
}

function beregnSum(kort) {
    let sum = 0;
    let ess = 0;

    for (let k of kort) {
        sum += k.tall;
        if (k.tall === 1) ess++;
    }
    while (ess > 0 && sum + 10 <= 21) {
        sum += 10;
        ess--;
    }
    return sum;
}

function startGame() {
    spillerKort = [trekkKort(), trekkKort()];
    dealerKort = [trekkKort(), trekkKort()];

    bilde.src = "kortstokk/" + spillerKort[0].image;
    scoreDisplay.innerText = "Sum: " + beregnSum(spillerKort);
    melding.innerText = "Spillet har startet!";
}

function hit() {
    spillerKort.push(trekkKort());
    let sum = beregnSum(spillerKort);
    scoreDisplay.innerText = "Sum: " + sum;
    if (sum > 21) {
        melding.innerText = "Du tapte!";
        penger = penger - innskudd;
    }
}

function dealer() {
    let dealerSum = beregnSum(dealerKort);
    while (dealerSum < 17) {
        dealerKort.push(trekkKort());
        dealerSum = beregnSum(dealerKort);
    }
    
    let spillerSum = beregnSum(spillerKort);
    if (dealerSum > 21 || spillerSum > dealerSum) {
        melding.innerText = "Du vant!";
        penger += innskudd * 2;
    } else if (dealerSum === spillerSum) {
        melding.innerText = "Uavgjort!";
    } else {
        melding.innerText = "Huset vant!";
        penger = penger -  innskudd;
    }
}

hitknapp.addEventListener("click", hit);
standknapp.addEventListener("click", dealer);
