const pomodoroTime = document.getElementById('pomodoro-time');
const startBtn = document.getElementById('start');
const pomodoroBtn = document.getElementById('pomodoro');
const breakBtn = document.getElementById('break');
const resetBtn = document.getElementById('reset');

function formatTimer(value) {
    if (value < 10) {
        return `0${value}`
    }        
    return value;
}

function createTimerContainer() {
    let timerId;
    let initialTime = pomodoroTime.textContent;

    function setTimer() {
        timerId = setInterval(() => {
            let [mm, ss] = pomodoroTime.textContent.split(':').map(Number); 

            if (ss > 0) {
                ss--;
            } else if (mm > 0) {
                ss = 59;
                mm--;
            }
            pomodoroTime.textContent = `${formatTimer(mm)}:${formatTimer(ss)}`;

            if (mm === 0 && ss === 0) {
                changeBtn('stop');
                pomodoroTime.textContent = initialTime;
            }  
            
        }, 1000);
        }
    
    function changeBtn(startStop) {
        if (startStop === 'stop') {
            startBtn.textContent = 'start';
            clearInterval(timerId);
        } else if (startStop === 'start') {
            startBtn.textContent = 'stop';
            setTimer();
        }
    }

    startBtn.addEventListener('click', function () { 
        if (startBtn.textContent === 'start') {
            changeBtn('start');
        } else {
            changeBtn('stop');
        }   
    }); 

    pomodoroBtn.addEventListener('click', function() {
        pomodoroTime.textContent = '25:00';
        initialTime = pomodoroTime.textContent;
        changeBtn('stop');
    })

    breakBtn.addEventListener('click', function() {
        pomodoroTime.textContent = '05:00';
        initialTime = pomodoroTime.textContent;
        changeBtn('stop');
    })

    resetBtn.addEventListener('click', function() {
        pomodoroTime.textContent = initialTime;
        changeBtn('stop');
    })
}
createTimerContainer();