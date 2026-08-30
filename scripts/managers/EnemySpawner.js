import { createBoo } from "../entities/boo.js";


const DifficultyConfig = {

    easy: {

        spawnInterval: 3000,
        speed: 1,
        maxEnemies: 5,
        poolLevel: "easy"

    },

    medium: {

        spawnInterval: 2500,
        speed: 1.1,
        maxEnemies: 6,
        poolLevel: "medium"

    },

    hard: {

        spawnInterval: 2000,
        speed: 1.2,
        maxEnemies: 8,
        poolLevel: "medium"

    }

};



export class EnemySpawner {


    constructor(enemyManager, difficulty = "easy", config = {}) {

        this.enemyManager = enemyManager;

        this.canvasWidth =
            config.canvasWidth ?? 1280;

        this.enemyConfig = {

            category:
                config.category ?? "science",

            ...config.enemyConfig

        };

        this.setDifficulty(difficulty);

        this.timer = 0;

    }


    setDifficulty(level) {

        this.config =
            DifficultyConfig[level];

    }


    update(deltaTime) {

        this.timer += deltaTime;


        if (

            this.timer >=
                this.config.spawnInterval &&

            this.enemyManager.hasSpace(
                this.config.maxEnemies
            )

        ) {

            this.spawn();

            this.timer = 0;

        }

    }


    spawn() {

        const enemy = createBoo(

            this.randomX(),

            0,

            {

                speed:
                    this.config.speed,

                category:
                    this.enemyConfig.category,

                poolLevel:
                    this.config.poolLevel

            }

        );


        this.enemyManager.add(enemy);

    }


    randomX() {

        const margin = 50;


        return (

            Math.random() *

            (
                this.canvasWidth -
                margin * 2
            )

        ) + margin;

    }

}