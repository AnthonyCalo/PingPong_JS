//update loop
import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball=new Ball(document.getElementById("ball"))
const playerPaddle= new Paddle(document.getElementById("player-paddle"))
const computerPaddle= new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime=0;
let playing=false;

window.addEventListener('load', (event) => {
    ListenNewGame()
  });
function update(time){
    if(lastTime!=null && playing===true){
        const delta=time-lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

        document.documentElement.style.setProperty("--hue", hue + delta * .01)
        if(isLose()){
            handleLoss()
        }
    }
    lastTime=time
    window.requestAnimationFrame(update)
}
function removeListener(){
    document.removeEventListener(("keypress"))
}
function ListenNewGame(){
    document.addEventListener("keypress", (e)=>{
        console.log("here")
        playing=true
        document.getElementById("PressPlay").setAttribute("class", "hideEl")
        // removeListener()
    } )
}

function isLose(){
    const rect= ball.rect()
    return( rect.left >= window.innerWidth || rect.left <=0)
}

function handleLoss(){
    const rect = ball.rect()
    if( rect.right >= window.innerWidth){ 
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) +1
    }else{
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) +1
    }
    resetGame()
}
function resetGame(){
    ball.reset()
    computerPaddle.reset()
    playing=false
    document.getElementById("PressPlay").setAttribute("class", "PressPlay")
    ListenNewGame()
}

document.addEventListener("mousemove", e=> {
    //convert y to a percantage beacuse position is percent in css page
    playerPaddle.position = (e.y / window.innerHeight) * 100
})
window.requestAnimationFrame(update)