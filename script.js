
/* =====================================
   100 DOORS TO ESCAPE
   HEATWAVE JAVASCRIPT
===================================== */


/* =====================================
   1. GAME MECHANICS
===================================== */

const mechanics = [
    "The class will be divided into several groups, and each group must select one representative to participate in the game.",

    "Before the game begins, the representative of the first group must roll a dice to determine which door number they are allowed to open.",

    "The number shown on the dice will correspond to the door number they must choose.",

    "Each door contains a different Thermodynamics-related question or challenge, such as multiple-choice questions, identification, enumeration, temperature conversion, and problem-solving and calculations.",

    "Once the question is presented, the group will be given a specific time limit to discuss and provide their final answer.",

    "The following time limits will be observed: Multiple Choice – 15 seconds; Identification – 20 seconds; Enumeration – 30 seconds; Temperature Conversion – 45 seconds; Problem-Solving and Calculations – 1 minute.",

    "If the group answers correctly within the given time, they can proceed to their next turn and roll the dice again to determine which door to open next.",

    "If the group answers incorrectly or fails to answer within the time limit, their turn ends, and the next group gets an opportunity to play.",

    "Some doors contain special prizes, while others are designated as Lucky Doors.",

    "If a group opens a Lucky Door, they are automatically declared winners and can claim their corresponding prize.",

    "Even after opening a Lucky Door, the group may choose whether to continue playing or stop. They are already considered winners regardless of their decision.",

    "Groups that choose to continue must still aim to reach Door No. 100 to complete the game.",

    "The game continues until a group reaches Door No. 100 or decides to stop after discovering a Lucky Door."
];


/* =====================================
   HEATWAVE - DISPLAY GAME MECHANICS
===================================== */

const mechanicsList = document.getElementById("mechanics-list");

if (mechanicsList) {
    mechanicsList.innerHTML = "";

    mechanics.forEach((mechanic, index) => {
        const card = document.createElement("div");

        card.className = "mechanic-card";

        const number = document.createElement("span");
        number.className = "mechanic-number";
        number.textContent = String(index + 1).padStart(2, "0");

        const heading = document.createElement("h3");
        heading.textContent = `MECHANIC ${index + 1}`;

        const description = document.createElement("p");
        description.textContent = mechanic;

        card.append(number, heading, description);
        mechanicsList.appendChild(card);
    });
}



/* =====================================
   2. CHALLENGE TIME LIMITS
===================================== */

const challenges = [
    {
        name: "Multiple Choice",
        seconds: 15
    },
    {
        name: "Identification",
        seconds: 20
    },
    {
        name: "Enumeration",
        seconds: 30
    },
    {
        name: "Temperature Conversion",
        seconds: 45
    },
    {
        name: "Problem-Solving & Calculations",
        seconds: 60
    }
];


/* DISPLAY TIME LIMIT CARDS */

const timerCategories =
    document.getElementById("timer-categories");

challenges.forEach(challenge => {

    const card = document.createElement("div");

    card.classList.add("challenge-card");

    const displayTime = challenge.seconds === 60
        ? "1 MINUTE"
        : challenge.seconds + " SECONDS";

    card.innerHTML = `
        <h3>${challenge.name}</h3>
        <p>${displayTime}</p>
    `;

    card.addEventListener("click", () => {
        selectChallenge(challenge);
    });

    timerCategories.appendChild(card);

});


/* =====================================
   3. FUNCTIONAL COUNTDOWN TIMER
===================================== */

const countdown =
    document.getElementById("countdown");

const categoryDisplay =
    document.getElementById("timer-category");

const statusDisplay =
    document.getElementById("timer-status");

const startButton =
    document.getElementById("start-btn");

const pauseButton =
    document.getElementById("pause-btn");

const resetButton =
    document.getElementById("reset-btn");


let selectedChallenge = challenges[0];

let timeLeft = selectedChallenge.seconds;
// AUTOMATIC TIMER WARNING
const countdownDisplay = document.getElementById("countdown");

if (countdownDisplay) {
    if (timeLeft <= 5 && timeLeft > 0) {
        countdownDisplay.classList.add("timer-warning");
    } else {
        countdownDisplay.classList.remove("timer-warning");
    }
}

let timerInterval = null;

let isRunning = false;


/* DISPLAY TIME */

function updateDisplay() {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    countdown.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

}


/* SELECT CHALLENGE */

function selectChallenge(challenge) {

    stopTimer();

    selectedChallenge = challenge;

    timeLeft = challenge.seconds;

    categoryDisplay.textContent = challenge.name;

    statusDisplay.textContent = "READY TO BEGIN";

    updateDisplay();

}


/* START TIMER */

function startTimer() {

    if (isRunning || timeLeft <= 0) {
        return;
    }

    isRunning = true;

    statusDisplay.textContent = "COUNTDOWN IN PROGRESS";

    let previousTime = Date.now();

    timerInterval = setInterval(() => {

        const now = Date.now();

        const elapsed = Math.floor(
            (now - previousTime) / 1000
        );

        if (elapsed >= 1) {

            timeLeft = Math.max(0, timeLeft - elapsed);

            previousTime += elapsed * 1000;

            updateDisplay();

        }

        if (timeLeft <= 0) {

            stopTimer();

            statusDisplay.textContent = "TIME IS UP!";

            countdown.style.color = "#FF0000";

        }

    }, 100);

}


/* PAUSE TIMER */

function pauseTimer() {

    if (!isRunning) {
        return;
    }

    stopTimer();

    statusDisplay.textContent = "TIMER PAUSED";

}


/* STOP TIMER */

function stopTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    isRunning = false;

}


/* RESET TIMER */

function resetTimer() {

    stopTimer();

    timeLeft = selectedChallenge.seconds;

    countdown.style.color = "#FF69B4";

    statusDisplay.textContent = "READY TO BEGIN";

    updateDisplay();

}


/* BUTTON EVENTS */

startButton.addEventListener("click", startTimer);

pauseButton.addEventListener("click", pauseTimer);

resetButton.addEventListener("click", resetTimer);


/* INITIAL DISPLAY */

updateDisplay();


