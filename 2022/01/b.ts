// Treat this file as a module
export const x = "";

const input = await Deno.readTextFile("./input.txt");

let currentCalories = 0;

const top3: number[] = [];

const prefixedInput = `${input}\n`;

prefixedInput.split("\n").forEach((line) => {
  if (!line) {
    const insertAt = top3.findIndex((top) => top < currentCalories);
    if (insertAt != -1) {
      top3.splice(insertAt, 0, currentCalories);
      top3.pop();
    } else if (top3.length < 3) {
      top3.push(currentCalories);
    }

    currentCalories = 0;

    return;
  }

  currentCalories += parseInt(line);
});

console.log(
  `The amount of calories from the top 3 elfs is: ${
    top3.reduce((acc, calories) => acc + calories, 0)
  }`,
);
