import { initStateFromInput, simulate, State } from "./shared.ts";

const addFloor = (state: State): State => ({
  ...state,
  maxY: state.maxY + 2,
  hasFloor: true,
});

const input = await Deno.readTextFile("./input.txt");

const initialState = addFloor(initStateFromInput(input));

const finalState = await simulate(initialState, false);

console.log("Game over. Settled sand units:", finalState.sand.size);
