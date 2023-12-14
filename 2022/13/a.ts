import { comparePackets } from "./shared.ts";

const input = await Deno.readTextFile("./input.txt");

const pairs = input.split("\n\n").map((pair) =>
  pair.split("\n").map((line) => JSON.parse(line))
);

const ordered = pairs.reduce(
  (sum, [left, right], i) => {
    return comparePackets(left, right) < 0 ? sum + i + 1 : sum;
  },
  0,
);

console.log(`The sum of indices of ordered pairs is:`, ordered);
