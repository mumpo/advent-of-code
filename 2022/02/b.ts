// Treat this file as a module
export const x = "";

const input = await Deno.readTextFile("./input.txt");

/**
 * 1. Rock
 * 2. Paper
 * 3. Scissors
 *
 * Rock (1) - Paper (2) -> Win
 * Rock (1) - Scissors (3) -> Loss
 * Paper (2) - Rock (1) -> Loss
 * Paper (2) - Scissors (3) -> Win
 * Scissors (3) - Rock (1) -> Win
 * Scissors (3) - Paper (2) -> Loss
 */

const scoresA: Record<string, number> = {
  A: 0,
  B: 1,
  C: 2,
};

const outcomes: Record<string, number> = {
  X: -1,
  Y: 0,
  Z: 1,
};

const scoreB = (scoreA: number, outcome: number) => {
  const outcomeScore = 3 + (outcome * 3);
  const playB = scoreA + outcome;
  const playScore = playB < 0 ? playB + 3 : playB % 3;

  return outcomeScore + playScore + 1;
};

const totalScore = input.split("\n").reduce((accumScore, line) => {
  const [playA, playB] = line.split(" ");

  return accumScore + scoreB(scoresA[playA], outcomes[playB]);
}, 0);

console.log("The total score is", totalScore);
