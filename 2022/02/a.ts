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
  A: 1,
  B: 2,
  C: 3,
};

const scoresB: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};

// Compare function for scores (can be used to sort)
// - return 0 if scores are equal
// - return 1 if A wins
// - return -1 if A loses
const compare = (scoreA: number, scoreB: number) => {
  if (scoreA === scoreB) {
    return 0;
  }

  const diff = scoreA - scoreB;

  if (Math.abs(diff) === 1) {
    return diff;
  }

  return diff > 0 ? -1 : 1;
};

const totalScore = input.split("\n").reduce((accumScore, line) => {
  const [playA, playB] = line.split(" ");

  const result = compare(scoresA[playA], scoresB[playB]);

  return accumScore + scoresB[playB] + (-result * 3) + 3;
}, 0);

console.log("The total score is", totalScore);
