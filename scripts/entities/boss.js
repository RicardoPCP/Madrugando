import ScienceQuestions from "../data/questions/science/questions.js";
import EnglishQuestions from "../data/questions/english/questions.js";
import PortugueseQuestions from "../data/questions/portuguese/questions.js";
import GeographyQuestions from "../data/questions/geography/questions.js";
import HistoryQuestions from "../data/questions/history/questions.js";


const Questions = {

    science: ScienceQuestions,
    english: EnglishQuestions,
    portuguese: PortugueseQuestions,
    geography: GeographyQuestions,
    history: HistoryQuestions

};


export class Boss {

    constructor({ x, y, category }) {

        this.x = x;
        this.y = y;

        this.category = category;

        this.question = this.getRandomQuestion();

        this.alive = true;

        this.active = false;

        this.fade = 0;

        this.introStarted = false;
        this.introFinished = false;

        this.optionRects = [];

        this.wrongOptions = new Set();

    }


    getRandomQuestion() {

        const questions =
            Questions[this.category];

        const index =
            Math.floor(
                Math.random() * questions.length
            );

        return questions[index];

    }


    startIntro() {

        if (this.introStarted)
            return;

        this.introStarted = true;

        const sound =
            new Audio("../assets/sounds/boss.mp3");

        sound.play();

    }


    update(deltaTime) {

        if (!this.introStarted)
            return;


        if (!this.introFinished) {

            this.fade += 0.02 * (deltaTime / 16);


            if (this.fade >= 1) {

                this.fade = 1;

                this.introFinished = true;

                this.active = true;

            }

        }

    }


            draw(ctx) {

        if (!this.introStarted)
            return;

        if (this.fade > 0) {

            ctx.fillStyle =
                `rgba(5, 8, 20, ${this.fade * 0.85})`;

            ctx.fillRect(
                0,
                0,
                ctx.canvas.width,
                ctx.canvas.height
            );
        }

        if (!this.active)
            return;

        const centerX =
            ctx.canvas.width / 2;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.font = "bold 28px Arial";
        ctx.fillStyle = "#f5f3ff";

        ctx.fillText(
            "BOSS",
            centerX,
            250
        );

        const boxWidth = 700;
        const boxHeight = 100;

        const boxX =
            centerX - boxWidth / 2;

        const boxY = 300;

        ctx.fillStyle =
            "rgba(15, 20, 45, 0.95)";

        ctx.strokeStyle =
            "rgba(160, 170, 230, 0.35)";

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.roundRect(
            boxX,
            boxY,
            boxWidth,
            boxHeight,
            14
        );

        ctx.fill();
        ctx.stroke();

        ctx.font = "20px Arial";
        ctx.fillStyle = "#f5f3ff";

        ctx.fillText(
            this.question.question,
            centerX,
            boxY + boxHeight / 2
        );

        const optionWidth = 300;
        const optionHeight = 50;
        const gap = 16;
        const startY = 425;

        this.optionRects = [];

        this.question.options.forEach(
            (option, index) => {

                const column =
                    index % 2;

                const row =
                    Math.floor(index / 2);

                const x =
                    centerX -
                    optionWidth -
                    gap / 2 +
                    column *
                    (optionWidth + gap);

                const y =
                    startY +
                    row *
                    (optionHeight + gap);

                this.optionRects.push({
                    x: x,
                    y: y,
                    width: optionWidth,
                    height: optionHeight,
                    index: index
                });

                if (this.wrongOptions.has(index)) {

                    ctx.fillStyle =
                        "rgba(180, 45, 45, 0.95)";

                } else {

                    ctx.fillStyle =
                        "rgba(35, 59, 83, 0.95)";
                }

                ctx.strokeStyle =
                    "rgba(160, 170, 230, 0.35)";

                ctx.lineWidth = 2;

                ctx.beginPath();

                ctx.roundRect(
                    x,
                    y,
                    optionWidth,
                    optionHeight,
                    10
                );

                ctx.fill();
                ctx.stroke();

                ctx.font = "17px Arial";
                ctx.fillStyle = "#f5f3ff";

                ctx.fillText(
                    `${index + 1}. ${option}`,
                    x + optionWidth / 2,
                    y + optionHeight / 2
                );
            }
        );

        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
    }

    handleClick(mouseX, mouseY) {

        if (!this.active)
            return null;

        for (const option of this.optionRects) {

            if (
                mouseX >= option.x &&
                mouseX <= option.x + option.width &&
                mouseY >= option.y &&
                mouseY <= option.y + option.height
            ) {

                if (this.wrongOptions.has(option.index)) {
                    return null;
                }

                if (
                    option.index ===
                    this.question.correctAnswer
                ) {

                    console.log("Resposta correta!");

                    this.kill();

                    return {
                        result: "correct"
                    };
                }

                console.log("Resposta incorreta!");

                this.wrongOptions.add(option.index);

                return {
                    result: "wrong"
                };
            }
        }

        return null;
    }


    kill() {

        this.alive = false;

        this.active = false;

    }


    isDead() {

        return !this.alive;

    }


    isActive() {

        return this.active;

    }

}