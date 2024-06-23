import inquirer from "inquirer";
import chalk from "chalk";
const text = "START GAME";
const terminalWidth = 80;
const padding = Math.floor((terminalWidth - text.length) / 2);
const paddedText = " ".repeat(padding) + text;
console.log(chalk.red(paddedText));
const gameStatus = {
    hero: "",
    villian: "",
    heroHealth: 100,
    villianHealth: 100
};
async function gameLoop() {
    // Initial prompts
    const game = await inquirer.prompt([
        {
            name: "hero",
            message: "Enter Your Hero Name:",
            type: "input"
        },
        {
            name: "villian",
            message: "Select The Enemy You Want To Fight:",
            type: "list",
            choices: ["Loki", "Joker", "Thanos"]
        }
    ]);
    gameStatus.hero = game.hero;
    gameStatus.villian = game.villian;
    console.log(chalk.blue(`\n${gameStatus.hero} vs ${gameStatus.villian} - Let the battle begin!\n`));
    // Game loop
    while (gameStatus.heroHealth > 0 && gameStatus.villianHealth > 0) {
        const action = await inquirer.prompt([
            {
                name: "action",
                message: "Choose An Action:",
                type: "list",
                choices: ["Attack", "Defend"]
            }
        ]);
        const heroAction = action.action;
        const villianAction = Math.random() < 0.5 ? "Attack" : "Defend";
        console.log(chalk.green(`${gameStatus.hero} chooses to ${heroAction}`));
        console.log(chalk.red(`${gameStatus.villian} chooses to ${villianAction}`));
        if (heroAction === "Attack") {
            if (villianAction === "Defend") {
                console.log(chalk.yellow(`${gameStatus.villian} defends the attack!`));
            }
            else {
                const damage = Math.floor(Math.random() * 20) + 1;
                gameStatus.villianHealth -= damage;
                console.log(chalk.red(`${gameStatus.villian} takes ${damage} damage!`));
            }
        }
        if (villianAction === "Attack") {
            const damage = Math.floor(Math.random() * 20) + 1;
            gameStatus.heroHealth -= damage;
            console.log(chalk.red(`${gameStatus.hero} takes ${damage} damage!`));
        }
        console.log(chalk.blue(`\n${gameStatus.hero} Health: ${gameStatus.heroHealth}`));
        console.log(chalk.red(`${gameStatus.villian} Health: ${gameStatus.villianHealth}\n`));
        if (gameStatus.heroHealth <= 0) {
            console.log(chalk.red(`\n${gameStatus.hero} has been defeated! ${gameStatus.villian} wins!\n`));
            break;
        }
        else if (gameStatus.villianHealth <= 0) {
            console.log(chalk.green(`\n${gameStatus.villian} has been defeated! ${gameStatus.hero} wins!\n`));
            break;
        }
    }
}
gameLoop();
