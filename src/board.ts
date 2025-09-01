import { stdin as input, stdout as output } from "process";
import readline from "readline/promises";
import { styleText } from "node:util";

import nQueenFn from "./nQueenFn.js";

// create readline interface
const rl = readline.createInterface({ input, output });

const nQueen = await nQueenFn(rl);

const x = "abcdefghijklmnopqrstuvwxyz".split("");
console.log(styleText("greenBright", "Chess Board\n"));

const main = () => {
    console.log(
        "     ",
        styleText("bold", x.slice(0, nQueen).join("    ")),
        "\n"
    );
    const isEven = (num: number) => num % 2 === 0;
    for (let j = 1; j <= nQueen; j++) {
        const firstColor = isEven(j) ? "bgWhite" : "bgGray";
        const secondColor = isEven(j) ? "bgGray" : "bgWhite";
        const row = x
            .slice(0, nQueen)
            .map((_, i) =>
                styleText(isEven(i) ? firstColor : secondColor, "     ")
            )
            .join("");

        console.log(styleText("bold", String(j)), " ", row);
        console.log("   ", row);
    }
};

main();
rl.close();
