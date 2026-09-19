export class PowerUp {
    constructor({ x, y, type, speed }) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.speed = speed;
        this.alive = true;
    }

    update(deltaTime) {
        this.x += this.speed * (deltaTime / 16);

        // Saiu da tela pela direita
        if (this.x > 1280 + 100) {
            this.kill();
        }
    }

    draw(ctx) {
        ctx.font = "32px Arial";

        const icons = {
            despertador: "⏰",
            gelo: "❄️",
            reverso: "🔄",
            duplicador: "✕2"
        };

        ctx.fillText(
            icons[this.type],
            this.x,
            this.y
        );
    }

    kill() {
        this.alive = false;
    }

    isDead() {
        return !this.alive;
    }
}