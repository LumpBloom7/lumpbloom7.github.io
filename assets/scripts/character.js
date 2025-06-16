clickedCount = 0;

const EyeState = {
    Open: 0,
    Closed: 1,
};
const BodyState = {
    Idle: 0,
    ArmsRaised: 1,
}

imageSet = null;

let stateInvalidated = true;

let eyeState = EyeState.Open;
function setEyeState(newState) {
    eyeState = newState;
    stateInvalidated = true;
}

let bodyState = BodyState.Idle;
let bodyInvalidated = true;
function setBodyState(newState) {
    bodyState = newState;
    stateInvalidated = true;
    bodyInvalidated = true;
}

waitTime = 0;

loaded = false;

targetElement = null;

function onLoad(element) {
    if (loaded) return;

    // Preload images
    imageSet = new Array();
    for (let eyeStateKey in EyeState) {
        const eyeState = EyeState[eyeStateKey];
        for (let bodyStateKey in BodyState) {
            const bodyState = BodyState[bodyStateKey];
            let i = new Image();
            i.src = `assets/images/${bodyState == BodyState.Idle ? "Idle" : "Arms"}${eyeState == EyeState.Closed ? "Closed" : "Open"}.webp`;
            imageSet.push(i);
        }
    }

    targetElement = element;
    targetElement.addEventListener("animationend", endAnimation);
    targetElement.addEventListener("animationcancel", endAnimation);

    setInterval(update, 1000 / 60) // 60 FPS

    loaded = true;
}

function endAnimation() {
    targetElement.classList.remove("bouncing");
}

function update() {
    // Handle blinking
    const blinkChance = 1 / 200;

    if (eyeState == EyeState.Open) {
        if (Math.random() <= blinkChance) {
            setEyeState(EyeState.Closed);
            waitTime = Math.floor(Math.random() * 5 + 5);
        }
    }
    else {
        if (--waitTime <= 0) 
            setEyeState(EyeState.Open);
    }

    if (!stateInvalidated) return;

    updateSprite();
}

function sayHi() {
    if (++clickedCount == 5) {
        setBodyState(BodyState.ArmsRaised);
        setTimeout(function () {
            setBodyState(BodyState.Idle);
            clickedCount = 0;
        }, 2000);
    }
}

function updateSprite() {
    if (bodyInvalidated) {
        endAnimation();
        targetElement.classList.add("bouncing");
    }

    targetElement.src = imageSet[eyeState * 2 + bodyState].src;

    stateInvalidated = false;
    bodyInvalidated = false;
}