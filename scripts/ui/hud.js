export default class HUD {

    constructor() {

        this.score =
            document.getElementById("score");

        this.lives =
            document.getElementById("lives");

        this.level =
            document.getElementById("level");

        this.words =
            document.getElementById("words");

        this.waveNumber =
            document.getElementById("wave-number");

        this.progressFill =
            document.getElementById("progress-fill");

        this.progressText =
            document.getElementById("progress-text");
    }


    show() {

        const hud =
            document.getElementById("hud");

        if (hud) {

            hud.style.display = "";

        }

    }


    hide() {

        const hud =
            document.getElementById("hud");

        if (hud) {

            hud.style.display = "none";

        }

    }


    setScore(value) {

        if (this.score) {

            this.score.textContent = value;

        }

    }


    setLives(value) {

        if (this.lives) {

            this.lives.textContent =
                "❤️".repeat(value) +
                "🖤".repeat(3 - value);

        }

    }


    setLevel(value) {

        if (this.level) {

            this.level.textContent = value;

        }

    }


    setWords(value) {

        if (this.words) {

            this.words.textContent = value;

        }

    }


    setWave(wave) {

        if (this.waveNumber) {

            this.waveNumber.textContent =
                `WAVE ${wave}`;

        }

    }


    setProgress(current, required) {

        if (!this.progressFill ||
            !this.progressText) {

            return;

        }


        const percentage =
            (current / required) * 100;


        this.progressFill.style.width =
            `${percentage}%`;


        this.progressText.textContent =
            `${current} / ${required}`;

    }

}