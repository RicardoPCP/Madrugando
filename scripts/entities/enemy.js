export class Enemy {

    constructor({ x, y, word, speed, type }) {

        this.x = x;
        this.y = y;
        this.word = word;
        this.speed = speed;
        this.type = type;
        this.alive = true;

    }


    update(deltaTime) {

        this.y += this.speed * (deltaTime / 16);

    }


    draw(ctx) {
        ctx.fillStyle = this.type === "scromblus"
            ? "limegreen"
            : "white";

        ctx.font = "20px Arial";
        ctx.fillText(this.word, this.x, this.y);
    }


    kill() {

        this.alive = false;

    }


    isDead() {

        return !this.alive;

    }
}