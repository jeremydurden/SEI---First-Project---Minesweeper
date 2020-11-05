//============Constants===================//

const gameBoard = document.querySelector('.gameBoard')





//========== State ==========================//

let gameBoardWidth = 10;
let bombTotal = 25
let cells = [];
let gameOver = false;
//creating a random array of bombs that can correspond with the cells of my grid
const bombArray = Array(bombTotal).fill('bomb');
const theSafeCells = Array(gameBoardWidth*gameBoardWidth - bombTotal).fill('safe');
const bombsAndSafeCells = bombArray.concat(theSafeCells);
const bombsAndSafeCellsMixed = shuffle(bombsAndSafeCells);





//============ Cached ========================//

//images for flags, question mark, bomb

const flagImage = 



//============Event Listeners===================//

document.getElementById('rulesButton').addEventListener('click', showHideRules);
document.getElementById('startButton').addEventListener('click', init);
document.querySelector('.gameBoard').addEventListener('click', checkForBombs)
//document.querySelector('.gameBoard').addEventListener('contextmenu', setFlag)




//============Functions===================//
//create grid - this allows me to pass initial values directly into an array instead of 
// writing the divs in the html file and then adding the value to each one individually

function createGameBoard(){
    
    for (let i = 0; i < gameBoardWidth*gameBoardWidth; i++){
        const cell = document.createElement('div');
        cell.setAttribute('id', i);
        cell.classList.add(bombsAndSafeCellsMixed[i])
        gameBoard.appendChild(cell);
        cells.push(cell)
    }
    for (let i = 0; i < cells.length; i++){
        let bombCount = 0
        const leftSide = i % 10 === 0;
        const rightSide = (i + 1) % 10 === 0;
        if (cells[i].classList.contains('safe')){
            if (i > 0 && !leftSide && cells[i-1].classList.contains('bomb')){
                bombCount++;
            }
            if (i < 99 && !rightSide && cells[i+1].classList.contains('bomb')){
                bombCount++;
            }
            if (i > 9 && cells[i-10].classList.contains('bomb')){
                bombCount++;
            }
            if (i < 90 && cells[i+10].classList.contains('bomb')){
                bombCount++;
            }
            if (i > 10 && !leftSide && cells[i-11].classList.contains('bomb')){
                bombCount++;
            }
            if (i > 9 && !rightSide && cells[i-9].classList.contains('bomb')){
                bombCount++;
            }
            if (i < 90 && !leftSide && cells[i+9].classList.contains('bomb')){
                bombCount++;
            }
            if (i < 90 && !rightSide && cells[i+11].classList.contains('bomb')){
                bombCount++;
            }
            cells[i].setAttribute('bombsNearby', bombCount);
    }
}
}

//using an click listener and checking if the cell is a bomb - if it is you lose
//otherwise move on to check neighboring cells
//checking if neighboring cells are bombs
function checkForBombs (e){
    let clicked = e.target;
    console.log(clicked, 'this is click checkForBombs')
    if (gameOver){
        return;
    }
    if (clicked.classList.contains('flagged') || clicked.classList.contains('checked')) {
        return;
    } else{
        clicked.classList.add('checked');
        let nearbyBombs = clicked.getAttribute('bombsNearby')
        if (nearbyBombs > 0){
        clicked.innerHTML = nearbyBombs
        return}
        checkSurroundings(clicked)
    }
     
}



function checkSurroundings(clicked){
    console.log(clicked, 'this is clicked')
    let clickedID = parseInt(clicked.id)
    console.log(clickedID, 'this is clickedID')
    let leftSide = clickedID % 10 === 0;
    let rightSide = (clickedID + 1) % 10 === 0;

    setTimeout(() => {
        if (clickedID > 0 && !leftSide){
            const iD = cells[clickedID-1]
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);
            };
        if (clickedID < 99 && !rightSide){
            const iD = cells[clickedID+1]
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);
            };
        if (clickedID > 9){
            const iD = cells[clickedID-10]
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);    
            };
        if (clickedID < 90){
            const iD = cells[clickedID+10]
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);    
            };
        if (clickedID > 10 && !leftSide){
            const iD = cells[clickedID-11]
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);
            };
        if (clickedID > 9 && !rightSide){
            const iD = cells[clickedID-9]
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);
            };
        if (clickedID < 90 && !leftSide){
            const iD = cells[clickedID+9]
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);    
            };
        if (clickedID < 90 && !rightSide){
            const iD = cells[clickedID+11]
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);    
            }; 
    }, 10)
}



function showHideRules(){
    let rulesClick = document.getElementById('dropContent');
    if(rulesClick.style.display ==='none'){
        rulesClick.style.display = "block";
    } else {
        rulesClick.style.display = "none";
    }
}



function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }





//a timer that counts up by seconds and minutes to track how long it takes to finish




//checking if neighboring cells are bombs and clearing up to the edge of where they are
//touching a bomb and then numbering how many bombs they are touching
//checking if I am on an edge or not and how to know which surrounding cells to check



//right click to mark with a flag, ?, or clear

// function setFlag(e){
//     let rightClicked = e.target;
//     rightClicked.classList.add('flagged');
//     const 
//     rightClicked.appendChild()
// }



//display win or lose messages with total time








//init function

function init(){
    createGameBoard()
}

