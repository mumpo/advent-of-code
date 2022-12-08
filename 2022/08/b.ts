import { parseTreesMatrix, range } from "./shared.ts";

// compareTrees returns true if the second tree is taller or equal
const compareTrees = (
  matrix: number[][],
  x0: number,
  y0: number,
  x1: number,
  y1: number,
) => {
  return matrix[x0][y0] <= matrix[x1][y1];
};

export const getScenicScore = (matrix: number[][], x: number, y: number) => {
  let score = 1;

  const top =
    range(Math.max(x - 1, 0), 0).find((i) =>
      compareTrees(matrix, x, y, i, y)
    ) ??
      0;
  score *= x - top;

  const bottom =
    range(Math.min(x + 1, matrix.length - 1), matrix.length - 1).find((i) =>
      compareTrees(matrix, x, y, i, y)
    ) ?? matrix.length - 1;
  score *= bottom - x;

  const left =
    range(Math.max(y - 1, 0), 0).find((j) =>
      compareTrees(matrix, x, y, x, j)
    ) ??
      0;
  score *= y - left;

  const right =
    range(Math.min(y + 1, matrix[x].length - 1), matrix[x].length - 1).find((
      j,
    ) => compareTrees(matrix, x, y, x, j)) ?? matrix[x].length - 1;
  score *= right - y;

  return score;
};

const input = await Deno.readTextFile("./input.txt");

const matrix = parseTreesMatrix(input);

const maxScenicScore = matrix.reduce(
  (max, row, i) =>
    row.reduce(
      (max, _, j) => {
        const newMax = Math.max(max, getScenicScore(matrix, i, j));
        if (newMax !== max) {
          console.log("new max", newMax, i, j);
        }
        return newMax;
      },
      max,
    ),
  0,
);

console.log(`The max scenic score is ${maxScenicScore}`);
