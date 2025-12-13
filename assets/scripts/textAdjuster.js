
originalStrings = ["Plushie enjoyer", "Half-baked programmer", "Rhythm game enthusiast"];
newStrings = [];

descs = []

safeDescs = [
    "Rata bata",
    "Cutie pie",
    "Totally not an introvert",
    "Plushie hugger",
    "Half-baked programmer",
    "Rhythm game enthusiast",
    "Bullshit fake maimai implementer",
    "Asbestos free",
    "Debate and argument expert",
    "Fluent in yap-anese",
    "Resident twat",
    "Discord kitten",
    "Wacca player",
    "Maimai player",
    "Sentakki developer",
    "A bit arrogant",
    "14k DX rating"
]

XiaaDescs = [
    "Minh hater",
    "Container lover",
    "Xiaa's #1 girlfriend"
]

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}


function OnLoad() {
    timer = setInterval(update, 10)

    shuffle(safeDescs);

    let params = new URLSearchParams(document.location.search);

    let id = params.get("id");

    if (id == "004DF7C72C4179") {
        newStrings = XiaaDescs;
    }
    else {
        newStrings = safeDescs.slice(0, 3);
    }

    descs = [document.getElementById("desc1"), document.getElementById("desc2"), document.getElementById("desc3")]
}

allTextCleared = false;
allTextWritten = false;
waitTime = 3000;
function update() {
    if (waitTime > 0) {
        waitTime -= 25;
        return;
    }

    if (allTextCleared == false) {
        allTextCleared = true;


        for (let i = 0; i < 3; i++) {
            str = originalStrings[i];

            if (str.length > 1)
                allTextCleared = false;

            originalStrings[i] = str.substr(0, str.length - 1);
        }

        if (allTextCleared)
            waitTime = 200;
        else
            waitTime = Math.random() * 20 + 20;
    }

    if (allTextCleared && !allTextWritten) {
        allTextWritten = true;

        for (let i = 0; i < 3; i++) {
            str = newStrings[i];

            if (str.length > 1)
                allTextWritten = false;

            if (str.length == 0)
                continue;

            originalStrings[i] = originalStrings[i] + str[0];
            newStrings[i] = str.substr(1, str.length);
        }
        if (allTextWritten)
            waitTime = clearInterval(timer);
        else
            waitTime = Math.random() * 20 + 20;
    }

    for (let i = 0; i < 3; i++) {
        descs[i].innerHTML = originalStrings[i];
    }


}
