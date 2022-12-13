import { getMonkeyBusiness, parseMonkey } from "./shared.ts";

const input = await Deno.readTextFile("./input.txt");

const monkeys = input.split("Monkey").slice(1).map(parseMonkey);

const divisibleBy = monkeys.reduce(
  (acc, monkey) => acc * monkey.divisibleBy,
  1,
);

const worryFn = (level: number) =>
  level > divisibleBy ? level % divisibleBy : level;

console.log(
  "Monkey business score: ",
  getMonkeyBusiness(monkeys, worryFn, 10000),
);
