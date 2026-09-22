
import { createBoo } from "../entities/boo.js";
import { createScromblus } from "../entities/scromblus.js";

export const DifficultyConfig = {

    easy: {
        spawnInterval: 3000,
        speed: 1,
        maxEnemies: 3,
        poolLevel: "easy",
        lives: 3

    },
    medium: {
        spawnInterval: 2500,
        speed: 1.1,
        maxEnemies: 5,
        poolLevel: "medium",
        lives: 3

    },
    hard: {
        spawnInterval: 2000,
        speed: 1.2,
        maxEnemies: 7,
        poolLevel: "medium",
        lives: 2

    }
};

export class EnemySpawner {
    constructor(
        enemyManager,
        difficulty = "easy",
        config = {},
        waveManager
    ) {
        this.enemyManager = enemyManager;
        this.waveManager = waveManager;

        this.canvasWidth =
            config.canvasWidth ?? 1280;

        this.enemyConfig = {
            category: config.category ?? "science",
            ...config.enemyConfig
        };

        this.setDifficulty(difficulty);

        this.timer = 0;

        // Controle dos Scromblus
        this.scromblusTimer = 0;
        this.scromblusInterval = 10000;

        this.currentWave = 1;
        this.scromblusSpawned = 0;
    }

    setDifficulty(level) {
        this.config = DifficultyConfig[level];
    }

    update(deltaTime) {
        // Detecta mudança de wave
        const wave = this.waveManager.getWave();

        if (wave !== this.currentWave) {
            this.currentWave = wave;
            this.scromblusSpawned = 0;
            this.scromblusTimer = 0;
        }

        // Geração normal de Boos
        this.timer += deltaTime;

        if (
            this.timer >= this.config.spawnInterval &&
            this.enemyManager.hasSpace(
                this.config.maxEnemies
            )
        ) {
            this.spawn();
            this.timer = 0;
        }

        // Geração de Scromblus
        this.scromblusTimer += deltaTime;

        const maxScromblus = this.currentWave;

        if (
            this.scromblusSpawned < maxScromblus &&
            !this.enemyManager.hasScromblus() &&
            this.scromblusTimer >= this.scromblusInterval &&
            this.enemyManager.hasSpace(
                this.config.maxEnemies
            )
        ) {
            this.spawnScromblus();
            this.scromblusSpawned++;
            this.scromblusTimer = 0;
        }
    }

    spawn() {
        const enemy = createBoo(
            this.randomX(),
            0,
            {
                speed: this.config.speed,
                category: this.enemyConfig.category,
                poolLevel: this.config.poolLevel
            }
        );

        this.enemyManager.add(enemy);
    }

    spawnScromblus() {
        const enemy = createScromblus(
            this.randomX(),
            0,
            {
                speed: this.config.speed,
                category: this.enemyConfig.category
            }
        );

        this.enemyManager.add(enemy);

        console.log(
            `Scromblus ${this.scromblusSpawned + 1} de ${this.currentWave} na Wave ${this.currentWave}`
        );
    }

    randomX() {
        const margin = 100;

        return (
            Math.random() *
            (this.canvasWidth - margin * 2)
        ) + margin;
    }

    reset() {
        this.timer = 0;
        this.scromblusTimer = 0;
        this.currentWave = 1;
        this.scromblusSpawned = 0;
    }

    setCategory(category) {
        this.enemyConfig.category = category;
    }

}