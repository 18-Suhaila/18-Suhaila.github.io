//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const pagequizbtn = document.querySelector("#quizbtn");

var allpages = document.querySelectorAll(".page");
let currentPage = null;
let quizVisible = false;

/* AUDIO */
const btn1Aud = new Audio("audio/Button1.mp3");
const btn2Aud = new Audio("audio/Button2.mp3");

const s1Aud = new Audio("audio/Score1.mp3");
const s2Aud = new Audio("audio/Score2.mp3");
const s3Aud = new Audio("audio/Score3.mp3");
const s4Aud = new Audio("audio/Score4.mp3");

//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) {
        onepage.style.display = "none";
        onepage.classList.add("shrink");
    }
}

function show(pgno) { //function to show selected page no
    const pageId = "page" + pgno;
    const selectedPage = document.querySelector("#" + pageId);

    if (currentPage === selectedPage) {
        // Animate closing
        selectedPage.classList.add("shrink");

        // Wait for the transition to finish before hiding
        selectedPage.addEventListener("transitionend", function handler() {
            selectedPage.style.display = "none";
            selectedPage.removeEventListener("transitionend", handler);
        });

        currentPage = null;
        btn2Aud.play();
    } else {
        hideall();
        selectedPage.style.display = "block";

        setTimeout(function () {
            selectedPage.classList.remove("shrink");
        }, 10);
        currentPage = selectedPage;
        btn1Aud.play();
    }
}

