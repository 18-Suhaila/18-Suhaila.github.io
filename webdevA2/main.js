//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const pagequizbtn = document.querySelector("#quizbtn");
const pageminibtn = document.querySelector("#mgbtn");

var allpages = document.querySelectorAll(".page");
let currentPage = null;
let quizVisible = false;
let gameVisible = false;

/* AUDIO */
const btn1Aud = new Audio("audio/Button1.mp3");
const btn2Aud = new Audio("audio/Button2.mp3");

const s1Aud = new Audio("audio/Score1.mp3");
const s2Aud = new Audio("audio/Score2.mp3");
const s3Aud = new Audio("audio/Score3.mp3");
const s4Aud = new Audio("audio/Score4.mp3");

const m1Aud = new Audio("audio/Matched.mp3");
const m2Aud = new Audio("audio/NoMatch.mp3");

//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) {
        onepage.style.display = "none";
        onepage.classList.add("shrink");
    }
}
function hidegames() {
    document.querySelector("#quizpg").style.display = "none";
    document.querySelector("#quizpg").classList.add("shrinkW");
    document.querySelector("#gamepg").style.display = "none";
    document.querySelector("#gamepg").classList.add("shrinkW");
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
        setTimeout(() => {
            quiz.classList.remove("shrinkW");
        }, 10);
        quizVisible = true;
        btn1Aud.play();
    }
}

function toggleTheGame() {
    const game = document.querySelector("#gamepg");

    if (gameVisible) {
        game.classList.add("shrinkW");
        // waits for transition first before hiding
        game.addEventListener("transitionend", function handler() {
            game.style.display = "none";
            game.removeEventListener("transitionend", handler);
        });
        gameVisible = false;
        btn2Aud.play();
    } else {
        // if quiz is not shown when user presses btn
        // shows the quiz and remove shrink class
        game.style.display = "block";
        setTimeout(() => { // 
            game.classList.remove("shrinkW");
        }, 10);
        gameVisible = true;
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
    toggleTheQuiz();
});
pageminibtn.addEventListener("click", function () {
    toggleTheGame();
});
hideall();
hidegames();

const btnSubmit = document.querySelector("#btnSubmit");
const btnReset = document.querySelector("#btnReset");
const scorebox = document.querySelector("#scorebox");
var score = 0;
var corrAnsArray = ["HDF", "SDIM", "VSWD", "P"];
function CheckAns() {
    score = 0; //reset score to 0, check ans and give score if correct
    for (let i = 0; i < corrAnsArray.length; i++) {
        CheckOneQn(i + 1, corrAnsArray[i]);
    }
    switch (score) {
        case 0: scorebox.innerHTML = "0 0 0 0";
            break;
        case 1: scorebox.innerHTML = "Try Again?";
            s1Aud.play();
            break;
        case 2: scorebox.innerHTML = "Half Right.";
            s2Aud.play();
            break;
        case 3: scorebox.innerHTML = "Almost There!";
            s3Aud.play();
            break;
        case 4: scorebox.innerHTML = "Yaay!";
            s4Aud.play();
            break;
    }
}
function CheckOneQn(qnNo, CorrAns) {
    const qTemp = document.querySelector("input[name='q" + qnNo + "']:checked").value;
    if (qTemp == CorrAns) score++;
    console.log(qTemp); //check q1 value retrieved
}
function ResetQuiz() {
    score = 0;
    scorebox.innerHTML = "";
    // uncheck all the radio buttons
    for (let i = 1; i <= corrAnsArray.length; i++) {
        let radios = document.querySelectorAll('input[name="q' + i + '"]');
        for (let radio of radios) {
            radio.checked = false;
        }
    }
}
btnSubmit.addEventListener("click", function () {
    CheckAns();
});
btnReset.addEventListener("click", function () {
    ResetQuiz();
});

/* MINIGAME */
const colorArray = ["#FF7721", "#0077DD", "#00BBDC", "#FF679A"];
const dynamicArea = document.querySelector("#dynamicArea");
const totalSquares = 24;

// add the colours into an array and make it equal so there's no duplicates
let colors = [];
while (colors.length < totalSquares) {
    for (let i = 0; i < colorArray.length && colors.length < totalSquares; i++) {
        colors[colors.length] = colorArray[i];
    }
}
// shuffle all the colours in the array
colors.sort(function () { return 0.5 - Math.random(); });

for (let i = 0; i < totalSquares; i++) {
    var newDiv = document.createElement('div');
    // Add content and attributes
    let colorVar = colors[i];
    newDiv.style.width = "80px";
    newDiv.style.height = "80px";
    newDiv.style.margin = "10px";
    newDiv.className = 'new-class';
    newDiv.id = 'new-id-' + i; //give unique id
    //make it select in order of colorArray and repeat
    newDiv.style.background = colorVar;
    newDiv.dataset.color = colorVar;
    // Add to the end of the body
    dynamicArea.appendChild(newDiv);
    //don't addlistener to child, as it has been delegated to parent
}

// shuffle every three seconds
setInterval(shuffleColors, 3000);

function shuffleColors() {
    const squares = dynamicArea.querySelectorAll('.new-class');

    // get colours from the current squares
    // then shuffle it
    let currentColors = [];
    for (let i = 0; i < squares.length; i++) {
        currentColors[i] = squares[i].dataset.color;
    }
    currentColors.sort(function () { return 0.5 - Math.random(); });

    // put back the colours back into the squares
    // skip matched squares bcuz they're already matched
    for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];
        const newColor = currentColors[i];

        if (!sq.classList.contains('matched')) {
            sq.dataset.color = newColor;
            sq.style.background = newColor;
        }
    }
}

let firstSquare = null;
//add eventlistner to parent, as delegate
dynamicArea.addEventListener("click", Match);

function Match(evt) {
    var clicked = evt.target;

    // ignore if the square is already matched
    if (clicked.classList.contains('matched')) {
        return;
    }

    // if square is selected twice then ignore
    if (firstSquare === clicked) return;

    // when clicked, white border for visual
    clicked.style.border = "3px solid white";

    if (!firstSquare) {
        // if no square is clicked, assign it to first square
        firstSquare = clicked;
    } else {
        // compare colors with firstSelected
        if (clicked.dataset.color === firstSquare.dataset.color) {
            m1Aud.play();
            // add a class to set 'matched' to the pair
            clicked.classList.add('matched');
            firstSquare.classList.add('matched');

            // white bg for matched
            clicked.style.background = "white";
            firstSquare.style.background = "white";

            // emoji because i don't like the empty, plain white bg
            clicked.textContent = "🎨";
            firstSquare.textContent = "🎨";
        } else {
            m2Aud.play();
            // no match, remove border on both squares
            clicked.style.border = "none";
            firstSquare.style.border = "none";
        }
        // reset for next matching
        firstSquare = null;
    }
}

const miniresetbtn = document.querySelector("#btnResetMini");
miniresetbtn.addEventListener("click", ResetMini);
function ResetMini() { // shuffle colors and unmatch all matched squares
    // shuffle colors
    colors.sort(function () { return 0.5 - Math.random(); });
    // select the div with 'new-class'- the squaress
    const Squares = dynamicArea.querySelectorAll('.new-class');

    for (let i = 0; i < Squares.length; i++) {
        const square = Squares[i];
        const color = colors[i];
        square.classList.remove('matched');
        square.style.border = "none";
        square.style.background = color;
        square.dataset.color = color;
        square.textContent = "";
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
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}
