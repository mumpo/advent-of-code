// Treat this file as a module
export const x = "";

const input = await Deno.readTextFile("./input.txt");

let currentIndex = 0;
let currentCalories = 0;

let maxCalories = 0;
let maxIndex = -1;

const prefixedInput = `${input}\n`;

prefixedInput.split("\n").forEach((line) => {
  if (!line) {
    if (currentCalories > maxCalories) {
      maxIndex = currentIndex;
      maxCalories = currentCalories;
    }

    currentIndex += 1;
    currentCalories = 0;

    return;
  }

  currentCalories += parseInt(line);
});

console.log(
  `The elf at ${maxIndex} position has the max calories: ${maxCalories}`,
);
