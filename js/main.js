//============Constants===================//

const gameBoard = document.querySelector(".gameBoard")





//========== State ==========================//

let gameBoardWidth = 10;
let bombTotal = 25
let cells = [];










//============ Cached ========================//

//images for flags, question mark, bomb





//============Event Listeners===================//

document.getElementById('rulesButton').addEventListener('click', showHideRules);







//============Functions===================//
//create grid - this allows me to pass initial values directly into an array instead of 
// writing the divs in the html file and then adding the value to each one individually

function createGameBoard(){
   
    for (let i = 0; i < 100; i++){
        const cell = document.createElement('div');
        cell.setAttribute('id', i);
        gameBoard.appendChild(cell);
        cells.push(cell)
    }
}


function showHideRules(){
    let rulesClick = document.getElementById('dropContent');
    if(rulesClick.style.display ==='none'){
        rulesClick.style.display = "block";
    } else {
        rulesClick.style.display = "none";
    }
}

function randomize(arr){
    let 
}




createGameBoard();

//creating a random array of bombs that can correspond with the cells of my grid



//a timer that counts up by seconds and minutes to track how long it takes to finish



//using an click listenering and checking if the cell is a bomb - if it is you lose
//otherwise move on to check neighboring cells



//checking if neighboring cells are bombs and clearing up to the edge of where they are
//touching a bomb and then numbering how many bombs they are touching
//checking if I am on an edge or not and how to know which surrounding cells to check



//right click to mark with a flag, ?, or clear




//display win or lose messages with total time








//init function

function init(){

}
