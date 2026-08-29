import HUD from "../ui/HUD.js";

export default class ScoreManager {
    constructor() {
        this.score = 0;
        this.lives = 3;
        console.log("Vidas iniciais:", this.lives);
        this.wordsCorrect = 0;
        this.wordsMissed = 0;

        this.gameOverState = false;


        this.hud = new HUD();

        this.updateHUD();
    }

    addScore(points = 10) {
        this.score += points;
        this.wordsCorrect++;

        this.updateHUD();
    }

    loseLife() {
        console.log("Antes:", this.lives);
        if (this.lives <= 0) return;

        this.lives--;

        console.log("Depois:", this.lives);

        this.wordsMissed++;

        this.updateHUD();

        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    updateHUD() {
        this.hud.setScore(this.score);
        this.hud.setLives(this.lives);
    }

    gameOver() {

        this.gameOverState = true;
        alert("Game Over");
    }
    getScore() {
        return this.score;
    }
    getWordsCorrect() {
        return this.wordsCorrect;
    }
    getLives() {
        return this.lives;
    }

    isGameOver() {
        return this.gameOverState;
    }
}