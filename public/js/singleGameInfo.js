if (localStorage.getItem('token') == null) {
    window.location.href = 'index.html'
}

url = new URL(document.URL);
const urlParams = url.searchParams;
const gameId = urlParams.get("game_id");
const gameArea = document.getElementById("gameArea")


if (gameId == 1) {
    gameArea.innerHTML = `
    <div class="container shadow rounded p-3">
    <div class="row">
        <div class="col-12">
            <h1 class="text-center">Guess The Number!</h1>
        </div>
    </div>
    <div>
        <div class="text-center my-auto">
            <div>Guess a number from 1 to 20</div>
            <input type="number" class="form-control" id="numberGuessInput" placeholder="Type your guess here..." min="1" max="20" required>
            <button onclick='guessTheNumber()'class="mt-2 btn btn-primary">Confirm</button>
        </div>
    </div>
    <div id="warningCard" class="card border-danger mt-3 mb-3 d-none">
        <div class="card-body text-danger">
          <p id="warningText" class="card-text"></p>
        </div>
      </div>`
}

if (gameId == 2) {
    gameArea.innerHTML = `
    <div class="container">
                <div class="row">
                <div class="col-12">
                    <h1 class="text-center">Guess The Door!</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <a href='#' onclick="doorGame(1)"><img id="door1" class="img-fluid" src='./images/door.jpg'></a>
                </div>
                <div class="col-4">
                    <a href='#' onclick="doorGame(2)"><img id="door2" class="img-fluid" src='./images/door.jpg'></a> 
                </div>
                <div class="col-4">
                    <a href='#' onclick="doorGame(3)"><img id="door3" class="img-fluid" src='./images/door.jpg'></a>
                </div>
            </div>
            <div id="warningCard" class="card border-danger mt-3 mb-3 d-none">
                <div class="card-body text-danger">
                  <p id="warningText" class="card-text"></p>
                </div>
              </div>
        </div>

    
    `
}

if (gameId == 3) {
    gameArea.innerHTML = `
    <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center">Solve The Math Problem!</h1>
                </div>
            </div>
            <div class="text-center mt-2">
            <h2>
                <span id="mathGameFirstNumber" class="shadow rounded p-1">12</span> <span id="mathGameOperation">+</span> <span id="mathGameSecondNumber" class="shadow rounded p-1">8</span> <span id="mathGameEqualSign">=</span> <span id="mathGameUnknown" class="shadow rounded p-1 ">?</span>
            </h2>
            <div class='text-primary'>round answers to nearest integers</div>
            <input type="number" class="form-control mt-3 w-50 mx-auto" id="mathAnswerInput" placeholder="Type your answer here..." required>
            <button class="btn btn-primary mt-2" onclick="mathGameAnswered()">Answer</button>
            </div>
        </div>
    `
    initMathGame();
}

if (gameId == 4) {
    
   
    gameArea.innerHTML = `
    <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 class="text-center">Memory Game</h1>
                </div>
            </div>
        </div>
        <div class="container mt-3" id="memoryGameArea">
            <div class="row row-cols-3">

                <div class="col px-0 border border-1 border-dark">
                    <div class="square" id="memoryGameGrid1" onclick="playMemoryGame(1)">
                    </div>
                </div>
                <div class="col px-0 border border-1 border-dark">
                    <div class="square" id="memoryGameGrid2" onclick="playMemoryGame(2)">
                    </div>
                </div>
                <div class="col px-0 border border-1 border-dark">
                    <div class="square" id="memoryGameGrid3" onclick="playMemoryGame(3)">
                    </div>
                </div>

                <div class="col px-0 border border-1 border-dark">
                    <div class="square" id="memoryGameGrid4" onclick="playMemoryGame(4)">
                    </div>
                </div>
                <div class="col px-0 border border-1 border-dark">
                    <div class="square" id="memoryGameGrid5" onclick="playMemoryGame(5)">
                    </div>
                </div>
                <div class="col px-0 border border-1 border-dark">
                    <div class="square" id="memoryGameGrid6" onclick="playMemoryGame(6)">
                    </div>
                </div>

                <div class="col px-0 border border-1 border-dark">
                    <div class="square" id="memoryGameGrid7" onclick="playMemoryGame(7)">
                    </div>
                </div>
                <div class="col px-0 border border-1 border-dark">
                    <div class="square" id="memoryGameGrid8" onclick="playMemoryGame(8)">
                    </div>
                </div>
                <div class="col px-0 border border-1 border-dark">
                    <div class="square" id="memoryGameGrid9" onclick="playMemoryGame(9)">
                    </div>
                </div>
                
            </div>
        </div>
    `
    document.addEventListener("DOMContentLoaded", function () {
        initMemoryGame();
    })
    
}

