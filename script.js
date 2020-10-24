let doorImage1 = document.querySelector('#door1');
let doorImage2 = document.querySelector('#door2');
let doorImage3 = document.querySelector('#door3');

let botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoor = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoor = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
let closedDoor = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';
let numClosedDoors = 3;
let currentlyPlaying = true;
let openDoor1;
let openDoor2;
let openDoor3;
let startButton = document.querySelector('#start');
let score = 0;
let highScore = 0;
let checkSavedScore = localStorage['highScore'] ? localStorage['highScore'] : highScore;
let savedScore = localStorage.setItem('highScore', checkSavedScore);
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = localStorage['highScore'];

const isBot = door => {
    if (door.src === botDoorPath) {
        return true;
    }
    return false;
}

const isClicked = door => {
    if (door.src === closedDoor) {
        return false;
    }
    return true;
}

const playDoor = door => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    }
}

const randomChoreDoorGenerator = () => {
    let choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoor;
        openDoor3 = spaceDoor;
    } else if (choreDoor === 1) {
        openDoor2 = botDoorPath;
        openDoor1 = beachDoor;
        openDoor3 = spaceDoor;
    } else {
        openDoor3 = botDoorPath;
        openDoor2 = beachDoor;
        openDoor1 = spaceDoor;
    }

}

doorImage1.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage1)) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
}

doorImage2.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage2)) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
}

doorImage3.onclick = () => {
    if (currentlyPlaying && !isClicked(doorImage3)) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
}


startButton.onclick = () => {
    if (currentlyPlaying === false) {
        startRound();
    }
}

const startRound = () => {
    numClosedDoors = 3;
    doorImage1.src = closedDoor;
    doorImage2.src = closedDoor;
    doorImage3.src = closedDoor;
    startButton.innerHTML = 'Good luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator()
}

const gameOver = status => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! Play again?';
        getYourScore();
    } else {
        startButton.innerHTML = 'Game over! Play again?';
        score = 0;
        currentStreak.innerHTML = score;
    }
    currentlyPlaying = false;
}

const getYourScore = () => {
    score++;
    currentStreak.innerHTML = score;
    if (score > checkSavedScore) {
        highScore = score;
        localStorage['highScore'] = highScore;
        bestStreak.innerHTML = highScore;
    }
}
startRound();