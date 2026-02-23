let count = 10;
let timer;

function runCountdown() {
  timer = setInterval(() => {
    document.querySelector('#count').innerText = count;
    count--;

    if(count < 0) {
        clearInterval(timer);
        document.querySelector('#count').innerText = "Time's Up!";
    }
  }, 1000);
}

function start() {
    if (!timer) {
        runCountdown();
    }
}

function stop() {
    clearInterval(timer);
    timer = null;
}

runCountdown();