export class Reverso {

    constructor(enemyManager) {

        this.enemyManager = enemyManager;

        this.duration = 5000;
        this.timer = 0;
        this.active = false;

    }


    activate() {

        this.enemyManager.reverseAll();

        this.timer = this.duration;
        this.active = true;

        console.log("🔄 Reverso ativado!");

    }


    update(deltaTime) {

        if (!this.active) {
            return;
        }

        // Garante que inimigos que surgirem enquanto o efeito estiver ativo também sejam invertidos.
        this.enemyManager.reverseAll();

        this.timer -= deltaTime;

        if (this.timer <= 0) {

            this.enemyManager.unreverseAll();

            this.timer = 0;
            this.active = false;

            console.log("🔄 Reverso acabou!");

        }

    }


    reset() {

        if (this.active) {
            this.enemyManager.unreverseAll();
        }

        this.timer = 0;
        this.active = false;

    }

}