export class InputManager {


    constructor(enemyManager) {

        this.enemyManager = enemyManager;

        this.currentInput = "";


        window.addEventListener(
            "keydown",
            this.handleInput.bind(this)
        );

    }



    handleInput(event) {


        const key = event.key.toLowerCase();



        if(key === "backspace") {


            this.currentInput =
            this.currentInput.slice(0, -1);


            return;

        }



        // ignora teclas especiais
        if(key.length !== 1){

            return;

        }



        if(/[a-zà-ÿ]/i.test(key)){


            this.currentInput += key;


            this.checkWord();

        }

    }



    checkWord(){


        // Verifica se existe algum inimigo com essa sequência
        const possible = this.enemyManager.enemies.some(enemy =>

            enemy.word.startsWith(this.currentInput)

        );



        // Se não existe nenhuma palavra começando assim
        if(!possible){


            this.currentInput = "";


            return;

        }



        // Se completou a palavra
        const killed =
        this.enemyManager.killByWord(
            this.currentInput
        );



        if(killed){


            console.log(
                "Inimigo derrotado:",
                this.currentInput
            );


            this.currentInput = "";

        }

    }



    getInput(){

        return this.currentInput;

    }

}