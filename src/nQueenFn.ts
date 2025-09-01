import readline from "readline/promises";
import { stdout as output } from "process";

const clearLine = () => {
    output.moveCursor(0, -1);
    output.clearLine(1);
};
const nQueenFn = async (rl: readline.Interface): Promise<number> => {
    const n = (await rl.question("How many queens?(8) ")) || "8";

    // clear answer
    clearLine();

    // return count
    if (!isNaN(Number(n))) return Number(n);

    // recall
    console.log("please send a number");
    return await nQueenFn(rl);
};
export default nQueenFn;