function guessTheNumber() {
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    warningCard.classList.add("d-none");

    
    let correctNumber = Math.floor(Math.random() * 20) + 1; // get the correct number by random
    const numberGuessInput = document.getElementById('numberGuessInput').value

    if (numberGuessInput == '') { // check for empty input
        alert('Please input a number!');
        return;
    }

    if (numberGuessInput == correctNumber) { 

        const data = {
            game_id: gameId
        }
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            if (responseStatus != 201) {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message || responseData.error;
            } else {
                const toastLiveExample = document.getElementById('liveToast')
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(() => { window.location.href = '/minigames.html' }, 800)
            }
        };

        fetchMethod(currentUrl + "/api/minigames/item/player", callback, "POST", data, localStorage.getItem("token"));
    } else {
        alert("You've guessed the wrong number! Try again!")
    }

}

function doorGame(doorid) {

    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    warningCard.classList.add("d-none");

    const door1 = document.getElementById(`door1`)
    door1.setAttribute('src', './images/door.jpg')

    const door2 = document.getElementById(`door2`)
    door2.setAttribute('src', './images/door.jpg')

    const door3 = document.getElementById(`door3`)
    door3.setAttribute('src', './images/door.jpg')

    let correctDoor = Math.floor(Math.random() * 3) + 1;

    if (doorid == correctDoor) { 
        const data = {
            game_id: gameId
        }
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            if (responseStatus != 201) {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message || responseData.error;
            } else {
                const door = document.getElementById(`door${doorid}`)
                door.setAttribute('src', './images/door open.jpg')
                const toastLiveExample = document.getElementById('liveToast')
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(() => { window.location.href = '/minigames.html' }, 800)
            }
        };

        fetchMethod(currentUrl + "/api/minigames/item/player", callback, "POST", data, localStorage.getItem("token"));
    } else {
        alert("You've guessed the wrong door! Try again!")
    }

    console.log(correctDoor, doorid)
}

var mathEquationAns;

function initMathGame() {
    const mathGameFirstNumber = document.getElementById('mathGameFirstNumber');
    const mathGameOperation = document.getElementById('mathGameOperation');
    const mathGameSecondNumber = document.getElementById('mathGameSecondNumber');
    const mathGameUnknown = document.getElementById('mathGameUnknown');
    const mathAnswerInput = document.getElementById('mathAnswerInput');

    // get the math equation

    let mathOperations = ['+', '-', 'x', '/'][Math.floor(Math.random() * 4)];
    let firstNumber = Math.floor(Math.random() * 500)
    let secondNumber = Math.floor(Math.random() * 500)

    mathGameFirstNumber.innerHTML = firstNumber
    mathGameSecondNumber.innerHTML = secondNumber
    mathGameOperation.innerHTML = mathOperations
    mathGameUnknown.innerHTML = '?'
    mathAnswerInput.value = ''

    // get correct answer 

    switch (mathOperations) {
        case '+':
            mathEquationAns = firstNumber + secondNumber;
            break;
        case '-':
            mathEquationAns = firstNumber - secondNumber;
            break;
        case 'x':
            mathEquationAns = firstNumber * secondNumber;
            break;
        case '/':
            mathEquationAns = Math.round(firstNumber / secondNumber);
            break;
    }
}

function mathGameAnswered() {
    const mathGameUnknown = document.getElementById('mathGameUnknown')
    mathGameUnknown.innerHTML = mathEquationAns
    const mathAnswerInput = document.getElementById('mathAnswerInput')
    if (mathAnswerInput.value == mathEquationAns) {
        const data = {
            game_id: gameId
        }
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            if (responseStatus != 201) {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message || responseData.error;
            } else {
                const toastLiveExample = document.getElementById('liveToast')
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(() => { window.location.href = '/minigames.html' }, 800)
            }
        };

        fetchMethod(currentUrl + "/api/minigames/item/player", callback, "POST", data, localStorage.getItem("token"));
    } else {
        alert("You've answered the wrong answer! Try again!");
        initMathGame();
    }
}

