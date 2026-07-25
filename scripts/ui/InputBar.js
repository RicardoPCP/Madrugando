export class InputBar {

    constructor(inputManager, canvas) {

        this.inputManager = inputManager;
        this.canvas = canvas;
        this.height = 70;
        this.cursorVisible = true;
        this.cursorTimer = 0;

    }

    update(deltaTime){

        this.cursorTimer += deltaTime;

        if(this.cursorTimer >= 500){

            this.cursorVisible = !this.cursorVisible;
            this.cursorTimer = 0;

        }
    }

    getRainbowColor(){

        const colors = [
            "#FF0000",
            "#FF7F00",
            "#FFFF00",
            "#00FF00",
            "#00BFFF",
            "#8A2BE2"
        ];

        return colors[
            Math.floor(Date.now() / 50) % colors.length
        ];

    }

    draw(ctx) {

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(
            0,
            this.canvas.height - this.height,
            this.canvas.width,
            this.height
        );

        ctx.strokeStyle = "#D0D0D0";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(
            0,
            this.canvas.height - this.height
        );
        ctx.lineTo(
            this.canvas.width,
            this.canvas.height - this.height
        );
        ctx.stroke();

        switch(this.inputManager.getState()){

            case "success":
                ctx.fillStyle = "#32CD32";
                break;

            case "combo":
                ctx.fillStyle = this.getRainbowColor();
                break;

            case "error":
                ctx.fillStyle = "#E53935";
                break;

            default:
                ctx.fillStyle = "#000000";
                break;

        }

        ctx.font = "28px Arial";

        const text = this.inputManager.getInput();

        ctx.fillText(
            text,
            25,
            this.canvas.height - 25
        );

        if(this.cursorVisible){

            ctx.fillStyle = "#000000";

            const x =
                25 + ctx.measureText(text).width;

            ctx.fillText(
                "|",
                x + 2,
                this.canvas.height - 25
            );
        }
    }
}