// const welcomePage = document.getElementsByClassName('welcome-page')[0];
const clrPianoCon = document.getElementsByClassName('clr-piano-con')[0];
const word = document.getElementsByClassName('word')[0];
const shadow = document.getElementsByClassName('shadow')[0];
const muteCon = document.getElementsByClassName('mutespan')[0];
const mute = document.getElementsByClassName('mute')[0];
const menuIcon = document.getElementsByClassName('menu')[0];
const pianoAudios = document.querySelectorAll('.clr-piano-con audio');
const body = document.getElementsByTagName('body')[0];

window.addEventListener('load', () => {
    // welcomePage.style.animation = 'welcome 0.6s ease-in 5.4s forwards 1';
    body.style.animation = 'ballVisible 1.7s ease-in forwards 1';
    shadow.style.animation = 'visible 0.5s ease-in 1.7s forwards 1';
    mute.style.animation = 'visible 0.5s ease-in 2.2s forwards 1';
    menuIcon.style.animation = 'visible 0.5s ease-in 2.2s forwards 1';
});

function unmutePianoAudios() {
    for (var i = 0; i < pianoAudios.length; i++) {
        pianoAudios[i].muted = false;
    }
}

function mutePianoAudios() {
    for (var i = 0; i < pianoAudios.length; i++) {
        pianoAudios[i].muted = true;
        pianoAudios[i].pause();
    }
}

const music = document.getElementsByClassName('music')[0];
function unmuteMusic() {
    music.muted = false;
}

function muteMusic() {
    music.pause();
    music.currentTime = 0;
    boxColorChange.restart();
    boxColorChange.pause();
    playPauseButton.innerHTML = 'play_arrow';
    playPauseCnt = 0;
}

muteCon.addEventListener('click', () => {
    if (muteCon.innerHTML == 'volume_off') {
        muteCon.innerHTML = 'volume_up';
        unmutePianoAudios();
    }
    else {
        muteCon.innerHTML = 'volume_off';
        mutePianoAudios();
    }
});

function keyPressed(key) {
    try {
        document.getElementById(`${key}`).play();
    }
    catch {

    }
    // word.textContent = key.toUpperCase();
}

function keyUp(key) {
    adding = [10, 20, 30, 50, 100, 31, 45, 1, 0, 255, 200, 250, 245, 70, 23, 40, 134, 189, 233, 90, 210, 220, 230, 240, 250, 260, 290, 155, 165, 175, 185, 195, 105]
    one = adding[Math.floor(Math.random() * adding.length)]
    two = adding[Math.floor(Math.random() * adding.length)]
    three = adding[Math.floor(Math.random() * adding.length)]
    word.textContent = '';
    word.style.boxShadow = `0 -20px 30px 0.1px rgb(${one}, ${two}, ${three}) inset`;
    shadow.style.backgroundColor = `rgb(${one}, ${two}, ${three})`;
}

window.addEventListener('keypress', (event) => {
    keyPressed(event.key);
});

window.addEventListener('keyup', (event) => {
    keyUp(event.key);
});

// close open menu
const menuCon = document.getElementsByClassName('menu-con')[0];
var menuCount = 0;

function menuAppear() {
    menuCon.style.transform = 'translateX(0)';
    menuCount = 1;
}

function menuDisappear() {
    menuCon.style.transform = 'translateX(-100%)';
    menuCount = 0;
}

menuIcon.addEventListener('click', () => {
    if (menuCount === 0) {
        menuAppear();
    }
    else {
        menuDisappear();
    }
});

const musicOp = document.getElementById('music');
const colorPiano = document.getElementById('clr-piano');
const musicCon = document.getElementsByClassName('music-con')[0];
var musicCnt = 0

musicOp.addEventListener('click', () => {
    menuDisappear();
    mutePianoAudios();
    unmuteMusic();
    musicCnt = 1;
    word.style.transform = 'translateY(-500%)';
    shadow.style.width = '0px';
    mute.style.bottom = '-100px';
    clrPianoCon.style.animation = 'containerDisappear 1s linear 0.2s forwards 1';
    musicCon.style.animation = 'containerAppear 1s linear 0.2s forwards 1';
});

colorPiano.addEventListener('click', () => {
    menuDisappear();
    unmutePianoAudios();
    muteMusic();
    musicCnt = 0;
    word.style.transform = 'translateY(0%)';
    shadow.style.width = '200px';
    mute.style.bottom = '30px';
    musicCon.style.animation = 'containerDisappear 1s linear 0.2s forwards 1';
    clrPianoCon.style.animation = 'containerAppear 1s linear 0.2s forwards 1';
});

//for music page
const playPauseButton = document.getElementsByClassName('play-pause-icon')[0];
var playPauseCnt = 0;

function createBoxes() {
    for (var i = 0; i < 100; i++) {
        var box = document.createElement('div');
        box.classList.add('box');

        musicCon.appendChild(box);
    }
}

