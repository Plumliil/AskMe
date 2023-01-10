import inquirer from "inquirer";
import fs from "fs/promises";

const flags = [];
process.argv.forEach((arg) => {
  if (/^-/.test(arg)) {
    flags.push(arg.replaceAll("-", ""));
  }
});

console.log("What can I do for you?");

if (flags.includes("a") || flags.includes("add")) {
  addQuestion();
} else {
  askQuestion();
}

async function askQuestion() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "classify",
      message: "classify",
    },
  ]);
  const iptValue = answer.classify.split(" ");
  if (iptValue[0] === "expreg") {
    const data = await fs.readFile("./expRegs.json");
    const parsedData = JSON.parse(data.toString());
    let res = parsedData.find((item) => {
      return item.name.toLowerCase() === iptValue[1].substring(2);
    });
    console.log(`\x1b[40m ${res.value} \x1b[0m`);
  }
}
function checkAnswer(input, answer) {
  if (input === answer) {
    console.log("that is right");
    return true;
  } else {
    console.log("not this time");
    return false;
  }
}
