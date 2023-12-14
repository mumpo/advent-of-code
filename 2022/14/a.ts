import { initStateFromInput, simulate } from "./shared.ts";

const input = await Deno.readTextFile("./input.txt");

const initialState = initStateFromInput(input);

const finalState = await simulate(initialState, false);

console.log("Game over. Settled sand units:", finalState.sand.size);
