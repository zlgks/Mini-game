'use strict';
const ui = document.querySelector('.ui');
const startBtn = document.querySelector('.ui__game-button');
const pauseBtn = document.querySelector('.ui__game-pause');
const carrotCounter = document.querySelector('.ui__carrot-counter');
const target = document.querySelector('.game-target');
const carrot = document.querySelectorAll('.game-carrot');
const bug = document.querySelector('.game-bug');
let bugArray;
let carrotArray;
const lose = document.querySelector('.ui__lose');
const winPopup = document.querySelector('.ui__win');
const gameSection = document.querySelector('.game-section');
const copyTarget = target.cloneNode(true);

console.log(copyTarget);

// 10초 타이머, 팝업창(나중에 분리할것)
const minute = document.querySelector('.timer__minute');
const second = document.querySelector('.timer__second');
let currentSecond = 10;
let currentMinute = 0;
let time;

// 게임 실행 / 리셋
ui.addEventListener('click', (event) => {
    if(event.target.dataset.type == 'start'){
        pauseBtn.classList.remove('active');
        startBtn.classList.toggle('active');
        time = setInterval(secondTimer, 1000);
        targetStart();
        countCarrot();
    } else if(event.target.dataset.type == 'pause') {
        startBtn.classList.toggle('active');
        pauseBtn.classList.add('active');
        clearInterval(time);
    }
})


// 타겟 클릭이벤트
target.addEventListener('click', (event) => {
    if(event.target.className === 'game-carrot active') {
        event.target.remove();
        countCarrot();
        win();
    } else if(event.target.className === 'game-bug active') {
        lose.classList.add('active');
        clearInterval(time);
        startBtn.classList.add('reset');
    }
})

// 게임 승리 함수
function win() {
    let carrotLength = document.querySelectorAll('.game-carrot');
    if(carrotLength.length === 0){
    winPopup.classList.add('active');
    clearInterval(time);
    }
}

// 게임 리셋


function secondTimer() {
    if(currentSecond < 1) {
        clearInterval(time);
        lose.classList.add('active');
        console.log('boom!');
        currentSecond = 10;
        second.innerText = `${currentSecond}`;
        startBtn.classList.add('reset');
    } else {
        lose.classList.remove('active');
        second.innerText = `${currentSecond}`;
        minute.innerText = `${currentMinute}: `;    
        currentSecond--;
    }
}

//당근 카운트
function countCarrot() {
    let carrotLength = document.querySelectorAll('.game-carrot');
    carrotCounter.innerText = carrotLength.length;
}

// 타겟 지정 장소에 흩뿌리기
//     랜덤 좌표 생성
let randomX = [];
let randomY = [];
let allIndex = 0;
let carrotIndex = 0;

function bugAddClass() {
    bugArray = document.querySelectorAll('.game-bug');
    bugArray.forEach(bug => bug.classList.add('active'));
}

function carrotAddClass() {
    carrotArray = document.querySelectorAll('.game-carrot');
    carrotArray.forEach(carrot => carrot.classList.add('active'));
}

function random() {
    const minH = 0;
    const maxH = gameSection.getBoundingClientRect().height - 100;
    const maxW = gameSection.getBoundingClientRect().width - 100;
    console.log(maxW);
    const minW = 0;
    const x = Math.floor((Math.random() * maxW));
    const y = Math.floor((Math.random() * maxH));
    randomX.push(x);
    randomY.push(y);
}

function bugRandom(x,y) {
    bugAddClass();
    if(bugArray.length < 11) {
    bugArray[find].style.transform = `translate(${x[find]}px,${y[find]}px)`;
    find++;
    }
}

function carrotRandom(x,y) {
    carrotAddClass();
    if(carrotArray.length < 11) {
        carrotArray[cFind].style.transform = `translate(${x[find]}px,${y[find]}px)`;
        cFind++;
        find++;
        }
    
}

//나중에 수정할거.. 악으로 깡으로 버텨라...
function targetStart() {
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
    random();
    bugRandom(randomX,randomY);
    bugRandom(randomX,randomY);
    bugRandom(randomX,randomY);
    bugRandom(randomX,randomY);
    bugRandom(randomX,randomY);
    bugRandom(randomX,randomY);
    bugRandom(randomX,randomY);
    bugRandom(randomX,randomY);
    bugRandom(randomX,randomY);
    bugRandom(randomX,randomY);
    carrotRandom(randomX,randomY);
    carrotRandom(randomX,randomY);
    carrotRandom(randomX,randomY);
    carrotRandom(randomX,randomY);
    carrotRandom(randomX,randomY);
    carrotRandom(randomX,randomY);
    carrotRandom(randomX,randomY);
    carrotRandom(randomX,randomY);
    carrotRandom(randomX,randomY);
    carrotRandom(randomX,randomY);
}

// 타겟 재생성
function targetRespon() {
    target.innerHTML = '';
    target.innerHTML = copyTarget.innerHTML;
    randomX = [];
    randomY = [];
    find = 0;
    cFind = 0;
    currentSecond = 10;
    startBtn.classList.remove('reset');
}