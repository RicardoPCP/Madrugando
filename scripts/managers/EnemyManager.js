export class EnemyManager {

    constructor(scoreManager, canvasHeight) {

        this.enemies = [];
        this.scoreManager = scoreManager;
        this.canvasHeight = canvasHeight;

    }


    add(enemy) {

        this.enemies.push(enemy);

    }


    update(deltaTime) {

        this.enemies.forEach(enemy => {

            enemy.update(deltaTime);

            if (enemy.y >= this.canvasHeight - 20) {

                enemy.kill();
                this.scoreManager.loseLife();

            }

        });

        this.removeDead();

    }


    draw(ctx) {

        this.enemies.forEach(enemy => {

            enemy.draw(ctx);

        });

    }


    processWord(word) {

        const result = {
            correct: false,
            killed: false,
            enemy: null
        };

        this.enemies.forEach(enemy => {

            if (enemy.word !== word) {
                return;
            }

            result.correct = true;
            result.enemy = enemy;

            if (enemy.type === "scromblus") {

                const completed =
                    enemy.advanceWord();

                result.killed = completed;

            } else {

                enemy.kill();

                result.killed = true;

            }

        });

        return result;
    }


    hasSpace(maxEnemies) {

        return this.enemies.length < maxEnemies;

    }


    removeDead() {

        this.enemies =
            this.enemies.filter(enemy => !enemy.isDead());

    }

    hasWordStartingWith(prefix) {

        return this.enemies.some(enemy =>
            enemy.word.startsWith(prefix)
        );

    }

    reset() {

        this.enemies = [];

    }
    hasScromblus() {

        return this.enemies.some(
            enemy => enemy.type === "scromblus"
        );

    }

}