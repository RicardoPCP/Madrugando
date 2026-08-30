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


    killByWord(word) {

        const killedEnemies = [];

        this.enemies.forEach(enemy => {

            if (enemy.word === word) {

                enemy.kill();
                killedEnemies.push(enemy);

            }

        });

        return killedEnemies;

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

}