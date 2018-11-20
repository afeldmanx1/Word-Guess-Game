var sportObject = {

    randomSport: "",
    sportsArray: ["BASKETBALL", "TENNIS", "FOOTBALL", "BASEBALL", "GOLF", "SOCCER"],
    sportsLetters: [],

    chosenLetter: "",
    userGuesses: [],

    incorrectGuesses: [],
    correctGuesses: [],
    correctGuessesOrder: [],

    toMatch: 0,
    toRepeat: 0,

    guessesRemaining: 10,
    loseCount: 0,
    winCount: 0,

    randomFind: function () {
        var random_num = Math.random() * 6;
        random_num = Math.floor(random_num);

        this.randomSport = this.sportsArray[random_num];
        this.sportsLetters = this.randomSport;
        
        this.userGuesses = [];
        this.incorrectGuesses = [];
        this.correctGuesses = [];
        this.correctGuessesOrder = [];
        this.guessesRemaining = 11;
    },

    repeat: function () {
        var letterRepeat = -1;

        for (var i = 0; i < this.userGuesses.length; i++) {
            if (this.chosenLetter === this.userGuesses[i]) {
                letterRepeat++;
            }
        }
        if (letterRepeat === 0) {
            this.toRepeat = false;
        }
        else {
            this.toRepeat = true;
        }
    },
    match: function () {
        var matchCount = 0;

        for (var i = 0; i < this.sportsLetters.length; i++) {
            if (this.chosenLetter === this.sportsLetters[i]) {
                matchCount++;
            }
        }
        if (matchCount === 0) {
            this.toMatch = false;
        }
        else {
            this.toMatch = true;
        }
    },
    matchrepeat: function () {
        if (this.toRepeat === true) {
            this.userGuesses.pop(this.chosenLetter);
        }
        if (this.toRepeat === false && this.toMatch === false) {
            this.incorrectGuesses.push(this.chosenLetter);
            this.guessesRemaining--;
        }
        if (this.toRepeat === false && this.toMatch === true) {
            this.correctGuesses.push(this.chosenLetter);
            this.guessesRemaining--;
        }
    },
    underline: function () {
        if (this.correctGuesses.length === 0) {
            for (var i = 0; i < this.sportsLetters.length; i++) {
                this.correctGuessesOrder[i] = "_";
            }
        }
        else {
            for (var i = 0; i < this.sportsLetters.length; i++) {
                if (this.correctGuessesOrder[i] != this.sportsLetters[i]) {
                    for (var j = 0; j < this.correctGuesses.length; j++) {
                        if (this.correctGuesses[j] === this.sportsLetters[i]) {
                            this.correctGuessesOrder[i] = this.sportsLetters[i];
                        }
                        else {
                            this.correctGuessesOrder[i] = "_";
                        }
                    }
                }
            }
        }

        document.getElementById("wins-losses").innerHTML = ("WINS: " + this.winCount + "  " + "LOSSES: " + this.loseCount);
        document.getElementById("word-displayed").innerHTML = this.correctGuessesOrder.join(" ");
        document.getElementById("guesses-remaining").innerHTML = this.guessesRemaining;
        document.getElementById("incorrect-letters-guessed").innerHTML = this.incorrectGuesses;

    },

    progression: function () {
        var counter = 0;
        for (var i = 0; i < this.sportsLetters.length; i++) {
            if (this.correctGuessesOrder[i] === this.sportsLetters[i]) {
                counter++;
            }
        }

        if (counter === this.sportsLetters.length) {
            alert("YOU WIN!");
            this.winCount++;
            this.randomFind();
        }

        if (this.guessesRemaining === 0) {
            alert("YOU LOSE!");
            this.loseCount++;
            this.randomFind();
        }
    }
}

var userStart = false;

document.onkeyup = function (event) {

    sportObject.chosenLetter = String.fromCharCode(event.keyCode).toUpperCase();

    if (sportObject.chosenLetter === " " && userStart === false) {
        sportObject.randomFind();
        userStart = true;
    }

    sportObject.userGuesses.push(sportObject.chosenLetter);
    sportObject.repeat();
    sportObject.match();
    sportObject.matchrepeat();
    sportObject.underline();
    sportObject.progression();
}
