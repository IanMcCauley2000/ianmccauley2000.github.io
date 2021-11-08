$(function() {
    $( "#dialog" ).dialog();
  } );

let correct;
let compTurn;
let playerTurn;
let turnTime;

/* This was a random number function from stackoverflow https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript*/
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* This is a function that creates a delay from stackoverflow https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep*/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

async function play() {
    $( "#dialog" ).dialog('close');
    let rndInt = randomIntFromInterval(1, 4);
    let seq = [];
    let playerSeq = []
    playerTurn = false;

    for(i = 0; i < 84; i++) {
        seq.push(rndInt);
        if(playerTurn == false) {
            let j = 0;
            
            for(j = 0; j < seq.length; j++) 
            {console.log(seq.length);
                    if (seq[j] == 1) {blueLight()};
                    if (seq[j] == 2) {greenLight()};
                    if (seq[j] == 3) {redLight()};
                    if (seq[j] == 4) {yellowLight()};
                    await sleep(1000);
                    
                   if (j + 1 == seq.length);{playerTurn = true};
                   colorReset();
                   await sleep(200);
                }
            }
        else (playerTurn == true);
        //make the players turn by adding event listenr. make the array match
        {playerSeq.push(1);}
        
        }    
    }

function blueLight() {
    document.getElementById("blue").style.background = "lightskyblue";
}
function greenLight() {
    document.getElementById("green").style.background = "lime";
}
function redLight() {
    document.getElementById("red").style.background = "magenta";
}
function yellowLight() {
    document.getElementById("yellow").style.background = "yellow";
}
function colorReset(){
    document.getElementById("blue").style.background = "blue";
    document.getElementById("green").style.background = "green";
    document.getElementById("red").style.background = "red";
    document.getElementById("yellow").style.background = "goldenrod";
}