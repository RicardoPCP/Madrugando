export class Enemy {

    constructor({ x, y, word, speed, type }) {
        this.x = x;
        this.y = y;

        this.word = word;
        this.typed = "";

        this.speed = speed;

        this.type = type;

        this.alive = true;
    }

    update(deltaTime) {
        this.y += this.speed * (deltaTime / 16);
    }

    draw(ctx) {
        ctx.font = "20px Arial";

        ctx.fillStyle = "white";
        ctx.fillText(this.word, this.x, this.y);

        ctx.fillStyle = "red";
        ctx.fillText(this.typed, this.x, this.y);
    }

    takeDamage(input) {
        if (this.word.startsWith(input)) {
            this.typed = input;
            return true;
        }
        return false;
    }

    isDead() {
        return this.typed === this.word;
    }
}