createBoxes();
var animationCnt = 0;
var boxScatter = anime({
    targets: ['.box'],
    translateX: () => { return anime.random(-50, 50) + 'vw' },
    translateY: () => { return anime.random(-50, 50) + 'vh' },
    scale: () => { return anime.random(1, 4) },
    easing: 'linear',
    duration: 7000,
    delay: 3000,
    autoplay: false,
    complete: continousBoxAnimation,
})

function continousBoxAnimation() {
    anime({
        targets: ['.box'],
        translateX: () => { return anime.random(-50, 50) + 'vw' },
        translateY: () => { return anime.random(-50, 50) + 'vh' },
        scale: () => { return anime.random(1, 4) },
        easing: 'linear',
        duration: 7000,
        delay: 3000,
        complete: continousBoxAnimation,
    })
}

// for box animations
const boxs = Array.from(document.getElementsByClassName('box')).reverse();
const bgColor = 'rgb(29, 29, 58)';

var boxColorChange = anime.timeline({
    duration: 1000,
    easing: 'easeOutCubic',
    autoplay: false
});
boxColorChange
    .add({
        targets: boxs[0],
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 8000
    })
    .add({
        targets: boxs.slice(0, 2),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 14000
    })
    .add({
        targets: boxs.slice(0, 3),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 800
    })
    .add({
        targets: boxs.slice(0, 4),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 1000
    })
    .add({
        targets: boxs.slice(0, 1),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 3000
    })
    .add({
        targets: boxs.slice(0, 2),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 800
    })
    .add({
        targets: boxs.slice(0, 3),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 1000
    })
    .add({
        targets: boxs.slice(0, 5),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 2500
    })
    .add({
        targets: boxs.slice(0, 5),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 2800
    })
    .add({
        targets: boxs.slice(0, 5),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 3000
    })
    .add({
        targets: boxs.slice(0, 5),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 2500
    })
    .add({
        targets: boxs.slice(0, 50),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            }
        ],
        delay: 2800
    })
    .add({
        targets: boxs.slice(0, 50),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
        ],
        duration: 13500,
        delay: 500
    })
    .add({
        targets: boxs,
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 14500,
        delay: 500
    })
    .add({
        targets: boxs.slice(0, 8),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 15000
    })
    .add({
        targets: boxs.slice(0, 7),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 800
    })
    .add({
        targets: boxs.slice(0, 6),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 1000
    })
    .add({
        targets: boxs.slice(0, 5),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 800
    })
    .add({
        targets: boxs.slice(0, 4),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 1000
    })
    .add({
        targets: boxs.slice(0, 3),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 800
    })
    .add({
        targets: boxs.slice(0, 2),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 900
    })
    .add({
        targets: boxs.slice(0, 1),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        delay: 900
    })
    .add({
        // for fast effect
        targets: boxs.slice(0, 1),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500,
        delay: 500
    })
    .add({
        targets: boxs.slice(0, 5),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500,
    })
    .add({
        targets: boxs.slice(0, 10),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 2),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 20),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 4),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500,
    })
    .add({
        targets: boxs.slice(0, 50),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 1),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 30),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 7),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500,
    })
    .add({
        targets: boxs.slice(0, 40),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 9),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 70),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 10),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500,
    })
    .add({
        targets: boxs.slice(0, 100),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 44),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 22),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 77),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500,
    })
    .add({
        targets: boxs.slice(0, 2),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 66),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 88),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 11),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500,
    })
    .add({
        targets: boxs.slice(0, 55),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 22),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 1),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 6),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500,
    })
    .add({
        // fast animation ends
        targets: boxs.slice(0, 15),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 500
    })
    .add({
        // color animation 2 starts
        targets: boxs.slice(0, 50),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
        ],
        delay: 1500,
        duration: 500
    })
    .add({
        targets: boxs.slice(0, 50),
        keyframes: [
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 24500,
        delay: 500
    })
    .add({
        targets: boxs.slice(0, 50),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 250
    })
    .add({
        targets: boxs.slice(0, 100),
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 250
    })
    .add({
        targets: boxs,
        keyframes: [
            {
                backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})`,
                boxShadow: '0 0 10px 1px black'
            },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            { backgroundColor: `rgb(${anime.random(0, 255)},${anime.random(0, 255)},${anime.random(0, 255)})` },
            {
                backgroundColor: bgColor,
                boxShadow: '0 0 0px 0px black'
            }
        ],
        duration: 31000,
        delay: 500
    })

playPauseButton.addEventListener('click', () => {
    var songName = document.getElementById('spectre');
    if (playPauseCnt === 0) {
        if(animationCnt == 0){
            boxScatter.play();
            animationCnt = 1;
        }
        boxColorChange.play();
        songName.play();
        playPauseCnt = 1;
        playPauseButton.innerHTML = 'pause';
    }
    else {
        boxColorChange.pause();
        songName.pause();
        playPauseCnt = 0;
        playPauseButton.innerHTML = 'play_arrow';
    }
});

function endBoxs() {
    anime({
        targets: ['.box'],
        translateX: 0,
        translateY: 0,
        easing: 'linear',
        duration: 1500
    })
}



