export default class WaveManager {

    constructor() {

        this.currentWave = 1;
        this.wordsCorrect = 0;
        this.state = "playing";

    }

    wordCorrect() {

        if (this.state !== "playing") {
            return;
        }

        this.wordsCorrect++;

        console.log(
            `Wave ${this.currentWave}: ${this.wordsCorrect} / ${this.getWordsRequired()}`
        );

        if (this.wordsCorrect >= this.getWordsRequired()) {

            this.startQuestion();

        }

    }

    getWordsRequired() {

        return 15 + ((this.currentWave - 1) * 10);

    }

    getProgress() {

        return this.wordsCorrect / this.getWordsRequired();

    }

    startQuestion() {

        this.state = "question";

        console.log(
            `Wave ${this.currentWave} concluída!`
        );

        // Futuramente:
        // Hora da Questão

    }

    nextWave() {

        this.currentWave++;

        this.wordsCorrect = 0;

        this.state = "playing";

    }

    getWave() {

        return this.currentWave;

    }

    getWordsCorrect() {

        return this.wordsCorrect;

    }

    getState() {

        return this.state;

    }

}