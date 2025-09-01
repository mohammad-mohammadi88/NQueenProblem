import { stdin as input, stdout as output } from "process";
import readline from "readline/promises";

import nQueenFn from "./nQueenFn.js";

// create readline interface
const rl = readline.createInterface({ input, output });

const nQueen = await nQueenFn(rl);

type Place = [number, number];
type FormatedPlace = [number, string];

const answers: Place[][] = [];
// array of letters
const rows = "abcdefghijklmnopqrstuvwxyz".split("");

const formatter = (arr: Place[][]): FormatedPlace[][] =>
    arr.map((item) =>
        item.map((place) => [
            place[0],
            rows?.[(place?.[1] as number) - 1] || "N/A",
        ])
    );

const solve = (
    row: number,
    cols: Set<number>,
    diag1: Set<number>,
    diag2: Set<number>,
    current: Place[]
) => {
    if (row > nQueen) {
        // add answer
        answers.push(current.map(([a, b]) => [a, b]));
        return;
    }

    for (let col = 1; col <= nQueen; col++) {
        if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col))
            continue;

        // add blocked
        cols.add(col);
        diag1.add(row - col);
        diag2.add(row + col);

        // add place
        current.push([row, col]);

        // next row
        solve(row + 1, cols, diag1, diag2, current);

        // backtrack
        current.pop();
        cols.delete(col);
        diag1.delete(row - col);
        diag2.delete(row + col);
    }
};

const main = () => {
    solve(1, new Set(), new Set(), new Set(), []);
    console.log("Total solutions:", answers.length);
    console.log(formatter(answers));
    rl.close();
};

main();
