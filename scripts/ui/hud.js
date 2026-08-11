export default class HUD {

    constructor() {
        this.score = document.getElementById("score");
        this.lives = document.getElementById("lives");
        this.level = document.getElementById("level");
        this.words = document.getElementById("words");
    }

    setScore(value) {
        this.score.textContent = value;
    }

    setLives(value) {
        this.lives.textContent =
            "❤️".repeat(value) +
            "🖤".repeat(3 - value);

    }

    setLevel(value) {
        if (this.level)
            this.level.textContent = value;
    }

    setWords(value) {
        if (this.words)
            this.words.textContent = value;
    }
}