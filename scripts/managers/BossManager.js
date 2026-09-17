import { Boss } from "../entities/boss.js";

export class BossManager {

    constructor() {

        this.boss = null;

    }


    spawn(category) {

        this.boss = new Boss({

            x: 640,
            y: 150,

            category: category

        });

        this.boss.startIntro();

    }


    update(deltaTime) {

        if (!this.boss)
            return;

        this.boss.update(deltaTime);

    }


    draw(ctx) {

        if (!this.boss)
            return;

        this.boss.draw(ctx);

    }


    hasBoss() {

        return this.boss !== null;

    }


    removeBoss() {

        this.boss = null;

    }

    handleClick(mouseX, mouseY) {

    if (!this.boss)
        return null;


    return this.boss.handleClick(
        mouseX,
        mouseY
    );

}

}