import { Scene } from "../assets/images/scenario/scene.js";
import { EnemyManager } from "./managers/EnemyManager.js";
import { EnemySpawner } from "./managers/EnemySpawner.js";
import { InputManager } from "./managers/InputManager.js";
import { InputBar } from "./ui/InputBar.js";
import ScoreManager from "./managers/ScoreManager.js";




export default class Game {


    constructor() {

        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.lastTime = 0;
        this.scene = new Scene();
        this.scoreManager = new ScoreManager();
        this.enemyManager = new EnemyManager(
            this.scoreManager,
            this.canvas.height
        );
        this.enemySpawner = new EnemySpawner(
            this.enemyManager, "medium",
            {
                canvasWidth: this.canvas.width,
                category: "science"
            }
        );
        this.inputManager = new InputManager(
            this.enemyManager,
            this.scoreManager
        );

        this.inputBar = new InputBar(
            this.inputManager,
            this.canvas);

    }


    start() {

        requestAnimationFrame(
            this.loop.bind(this)
        );

    }

    loop(timestamp) {


        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(
            this.loop.bind(this)
        );
    }



    update(deltaTime) {

        if (this.scoreManager.gameOverState) {
            return;
        }

        this.enemySpawner.update(deltaTime);
        this.enemyManager.update(deltaTime);
        this.inputManager.update(deltaTime);
        this.inputBar.update(deltaTime);

        if (this.scene.update) {

            this.scene.update(deltaTime);

        }
    }



    draw() {

        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        this.scene.render(
            ctx,
            width,
            height
        );

        this.enemyManager.draw(ctx);
        this.inputBar.draw(ctx);

    }
}