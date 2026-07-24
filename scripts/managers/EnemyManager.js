export class EnemyManager {

    constructor(){

        this.enemies = [];
    }


    add(enemy){

        this.enemies.push(enemy);
    }


    update(deltaTime){

        this.enemies.forEach(enemy => {

            enemy.update(deltaTime);

        });


        this.removeDead();
    }


    draw(ctx){

        this.enemies.forEach(enemy => {

            enemy.draw(ctx);
        });

    }


    killByWord(word){

        const enemy = this.enemies.find(enemy =>
            enemy.word === word
        );


        if(enemy){

            enemy.kill();

            return true;

        }


        return false;

    }


    hasSpace(maxEnemies){

        return this.enemies.length < maxEnemies;

    }


    removeDead(){

        this.enemies =
        this.enemies.filter(enemy => !enemy.isDead());

    }

}