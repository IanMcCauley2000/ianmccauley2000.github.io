    $(function() {
    $( "#dialog" ).dialog();
  } );

let playerTurn;
let seq = [];
let playerSeq = [];
let mySound;

/* This was a random number function from stackoverflow https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript*/
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* This is a function that creates a delay from stackoverflow https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 /* This function tests if two arrays are equal
 https://masteringjs.io/tutorials/fundamentals/compare-arrays*/
function arrayEquals(a, b) {
    return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.play = function(){
        this.sound.play();
    }    
}

async function play() {
    $( "#dialog" ).dialog('close');
    playerTurn = false;

    for(let i = 0; i < 84; i++) {
        if (playerTurn == false) {
            let rndInt = randomIntFromInterval(1, 4);
            seq.push(rndInt);
            document.getElementById("score").innerHTML = "<p>score: "+ seq.length +"</p>" ;
            for(let j = 0; j < seq.length; j++) {
                    if (seq[j] == 1) {blueLight()};
                    if (seq[j] == 2) {greenLight()};
                    if (seq[j] == 3) {redLight()};
                    if (seq[j] == 4) {yellowLight()};
                    await sleep(600);
                }
                {playerTurn = true};
                await playersTurn();
            }
        }
    }
        
        async function playersTurn() {
                playerSeq = [];
                document.getElementById("blue").addEventListener("click", blueLight);
                document.getElementById("green").addEventListener("click", greenLight);
                document.getElementById("red").addEventListener("click", redLight);
                document.getElementById("goldenrod").addEventListener("click", yellowLight)
               while (playerSeq.length < seq.length) {
                   await sleep(100);
                }
                
            if (seq.length == 85) {
                document.getElementById("text").innerHTML = "<h3>World Record... Congrats</h3>";
            }
            if (arrayEquals(playerSeq, seq)) {
                playerTurn = false;
                correct();
            }
            else {gameover();}
            await sleep(1500);
            }
          


function blueLight() {
    document.getElementById("blue").style.background = "lightskyblue";
    mySound = new sound("beep-b.mp3");
    mySound.play();
    if (playerTurn == true) {playerSeq.push(1);}
    colorReset("blue");     
}

function greenLight() {
    document.getElementById("green").style.background = "lime";
    mySound = new sound("beep-g.mp3");
    mySound.play();
    if (playerTurn == true) {playerSeq.push(2);}
    colorReset("green");
}

function redLight() {
    document.getElementById("red").style.background = "magenta";
    mySound = new sound("beep-r.mp3");
    mySound.play();
    if (playerTurn == true) {playerSeq.push(3);}
    colorReset("red");
}

function yellowLight() {
    document.getElementById("goldenrod").style.background = "yellow";
    mySound = new sound ("beep-y.mp3");
    mySound.play();
    if (playerTurn == true) {playerSeq.push(4);}
    colorReset("goldenrod");
}

async function colorReset(color){
    await sleep(400);
    document.getElementById(color).style.background = color;
}

// indicate that the players sequence did not match creates new game button so player can start over
function gameover() {
    document.body.style.animation = "wrong 2s linear infinite";
    document.getElementById("text").style.animation = "emphasize 2s linear infinite";
    document.getElementById("text").innerHTML = "<h3>Wrong LOL</h3>";
    document.getElementById("newGameButton").innerHTML = "<button type='button' id='newGame' onclick='newGame()'>New Game</button>";
}

//indicate a matching sequence to player
async function correct() {
    document.body.style.background = "green";
    document.getElementById("text").innerHTML = "<h3>Correct</h3>";
    await sleep(1000);
    document.body.style.background = "lavenderblush";
    document.getElementById("text").innerHTML = "";
}

//reset backgrounds and sequence then run play function again then gets rid of new game button so that it can not be spammed creating extra instances of play
function newGame(){
    document.getElementById("newGameButton").innerHTML = "";
    seq = [];
    document.body.style.background = "lavenderblush";
    document.body.style.animation = "";
    document.getElementById("text").innerHTML = "";
    play();
}