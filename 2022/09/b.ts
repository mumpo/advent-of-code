import { countVisited, move, render, State } from "./shared.ts";

const input = await Deno.readTextFile("./input.txt");

const initialState: State = {
  knots: new Array(10).fill([0, 0]),
  visited: [[true]],
};

const finalState = input.split("\n").reduce(
  (state, line) => move(state, line),
  initialState,
);

render(finalState);

console.log(
  `The total number of visited cells is:`,
  countVisited(finalState.visited),
);
