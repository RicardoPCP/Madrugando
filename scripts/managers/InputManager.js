export class InputManager {

    constructor(enemyManager, scoreManager, waveManager) {

        this.enemyManager = enemyManager;
        this.scoreManager = scoreManager;
        this.waveManager = waveManager;

        this.currentInput = "";
        this.state = "normal";
        this.stateTimer = 0;

        window.addEventListener(
            "keydown",
            this.handleInput.bind(this)
        );

    }


    update(deltaTime) {

        if (this.state === "normal") {
            return;
        }

        this.stateTimer -= deltaTime;

        if (this.stateTimer <= 0) {

            this.currentInput = "";
            this.state = "normal";

        }

    }


    handleInput(event) {

        if (this.state !== "normal") {
            return;
        }

        const key = event.key.toLowerCase();


        if (key === "backspace") {

            this.currentInput =
                this.currentInput.slice(0, -1);

            return;
        }


        if (key.length !== 1) {
            return;
        }


        if (/[a-zà-ÿ]/i.test(key)) {

            this.currentInput += key;

            this.checkWord();

        }

    }


    checkWord() {

        const possible =
            this.enemyManager.hasWordStartingWith(
                this.currentInput
            );

        // ERRO
        if (!possible) {

            this.state = "error";

            this.stateTimer = 90;

            return;
        }


        const result =
            this.enemyManager.processWord(
                this.currentInput
            );


        if (result.correct) {

            // Pontuação
            this.scoreManager.addScore(10);


            // Wave
            this.waveManager.wordCorrect();


            // ACERTO NORMAL
            this.currentInput = "";

            this.state = "success";

            this.stateTimer = 90;

        }
    }

    getInput() {

        return this.currentInput;

    }


    getState() {

        return this.state;

    }

    reset() {

        this.currentInput = "";
        this.state = "normal";
        this.stateTimer = 0;

    }

}

