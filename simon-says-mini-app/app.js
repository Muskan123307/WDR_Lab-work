// Arrays to store game and user color sequences
let gameSeq=[];
let userSeq=[];

// Available button colors
let btns =["yellow","red","purple","green"];

// Game control variables
let started = false;
let level = 0;

// Selecting the heading element to show messages
let h2 = document.querySelector("h2");

// Start the game when any key is pressed
document.addEventListener("keypress",function(){
     if(started == false) {
          console.log("game is started");
          started = true;

          levelUp(); // Go to the first level
     }
});

// Function to show a flash effect on the game’s chosen button
function gameFlash(btn) {
     btn.classList.add("flash");
     setTimeout(function(){
          btn.classList.remove("flash");
     },250);
} 

// Function to show flash when user clicks a button
function userFlash(btn) {
     btn.classList.add("userflash");
     setTimeout(function(){
          btn.classList.remove("userflash");
     },250);
} 

// Move to the next level
function levelUp(){
     userSeq = []; // Reset user sequence
    level++;
    h2.innerText = `Level ${level}`;
     
    // Pick a random button
    let randIdx = Math.floor(Math.random()*3);
    let randColor= btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // Add it to the game sequence and flash it
     gameSeq.push(randColor);
     console.log(gameSeq);
     gameFlash(randBtn);
}

// Check user input against game sequence
function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
     // If user finished the level correctly
     if(userSeq.length == gameSeq.length){
          setTimeout(levelUp,1000);
     }
    } else{
     // Wrong input → Game over
     h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
     document.querySelector("body").style.backgroundColor = "red";
     setTimeout(function(){
          document.querySelector("body").style.backgroundColor = "white";
     },150);
     reset();
    }
}

// When user clicks a button
function btnPress(){
     
     let btn = this;
     userFlash(btn); // Show user flash

     userColor = btn.getAttribute("id");
     userSeq.push(userColor);

     checkAns(userSeq.length-1); // Check the user’s latest input
}

// Add click event to all buttons
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
     btn.addEventListener("click",btnPress);
}

// Reset game variables after Game Over
function reset(){
   started = false;
   gameSeq = [];
   userSeq = [];
    level = 0; 
}
