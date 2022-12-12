import { getMonkeyBusiness, parseMonkey } from "./shared.ts";

const input = await Deno.readTextFile("./input.txt");

const monkeys = input.split("Monkey").slice(1).map(parseMonkey);

console.log("Monkey business score: ", getMonkeyBusiness(monkeys, 20));
