import { PowerUp } from "../entities/PowerUp.js";

export class PowerUpManager {
    constructor(canvasWidth, canvasHeight) {
        this.powerUps = [];

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.timer = 0;

        // Por enquanto, apenas para teste
        this.powerUpInterval = 10000;

        this.types = [
            "despertador",
            "gelo",
            "reverso",
            "duplicador"
        ];
    }

    update(deltaTime) {
        this.timer += deltaTime;

        if (
            this.timer >= this.powerUpInterval &&
            this.powerUps.length === 0
        ) {
            this.spawn();
            this.timer = 0;
        }

        this.powerUps.forEach(powerUp => {
            powerUp.update(deltaTime);
        });

        this.removeDead();
    }

    spawn() {
        const type =
            this.types[
            Math.floor(
                Math.random() *
                this.types.length
            )
            ];

        const powerUp = new PowerUp({
            x: -50,
            y: this.canvasHeight / 2,
            type: type,
            speed: 2
        });

        this.powerUps.push(powerUp);

        console.log(
            "Power-up apareceu:",
            type
        );
    }

    draw(ctx) {
        this.powerUps.forEach(powerUp => {
            powerUp.draw(ctx);
        });
    }

    removeDead() {
        this.powerUps =
            this.powerUps.filter(
                powerUp => !powerUp.isDead()
            );
    }

    reset() {
        this.powerUps = [];
        this.timer = 0;
    }
}