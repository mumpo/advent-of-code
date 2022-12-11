import { cycle } from "./shared.ts";

const input = await Deno.readTextFile("./input.txt");

const history = input.split("\n").reduce(cycle, [1]);

const breakpoints = [20, 60, 100, 140, 180, 220];

const strenght = breakpoints.reduce(
  (sum, breakpoint) => sum + history[breakpoint - 1] * breakpoint,
  0,
);

console.log("The signal strenght is", strenght);
