import { Enemy } from "./enemy.js";
import WordPools from "../data/wordpools.js";

export function createScromblus(x, y, config) {

    const {
        category = "science",
        speed = 1.1
    } = config;

    const pool =
        WordPools.boo[category].medium;

    const words = [];

    while (words.length < 3) {

        const word =
            pool[Math.floor(Math.random() * pool.length)];

        if (!words.includes(word)) {
            words.push(word);
        }
    }

    const scromblus = new Enemy({
        x,
        y,
        word: words[0],
        speed,
        type: "scromblus"
    });

    scromblus.words = words;
    scromblus.currentWordIndex = 0;

    scromblus.advanceWord = function () {

        this.currentWordIndex++;

        if (
            this.currentWordIndex >=
            this.words.length
        ) {

            this.kill();

            return true;
        }

        this.word =
            this.words[this.currentWordIndex];

        return false;
    };

    return scromblus;
}