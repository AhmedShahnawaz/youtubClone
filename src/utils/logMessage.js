import chalk from "chalk";

export const successLog = (message, data) => {
    return console.log(chalk.bold.greenBright(`${"\u2713"} SUCCESS:`), chalk.greenBright(message), chalk.whiteBright(data));
}

export const warningLog = (message, data) => {
    console.log(chalk.bold.yellowBright(`${"\u26a0"} WAENING:`), chalk.yellowBright(message), chalk.whiteBright(data));
}

export const errorLog = (message, data) => {
    console.log(chalk.bold.redBright(` ${"\u26D4"} ERROR:`), chalk.redBright(message), chalk.whiteBright(data));
}