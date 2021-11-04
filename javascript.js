'use strict';
//--------------------------선언--------------------------------
//------ui
const ui = document.querySelector('.ui');
const gameButton = document.querySelector('.ui__game-button');
const losePopup = document.querySelector('.ui__lose');
const winPopup = document.querySelector('.ui__win');
const resetPopup = document.querySelector('.ui__reset');
const resetButton = document.querySelector('.ui__reset-button');
const carrotCount = document.querySelector('.ui__carrot-counter');
const carrotArray = document.querySelectorAll('.game-carrot');
//------타이머
const minute = document.querySelector('.timer__minute');
const second = document.querySelector('.timer__second');
let currentSecond = 10;
let currentMinute = 0;
let timer;
//------타겟
const gameSection = document.querySelector('.game-section');
const target = document.querySelector('.game-target');
let carrots = document.querySelectorAll('.game-carrot');
let bugs = document.querySelectorAll('.game-bug');
let randomX = [];
let randomY = [];
let index = 0;
let indexTwo = 10;
let carrotLength;
const copyTarget = target.cloneNode(true);
//-------효과음
const alertSound = new Audio();
alertSound.src = "./carrot/sound/alert.wav";
const bgSound = new Audio();
bgSound.src = "./carrot/sound/bg.mp3";
const bugPullSound = new Audio();
bugPullSound.src = "./carrot/sound/bug_pull.mp3";
const carrotPullSound = new Audio();
carrotPullSound.src = "./carrot/sound/carrot_pull.mp3";
const gameWinSound = new Audio();
gameWinSound.src = "./carrot/sound/game_win.mp3";

//--------------------------이벤트-------------------------------
//게임버튼 이벤트
gameButton.addEventListener('click', (e) => {
    gameButtonControl();
    remainCarrotCount();
})

//리셋버튼 이벤트
ui.addEventListener('click', (event) => {
    if(event.target.dataset.state == 'reset') {
        reset();
    }
})

//타겟 클릭 이벤트
target.addEventListener('click', (event) => {
    if(winPopup.className === 'ui__win active' ||
    losePopup.className === 'ui__lose active') {
        return;
    }
    clickTarget(event);
})

//---------------------------함수--------------------------------

// 게임버튼 시작/정지 아이콘 & 정지버튼 리셋 팝업
function gameButtonControl() {
    if(winPopup.className === 'ui__win active' ||
    losePopup.className === 'ui__lose active') {
        return;
    } else {
    switch(gameButton.dataset.state) {
        case 'game' :
            gameButton.innerHTML = `<i class="fas fa-pause"></i>`;
            gameButton.dataset.state = 'start';
            timer = setInterval(timeCountDown, 1000);
            randomTarget();
            soundControl(bgSound, 'play');
            break;
        case 'start' :
            clearInterval(timer);
            gameButton.innerHTML = `<i class="fas fa-play"></i>`;
            gameButton.dataset.state = 'pause';
            resetPopup.classList.add('active');
            soundControl(bgSound, 'pause');
            break;
        case 'pause' :
            timer = setInterval(timeCountDown, 1000);
            gameButton.innerHTML = `<i class="fas fa-pause"></i>`;
            gameButton.dataset.state = 'start';
            resetPopup.classList.remove('active');
            soundControl(bgSound, 'play');
            break;
    }
}
}


//리셋버튼 함수
function reset() {
    currentSecond = 10;
    currentMinute = 0;
    timer = null;
    winPopup.classList.remove('active');
    losePopup.classList.remove('active');
    resetPopup.classList.remove('active');
    second.innerText = `:${currentSecond}`;
    index = 0;
    indexTwo = 10;
    target.innerHTML = copyTarget.innerHTML;
    randomX = [];
    randomY = [];
    carrots = document.querySelectorAll('.game-carrot');
    bugs = document.querySelectorAll('.game-bug');
    gameButton.dataset.state = 'game';
    gameButton.innerHTML = `<i class="fas fa-play"></i>`;
    soundControl(bgSound, 'stop');

}

//10초 카운트, (1초마다 가져올 함수)
function timeCountDown() {
    if(currentSecond > 0) {
        second.innerText = `:${currentSecond}`;
        minute.innerText = currentMinute;
        currentSecond--;
    } else {
        clearInterval(timer);
        minute.innerText = '';
        second.innerText = '💣';
        soundControl(bgSound, 'stop');
        soundControl(alertSound, 'play');
        losePopup.classList.add('active');
    }
}


//타겟 생성
function createTarget() {
    bugs.forEach((bug) => bug.dataset.state = 'ready');
    carrots.forEach((carrot) => carrot.dataset.state = 'ready');
    bugs[index].style.transform = `translate(${randomX[index]}px,${randomY[index]}px)`;
    carrots[index].style.transform = `translate(${randomX[indexTwo]}px, ${randomY[indexTwo]}px)`;
    index++;
    indexTwo++;
}

//타겟 랜덤 좌표 배열 생성
function random() {
    const minH = 0;
    const minW = 0;
    const maxH = gameSection.getBoundingClientRect().height - 100;
    const maxW = gameSection.getBoundingClientRect().width - 100;
    const x = Math.floor((Math.random() * maxW));
    const y = Math.floor((Math.random() * maxH));
    randomX.push(x);
    randomY.push(y);
}

//랜덤 좌표 실행, 생성
function randomTarget() {
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();
    random();//좌표 20개
    createTarget();
    createTarget();
    createTarget();
    createTarget();
    createTarget();
    createTarget();
    createTarget();
    createTarget();
    createTarget();
    createTarget();
}
//당근 클릭시 나올 함수
function clickTarget(event) {
    if(event.target.className === 'game-carrot') {
        soundControl(carrotPullSound, 'play');
        event.target.remove();
        remainCarrotCount();
    } else if(event.target.className === 'game-bug') {
        soundControl(bugPullSound,'play');
        soundControl(bgSound, 'stop');
        losePopup.classList.add('active');
        clearInterval(timer);
    }
}

//남은 당근 갯수 (타겟이 클릭 될때마다 가져올 함수) & 게임 승리
function remainCarrotCount() {
    let carrot = document.querySelectorAll('.game-carrot');
    carrotCount.innerText = carrot.length;

    if(winPopup.className === 'ui__win active'){
        return;
    } else if(carrot.length < 1) {
        soundControl(bgSound, 'stop');
        soundControl(gameWinSound,'play');
        winPopup.classList.add('active');
        clearInterval(timer);
    } 
}

//소리 컨트롤
function soundControl(sound, state) {
    switch(state) {
        case 'play':
            sound.play();
            break;
        case 'stop':
            sound.pause();
            sound.currentTime = 0;
            break;
        case 'pause':
            sound.pause();
            break;
    }
}

