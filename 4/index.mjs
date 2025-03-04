import chalk from "chalk";
const log = console.log;
log(`
CPU: ${chalk.red("90%")}
RAM: ${chalk.green("40%")}
DISK: ${chalk.yellow("70%")}
`);
const warning = chalk.hex("#FFA500"); // Orange color

console.log(warning("Warning!"));
console.log(chalk.blue("Hello, world!"));
console.log(chalk.red.bold("This is an error message."));
console.log(chalk.green.underline("This is a success message."));
log(chalk.rgb(123, 45, 67).underline("Underlined reddish color"));
log(chalk.hex("#DEADED").bold("Bold gray!"));
