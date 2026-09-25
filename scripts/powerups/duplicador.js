export class Duplicador {

    constructor(scoreManager) {

        this.scoreManager = scoreManager;

        this.duration = 5000;
        this.timer = 0;
        this.active = false;

    }


    activate() {

        this.scoreManager.setMultiplier(2);

        this.timer = this.duration;
        this.active = true;

        console.log("✖️2 Duplicador ativado!");

    }


    update(deltaTime) {

        if (!this.active) {
            return;
        }

        this.timer -= deltaTime;

        if (this.timer <= 0) {

            this.scoreManager.setMultiplier(1);

            this.timer = 0;
            this.active = false;

            console.log("✖️2 Duplicador acabou!");

        }

    }


    reset() {

        this.scoreManager.setMultiplier(1);

        this.timer = 0;
        this.active = false;

    }

}