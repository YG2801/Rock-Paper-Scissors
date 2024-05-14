import { createLeaves, animate } from "./confetti.js"
const compScoreEl = document.getElementById("computer-score")
const userScoreEl = document.getElementById("user-score")
const roundMsgEl = document.getElementById("round-message")
const blockScreenEl = document.getElementById("block-screen")

const compHandsArray = Array.from(
    document.getElementById("computer-hands-container").children
)
const userHandsArray = Array.from(
    document.getElementById("user-hands-container").children
)
const userBtnsArray = Array.from(
    document.getElementById("user-btn-container").children
)

let compScore = 0
let userScore = 0
const choices = ["rock", "paper", "scissors"]

setTimeout(() => {
    blockScreenEl.style.zIndex = "-1"
}, 3000)

userBtnsArray.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const userChoice = e.target.id.split("-")[0]
        const compChoice = findCompChoice()
        raiseHands(userHandsArray, userChoice)
        raiseHands(compHandsArray, compChoice)
        gameplay(userChoice, compChoice)
    })
})

function stopHandsAnimation(handsArray) {
    handsArray.forEach((hand) => {
        hand.style.animation = "none"
    })
}

function starthandsAnimation(handsArray) {
    let delay = 0
    handsArray.forEach((hand) => {
        hand.style.animation = `moveUpDown 0.7s ease-in-out infinite ${delay}s`
        delay += 0.2
    })
}

function raiseHands(handsArray, choice) {
    stopHandsAnimation(handsArray)
    handsArray.forEach((hand) => {
        if (hand.id === choice) {
            hand.style.transform = "translateY(-60px)"
        } else {
            hand.style.transform = "translateY(0px)"
        }
    })
}

function findCompChoice() {
    const randomNum = Math.floor(Math.random() * 3)
    const choice = choices[randomNum]
    return choice
}

function gameplay(userChoice, compChoice) {
    switch (userChoice) {
        case "rock":
            if (compChoice === "rock") {
                draw()
            } else if (compChoice === "paper") {
                compWin()
            } else {
                userWin()
            }
            break
        case "paper":
            if (compChoice === "rock") {
                userWin()
            } else if (compChoice === "paper") {
                draw()
            } else {
                compWin()
            }
            break
        case "scissors":
            if (compChoice === "rock") {
                compWin()
            } else if (compChoice === "paper") {
                userWin()
            } else {
                draw()
            }
            break
    }
    setTimeout(() => {
        starthandsAnimation(compHandsArray)
        starthandsAnimation(userHandsArray)
    }, 3000)
}

function userWin() {
    userScore++
    userScoreEl.innerText = userScore
    roundMsgEl.textContent = "You Win!"
    startMsgAnimation()
}

function compWin() {
    compScore++
    compScoreEl.innerText = compScore
    roundMsgEl.textContent = "I Win!"
    startMsgAnimation()
}

function draw() {
    roundMsgEl.textContent = "Draw!"
    startMsgAnimation()
}

function startMsgAnimation() {
    blockScreenEl.style.zIndex = "10"
    roundMsgEl.style.animation = "msgAnimation 3s ease-out 1"
    setTimeout(() => {
        blockScreenEl.style.zIndex = "-1"
        roundMsgEl.style.animation = "none"
        if (userScore === 5 || compScore === 5) {
            endGame()
        }
    }, 3000)
}

const playagainbtn = document.getElementById("play-again-btn")
const playagainbtnContainer = document.getElementById("play-again-container")
function endGame() {
    console.log("end game")
    blockScreenEl.style.zIndex = "10"
    playagainbtnContainer.style.display = "flex"
    let finalText = "Oops! You Lose!"
    if (userScore > compScore) {
        finalText = "Hurrah! You Win!"
        createLeaves()
        animate()
    }
    playagainbtnContainer.children[0].textContent = finalText
    playagainbtnContainer.children[1].children[0].textContent = `My Score: ${compScore}`
    playagainbtnContainer.children[1].children[1].textContent = `Your Score: ${userScore}`
    playagainbtn.addEventListener("click", () => {
        window.location.reload()
    })
}
