export class Despertador {

    constructor(enemyManager, enemySpawner) {

        this.enemyManager = enemyManager;
        this.enemySpawner = enemySpawner;

    }

    activate() {
        // Matando todos os inimigos na tela
        this.enemyManager.killAll();
        // Pausando o spawn de inimigos por 750ms
        this.enemySpawner.pauseSpawning(750);

        console.log("⏰ Despertador ativado!");

    }
}