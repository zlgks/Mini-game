'use strict';
//--------------------------선언--------------------------------
//------ui
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
console.log(resetButton);


//--------------------------이벤트-------------------------------
//게임버튼 이벤트
gameButton.addEventListener('click', (e) => {
    console.log(e.target);
    gameButtonControl();
    remainCarrotCount();
})

//리셋버튼 이벤트


//---------------------------함수--------------------------------

// 게임버튼 시작/정지 아이콘 & 정지버튼 리셋 팝업
function gameButtonControl() {
    if(winPopup.className === 'ui__win active' ||
    losePopup.className === 'ui__lose active') {
        return;
    } else {
    switch(gameButton.className) {
        case 'ui__game-button' :
            gameButton.innerHTML = `<i class="fas fa-pause"></i>`;
            gameButton.classList.add('active');
            timer = setInterval(timeCountDown, 1000);
            break;
        case 'ui__game-button active' :
            clearInterval(timer);
            gameButton.innerHTML = `<i class="fas fa-play"></i>`;
            gameButton.classList.remove('active');
            gameButton.classList.add('pause');
            resetPopup.classList.add('active');
            break;
        case 'ui__game-button pause' :
            timer = setInterval(timeCountDown, 1000);
            gameButton.innerHTML = `<i class="fas fa-pause"></i>`;
            gameButton.classList.remove('pause');
            gameButton.classList.add('acitve');
            resetPopup.classList.remove('active');
            break;
    }
}
}

// function gameButtonControl() {
//     if(winPopup.className === 'ui__win active' || losePopup.className === 'ui__lose active') {
//         return;
//     } else if (gameButton.className == 'ui__game-button') {
//         gameButton.innerHTML = `<i class="fas fa-pause"></i>`;
//         gameButton.classList.add('active');
//         timer = setInterval(timeCountDown, 1000);
//     } else {
//         gameButton.classList.toggle('pause');
//         clearInterval(timeCountDown, 1000);

//     }
// }

//리셋버튼 함수
function reset() {
    currentSecond = 10;
    currentMinute = 0;
    time = null;
    resetPopup.classList.remove('active');
    gameButton.className === 'ui__game-button';
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
        losePopup.classList.add('active');
    }
}

//남은 당근 갯수 (타겟이 클릭 될때마다 가져올 함수)
function remainCarrotCount() {
    let carrot = carrotArray.length;
    carrotCount.innerText = carrot;
}