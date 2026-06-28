import { Scene } from "../assets/images/scenario/scene.js";

export default class Game {

    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.lastTime = 0;

        this.scene = new Scene();
    }

    start() {
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp) {

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.loop.bind(this));
    }

    update(deltaTime) {
        // Atualizações no futuro (física, etc)

        if (this.scene.update) {
            this.scene.update(deltaTime);
        }
    }

    draw() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.clearRect(0, 0, w, h);
        this.scene.render(ctx, w, h);
    }
}