function toggleTheQuiz() { // hide/show the quiz page
    const quiz = document.querySelector("#quizpg");

    if (quizVisible) {
        // if the quiz is showing when user presses the button
        // adds the shrink class
        quiz.classList.add("shrinkW");
        // waits for transition first before hiding
        quiz.addEventListener("transitionend", function handler() {
            quiz.style.display = "none";
            quiz.removeEventListener("transitionend", handler);
        });
        quizVisible = false;
        btn2Aud.play();
    } else {
        // if quiz is not shown when user presses btn
        // shows the quiz and remove shrink class
        quiz.style.display = "block";
        setTimeout(() => { // 
            quiz.classList.remove("shrinkW");
        }, 10);
        quizVisible = true;
        btn1Aud.play();
    }
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
page4btn.addEventListener("click", function () {
    show(4);
});
pagequizbtn.addEventListener("click", function () {
    toggleTheQuiz()
});


hideall();
// seperate from hide all because i dont want them to close together
document.querySelector("#quizpg").style.display = "none";
document.querySelector("#quizpg").classList.add("shrinkW");

const btnSubmit = document.querySelector("#btnSubmit");
const btnReset = document.querySelector("#btnReset");
const scorebox = document.querySelector("#scorebox");
var score = 0;
corrAnsArray = ["HDF", "SDIM", "VSWD", "P"];
function CheckAns() {
    score = 0; //reset score to 0, check ans and give score if correct
    for (let i = 0; i < corrAnsArray.length; i++) {
        CheckOneQn(i + 1, corrAnsArray[i]);
    }
    switch (score){
        case 0: scorebox.innerHTML = "0 0 0 0";
        break;
        case 1: scorebox.innerHTML = "You can do better.";
        s1Aud.play();
        break;
        case 2: scorebox.innerHTML = "Half right.";
        s2Aud.play();
        break;
        case 3: scorebox.innerHTML = "Almost all correct!";
        s3Aud.play();
        break;
        case 4: scorebox.innerHTML = "All Correct!";
        s4Aud.play();
        break;
    }
}
btnSubmit.addEventListener("click", CheckAns);
function CheckOneQn(qnNo, CorrAns) {
    qTemp = document.querySelector("input[name='q" + qnNo + "']:checked").value;
    if (qTemp == CorrAns) score++;
    console.log(qTemp); //check q1 value retrieved
}
btnReset.addEventListener("click", ResetQuiz);
function ResetQuiz(){
    score = 0;
    scorebox.innerHTML = "";
    for (let i = 1; i <= corrAnsArray.length; i++) {
        let radios = document.getElementsByName("q" + i);
        for (let radio of radios) {
            radio.checked = false;
        }
    }
}

/*JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
hamBtn.addEventListener("click", toggleMenus);
function toggleMenus() { /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    //if menu is showing (has the class “menuShow”)
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Close Menu"; //change button text to chose menu
    } else { //if menu NOT showing
        hamBtn.innerHTML = "Open Menu"; //change button text open menu
    }
}

const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");
btnFS.addEventListener("click", enterFullscreen);
btnWS.addEventListener("click", exitFullscreen);
function enterFullscreen() { //must be called by user generated event
    document.documentElement.requestFullscreen();
}
function exitFullscreen() {
    document.exitFullscreen();
}



/*find references to all the buttons and ball */
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const resetBtn = document.querySelector("#resetBtn");
const ball = document.querySelector("#ball");
var ballX = ballY = 0; //assign initial position of ball
function ResetPos() {
    ballX = ballY = 0; //reset to zero
    ball.style.left = ballX + "px"; //set left property to ball x variable
    ball.style.top = ballY + "px"; //set top property to ball x variable
    ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}
function MovePos(leftInc, topInc) {
    ballX = ballX + leftInc;
    ballY = ballY + topInc;
    ball.style.left = ballX + "px"; //set left css property to ball x variable
    ball.style.top = ballY + "px"; //set top css property to ball y variable
    ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}

function MoveLeft() {
    ballX = ballX - 10; //decrement by 10
    ballY = ballY + 0; //no change
    ball.style.left = ballX + "px"; //set left css property to ball x variable
    ball.style.top = ballY + "px"; //set top css property to ball y variable
    ball.innerText = ballX + "," + ballY; //update ball text to show coordinate
}
//eventlistener to activate MoveLeft (named callback function)
leftBtn.addEventListener("click", MoveLeft); //no brackets after MoveLeft
//eventListener to anonymous callback function (other way)
rightBtn.addEventListener("click", function () {
    MovePos(10, 0);
});
upBtn.addEventListener("click", function () {
    MovePos(0, -10);
});
downBtn.addEventListener("click", function () {
    MovePos(0, 10);
});
resetBtn.addEventListener("click", ResetPos);

document.addEventListener('keydown', function (kbEvt) {
    //kbEvt: an event object passed to callback function
    console.log(kbEvt); //see what is returned
    if (kbEvt.code === "ArrowRight") {
        MovePos(10, 0);
    }
    if (kbEvt.code === "ArrowLeft") {
        MoveLeft();
    }
    if (kbEvt.code === "ArrowDown") {
        MovePos(0, 10);
    }
    if (kbEvt.code === "ArrowUp") {
        MovePos(0, -10);
    }
    //Better option: use switch case instead
});

//define more variables and constants
var velX, velY;
const minLeft = minTop = 0;
const maxTop = maxLeft = 300;
//function to pick random number from a min-max range
function RandomRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
//function to activate automove
function StartAutoMove() {
    velX = RandomRange(-10, 10);
    velY = RandomRange(-10, 30);
    setInterval(MoveIt, 100);
}
//callback function for setInterval
function MoveIt() {
    MovePos(velX, velY); //move at random velocity picked earlier
}
StartAutoMove(); //invoke the function to activate automove

/* Move Pos function with collision check and reaction*/
function MovePosWifCollision() {
    ballX += velX;
    ballY += velY;
    /*check if reach min/max left/top and flip velocity*/
    if (ballX > maxLeft) {
        velX = -velX; //reverse the X velocity
        ballX = maxLeft; //snap ballX to maxLeft
        ball.classList.add("ballAnim");
    }
    if (ballY > maxTop) {
        velY = -velY;
        ballY = maxTop; //snap ballY to maxTop
        ball.classList.add("ballAnim");
    }
    if (ballX < minLeft) {
        velX = -velX;
        ballX = minLeft;
        ball.classList.remove("ballAnim");
    }
    if (ballY < minTop) {
        velY = -velY;
        ballY = minTop;
        ball.classList.remove("ballAnim");
    }
    UpdateBallStyle();
}
//Modify StartAutoMove function
function StartAutoMove() {
    velX = RandomRange(-10, 10);
    velY = RandomRange(-10, 30);
    setInterval(MovePosWifCollision, 100);
}