var memoryPath = [];
var userInputMemoryPath = [];
var memoryGameStage = 1;
var blockMemoryBoardFromUserInput = false;


function initMemoryGame() {

    userInputMemoryPath = [];
    memoryGameStage = 1;
    memoryPath = [];
    
    function getRandomNumber() {

        // gets the memory path

        let ranNum = Math.floor(Math.random() * 9) + 1;
        
        // makes sure that memorypath doesnt have two consecutive titles
        
        if (memoryPath.length !== 0 && memoryPath[memoryPath.length-1] === ranNum) { 
            return getRandomNumber();
        } else {
            return ranNum;
        }

    }

    for (let i = 0; memoryPath.length < 5; i++) {
        memoryPath.push(getRandomNumber())
    }

    showMemoryPath(memoryPath.slice(0, memoryGameStage));
}

function showGrid(gridId) {
    const memoryGameGrid1 = document.getElementById("memoryGameGrid1");
    const memoryGameGrid2 = document.getElementById("memoryGameGrid2");
    const memoryGameGrid3 = document.getElementById("memoryGameGrid3");
    const memoryGameGrid4 = document.getElementById("memoryGameGrid4");
    const memoryGameGrid5 = document.getElementById("memoryGameGrid5");
    const memoryGameGrid6 = document.getElementById("memoryGameGrid6");
    const memoryGameGrid7 = document.getElementById("memoryGameGrid7");
    const memoryGameGrid8 = document.getElementById("memoryGameGrid8");
    const memoryGameGrid9 = document.getElementById("memoryGameGrid9");

    let memoryGridElementList = [memoryGameGrid1, memoryGameGrid2, memoryGameGrid3, memoryGameGrid4, memoryGameGrid5, memoryGameGrid6, memoryGameGrid7, memoryGameGrid8, memoryGameGrid9]

    for (let i = 0; i < memoryGridElementList.length; i++) {
        memoryGridElementList[i].classList.remove("square-lit")
        
        if (i+1 === gridId) {
            memoryGridElementList[i].classList.add("square-lit")
        }
    }
    
    if (gridId === 0) {
        blockMemoryBoardFromUserInput = false;
    }
}

function showMemoryPath(memoryPathArray, showTime = 1000) {

    blockMemoryBoardFromUserInput = true;
    memoryPathArray.push(0); //  appends 0 at the back of the memory show that it doesnt show any lit up squares
    memoryPathArray.forEach((path, i) => {
        setTimeout(showGrid, showTime*(i), path) 
    });
}

function playMemoryGame(gridId) {
    if (blockMemoryBoardFromUserInput) { // doesnt allow the user to click the tiles
        return;
    }

    showMemoryPath([gridId], 100);

    setTimeout(() => {
        let currentMemoryStagePath = memoryPath.slice(0, memoryGameStage)

        userInputMemoryPath.push(gridId); // user's input
        
        if (userInputMemoryPath.length === currentMemoryStagePath.length) {
            for (let i = 0; i < userInputMemoryPath.length; i++) {
                if (userInputMemoryPath[i] !== currentMemoryStagePath[i]) { // checks if the user inputted correctly
                    alert("You've remembered wrongly! Try again.");
                    setTimeout(initMemoryGame, 1000);
                    return;
                }
            }

            if (memoryGameStage < memoryPath.length) {
                userInputMemoryPath = [];
                memoryGameStage += 1;
                setTimeout(showMemoryPath, 500, memoryPath.slice(0, memoryGameStage));
                
            } else {
                const data = {
                    game_id: gameId
                }
                const callback = (responseStatus, responseData) => {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
        
                    if (responseStatus != 201) {
                        warningCard.classList.remove("d-none");
                        warningText.innerText = responseData.message || responseData.error;
                    } else {
                        const toastLiveExample = document.getElementById('liveToast')
                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                        toastBootstrap.show()
                        setTimeout(() => { window.location.href = '/minigames.html' }, 800)
                    }
                };
        
                fetchMethod(currentUrl + "/api/minigames/item/player", callback, "POST", data, localStorage.getItem("token"));
            }

        }
    }, 150);
}