//============Constants===================//

const gameBoard = document.querySelector('.gameBoard')





//========== State ==========================//

let gameBoardWidth = 10;
let bombTotal = 25
let cells = [];
let gameOver = false;
//creating a random array of bombs that can correspond with the cells of my grid
const bombArray = Array(bombTotal).fill('bomb');
//array Constructor to create an array with "safe"
const theSafeCells = Array(gameBoardWidth*gameBoardWidth - bombTotal).fill('safe');
//concat to join the safe array and the bomb array;
const bombsAndSafeCells = bombArray.concat(theSafeCells);
//shuffle function to mix the joined arrays
const bombsAndSafeCellsMixed = shuffle(bombsAndSafeCells);





//============ Cached ========================//

//images for flags, question mark, bomb

const flagImage = 



//============Event Listeners===================//

document.getElementById('rulesButton').addEventListener('click', showHideRules);
document.getElementById('startButton').addEventListener('click', init);
//document.querySelector('.gameBoard').addEventListener('click', checkForBombs)
//document.querySelector('.gameBoard').addEventListener('contextmenu', setFlag)




//============Functions===================//
//create grid - this allows me to pass initial values directly into an array instead of 
// writing the divs in the html file and then adding the value to each one individually

function createGameBoard(){
    //iterates through the the area of the gameboard creating divs
    //each div is assigned an id number equal to the iteration
    //each div is also assigned a class of 'bomb' or 'safe' that is equal to the bombsAndSafeCellsMixed index value of i
    //the divs are appended to the gameboard container and pushed to the cells array with a matching index of i
    //the event listener was placed here because of the scope of cell and because adding it to the parent-gameBoard
    //caused the recursive function to fill the entire board
    for (let i = 0; i < gameBoardWidth*gameBoardWidth; i++){
        const cell = document.createElement('div');
        cell.setAttribute('id', i);
        cell.classList.add(bombsAndSafeCellsMixed[i])
        gameBoard.appendChild(cell);
        cells.push(cell)
        cell.addEventListener('click', function(e){
            checkForBombs(cell)
        })

    }
    for (let i = 0; i < cells.length; i++){
        //this for loop checks each divs and if the class is 'safe' it checks all of the surrounding divs
        //avoiding the edges to see if they contain the class 'bomb'
        //if they do contain bomb, it updates the bombCount variable by one possible values 1-8
        //the bombCount is then added to the div as a bombsNearby value
        let bombCount = 0
        const leftSide = i % gameBoardWidth === 0;
        const rightSide = (i % gameBoardWidth) === gameBoardWidth -1;
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
function checkForBombs (cell){
    let currentID =  cell.id
    // doesn't trigger the loop is the game is over and you click another cell
    if (gameOver) return
    // doesn't trigger the loop if the cell is a bomb
    if (cell.classList.contains('bomb')) return
    //stops the the cell is flagged or if it already has the checked class
    if (cell.classList.contains('flagged') || cell.classList.contains('checked')) return
        else{
        //if the cell has bombsNearby this adds that number to the HTML so we see it on the grid
        let nearbyBombs = cell.getAttribute('bombsNearby')
        if (nearbyBombs > 0){
            cell.classList.add('checked');
            cell.innerHTML = nearbyBombs
            return
        }
    }
    //this adds the checked class to the cell we've clicked and the runs calls the checkSurroundings
    //function passing in the clicked cell and it's id
    cell.classList.add('checked');
    checkSurroundings(cell, currentID)
     
}


// check the squares around the square that was clicked and passes each back to the checkForBombs()
function checkSurroundings(cell, currentID){
    const leftSide = currentID % gameBoardWidth === 0;
    const rightSide = (currentID % gameBoardWidth) === gameBoardWidth -1;
    //setTimeout is a built in function that tells the code in the brackets not to execute until
    //after a certain period.  In this case, 10ms, allowing checked status to be updated.
    setTimeout(() => {
        //these if statements look at the surrounding cells and determine if they are on an edge
        //if they are not on an edge they are passed back to the check for bombs function
        //that function will check their status and potentially pass them back to the checkSurroundings
        //function again to then check the neighboring cells of that function.  This continues until
        //
        if (currentID > 0 && !leftSide){
            const iD = cells[parseInt(currentID)-1].id
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);
            };
        if (currentID > 9 && !rightSide){
            const iD = cells[parseInt(currentID)+1 -gameBoardWidth].id
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);
            };
        if (currentID > 10){
            const iD = cells[parseInt(currentID) + 1 -gameBoardWidth].id
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);    
            };
        if (currentID > 11 && !leftSide){
            const iD = cells[parseInt(currentID)-1 -gameBoardWidth].id
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);    
            };
        if (currentID < 98 && !rightSide){
            const iD = cells[parseInt(currentID)+1].id
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);
            };
        if (currentID < 90 && !leftSide){
            const iD = cells[parseInt(currentID)-1 +gameBoardWidth].id
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);
            };
        if (currentID < 88 && !rightSide){
            const iD = cells[parseInt(currentID)+1 +gameBoardWidth].id
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);    
            };
        if (currentID < 89){
            const iD = cells[parseInt(currentID)+gameBoardWidth].id
            const newCell = document.getElementById(iD);
            checkForBombs(newCell);    
            }; 
    }, 10)
}


// changes the style of the anchors in the drop down windw to make them disappear or show
function showHideRules(){
    let rulesClick = document.getElementById('dropContent');
    if(rulesClick.style.display ==='none'){
        rulesClick.style.display = "block";
    } else {
        rulesClick.style.display = "none";
    }
}


//uses the Fisher-Yates algorithm to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }











// function setFlag(e){
//     let rightClicked = e.target;
//     rightClicked.classList.add('flagged');
//     const 
//     rightClicked.appendChild()
// }








//init function

function init(){
    createGameBoard()
}

