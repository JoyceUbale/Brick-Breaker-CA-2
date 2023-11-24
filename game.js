const ball = document.getElementById("ball");
const grid = document.querySelector(".grid");
var platform = document.getElementById("platform");

var blocks = Array.from(document.querySelectorAll(".grid div")); 

var ballDirectionY = 1 ;
var ballDirectionX = 1
var phrase1 = "You won";
var phrase2 = ["you loose","got defeated","failed"," was unsuccessful"];
var phrase = document.getElementById("phrase");
var score1 = document.getElementById("score");
var score = 0;

// moving the ball
function moveBall(){
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    // changing left and top
    ball.style.left = (ballLeft + (10*ballDirectionX)) + "px";
    ball.style.top = (ballTop - (10*ballDirectionY)) + "px"
}

// change direction of ball on collision with walls
function changeDirection(){
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));

    if(ballTop <0){
        ballDirectionY = -ballDirectionY
    }
    else if(ballLeft < 0 || ballLeft > innerWidth){
        ballDirectionX = -ballDirectionX
    }
}

// Removing blocks with ball and bouncing ball back
 function remove(){ 
    blocks.forEach((block)=>{
        var blockPosition = block.getBoundingClientRect();
        var ballPosition = ball.getBoundingClientRect();
        var removedBlock = block.classList.contains("remove");

        if(blockPosition.left < ballPosition.right && blockPosition.right > ballPosition.left && blockPosition.top < ballPosition.bottom && blockPosition.bottom > ballPosition.bottom && !removedBlock) {
            block.style.visibility = "hidden";
            block.classList.add("remove");
            ballDirectionY = -ballDirectionY;
            score++;
        }else{
            console.log("nothing")
        }
       
        score1.innerHTML="SCORE: " + score;
    })
}

// control the paddle with mouse
window.addEventListener("mousemove", movePlatform)

 function movePlatform(e){
     mousePosition ={
         x: e.clientX,
         y: e.clientY
     }
     if(mousePosition.x < innerWidth - 80){
        platform.style.left = (mousePosition.x + 0) + "px"
     }else{
         console.log("go inside")
     }
 }




// // Assuming 'platform' is the element you want to move
// var platform = document.getElementById('platform');

// Store initial touch position
var initialTouchX = 0;

// Add event listeners for mouse and touch events
window.addEventListener("mousemove", movePlatform);
platform.addEventListener("touchstart", touchStart);
platform.addEventListener("touchmove", touchMove);

function movePlatform(e) {
    mousePosition = {
        x: e.clientX,
        y: e.clientY
    }
    if (mousePosition.x < window.innerWidth - 80) {
        platform.style.left = (mousePosition.x + 0) + "px";
    } else {
        console.log("go inside");
    }
}

function touchStart(e) {
    initialTouchX = e.touches[0].clientX;
}

function touchMove(e) {
    e.preventDefault(); // Prevent scrolling on touch devices
    var touchX = e.touches[0].clientX;
    var deltaX = touchX - initialTouchX;

    // Update initial touch position for the next move event
    initialTouchX = touchX;

    // Update platform position based on touch movement
    var newLeft = parseInt(platform.style.left, 10) + deltaX;
    
    // Make sure the platform stays within the window bounds
    if (newLeft >= 0 && newLeft <= window.innerWidth - 80) {
        platform.style.left = newLeft + "px";
    }
}



 // ball bouce back after hitting the paddle
 function collision(){
    var platformPosition = platform.getBoundingClientRect();
    var ballPosition = ball.getBoundingClientRect();
    if(platformPosition.left < ballPosition.right && platformPosition.right > ballPosition.left && platformPosition.top < ballPosition.bottom && platformPosition.bottom > ballPosition.top){
        ballDirectionY = -ballDirectionY
    }
 }

 // game over funtion
 function gameOver(){
     var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
     if(ballTop > innerHeight){
         clearInterval(interval)
         const result = document.getElementById("result");
         result.style.display = "block";
         grid.style.display = "none";
         const box = document.getElementById("box");
         box.style.display = "none";
     }else{
         console.log("nothing")
     }
     const nick = localStorage.getItem("Nickname")
     var random = phrase2[Math.floor(Math.random()* phrase2.length)]
     phrase.innerHTML= nick + " " + random; 
 }


// Main starting fuction of game
function start(){
    moveBall()
    changeDirection()
    remove()
    collision()
    gameOver()
}

const interval = setInterval(start, 40)

var audio = new Audio("./assets/background sound.mp3")
audio.play()

// to clear the old Nickname and put new name
const restart = document.getElementById("btn");
restart.onclick =()=>{
    location.href="./player.html"
    localStorage.clear();
}