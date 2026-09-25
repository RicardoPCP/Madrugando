export class Enemy {

    constructor({ x, y, word, speed, type }) {

        this.x = x;
        this.y = y;
        this.word = word;
        this.speed = speed;
        this.type = type;
        this.alive = true;
        this.frozen = false;
        this.reversed = false;

    }


    update(deltaTime) {

        if (this.frozen) {
            return;
        }

        const direction =
            this.reversed ? -1 : 1;

        this.y +=
            this.speed *
            direction *
            (deltaTime / 16);

    }


    draw(ctx) {
        ctx.fillStyle = this.type === "scromblus"
            ? "limegreen"
            : "white";

        ctx.font = "20px Arial";
        ctx.fillText(this.word, this.x, this.y);
    }
    // Referente ao power-up Gelo, que congela os inimigos na tela;
    freeze() {

        this.frozen = true;

    }


    unfreeze() {

        this.frozen = false;

    }

    // Referente ao power-up Reverso, que inverte a direção dos inimigos na tela;
    reverse() {
        this.reversed = true;
    }

    unreverse() {
        this.reversed = false;
    }


    kill() {

        this.alive = false;

    }


    isDead() {

        return !this.alive;

    }
}