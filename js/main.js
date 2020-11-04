//============Constants===================//

const gameBoard = document.querySelector('.gameBoard')





//========== State ==========================//

let gameBoardWidth = 10;
let bombTotal = 25
let cells = [];

const bombArray = Array(bombTotal).fill('bomb');
const theSafeCells = Array(gameBoardWidth*gameBoardWidth - bombTotal).fill('safe');
const bombsAndSafeCells = bombArray.concat(theSafeCells);
const bombsAndSafeCellsMixed = shuffle(bombsAndSafeCells);





//============ Cached ========================//

//images for flags, question mark, bomb





//============Event Listeners===================//

document.getElementById('rulesButton').addEventListener('click', showHideRules);
document.getElementById('startButton').addEventListener('click', init);
document.querySelector('.gameBoard').addEventListener('click', checkForBombs)





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
}

function checkForBombs (e){
    let bombCount = 0
    let clicked = e.target;
    let clickedID = parseInt(clicked.id)
    let leftSide = clickedID % 10 === 0;
    console.log(leftSide, 'leftSide')
    let rightSide = (clickedID + 1) % 10 === 0;
    console.log(rightSide, 'rightSide')

    if (clicked.classList.contains('safe')){
        if (clickedID > 0 && !leftSide && cells[clickedID-1].classList.contains('bomb')){
            bombCount++;
        }
        if (clickedID < 99 && !rightSide && cells[clickedID+1].classList.contains('bomb')){
            bombCount++;
        }
        if (clickedID > 9 && cells[clickedID-10].classList.contains('bomb')){
            bombCount++;
        }
        if (clickedID < 90 && cells[clickedID+10].classList.contains('bomb')){
            bombCount++;
        }
        if (clickedID > 10 && !leftSide && cells[clickedID-11].classList.contains('bomb')){
            bombCount++;
        }
        if (clickedID > 9 && !rightSide && cells[clickedID-9].classList.contains('bomb')){
            bombCount++;
        }
        if (clickedID < 90 && !leftSide && cells[clickedID+9].classList.contains('bomb')){
            bombCount++;
        }
        if (clickedID < 90 && !rightSide && cells[clickedID+11].classList.contains('bomb')){
            bombCount++;
        }
        clicked.setAttribute('bombsNearby', bombCount);
    } else {
        console.log('game-over')
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



function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


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
    createGameBoard()
}
