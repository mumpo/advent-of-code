import { parseInput, printStacks } from "./a.ts";

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

const moveCrane = (stacks: string[][], action: Action) => {
  stacks[action.to - 1] = [
    ...stacks[action.from - 1].splice(0, action.move),
    ...stacks[action.to - 1],
  ];
};

const { stacks, actions } = parseInput(lines);

console.log("initial");
printStacks(stacks);

actions.forEach((action) => moveCrane(stacks, action));

printStacks(stacks);
console.log("result", stacks.map((stack) => stack[0]).join(""));
