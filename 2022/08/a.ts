import { parseTreesMatrix, range } from "./shared.ts";

// compareTrees returns true if the first tree is taller
const compareTrees = (
  matrix: number[][],
  x0: number,
  y0: number,
  x1: number,
  y1: number,
) => {
  return matrix[x0][y0] > matrix[x1][y1];
};

const isTreeVisible = (matrix: number[][], x: number, y: number) => {
  if (range(0, x - 1).every((i) => compareTrees(matrix, x, y, i, y))) {
    return true;
  }

  if (
    range(x + 1, matrix[y].length - 1).every((i) =>
      compareTrees(matrix, x, y, i, y)
    )
  ) {
    return true;
  }

  if (range(0, y - 1).every((j) => compareTrees(matrix, x, y, x, j))) {
    return true;
  }

  if (
    range(y + 1, matrix.length - 1).every((j) =>
      compareTrees(matrix, x, y, x, j)
    )
  ) {
    return true;
  }

  return false;
};

const input = await Deno.readTextFile("./input.txt");

const matrix = parseTreesMatrix(input);

const visible = matrix.reduce(
  (total, row, i) =>
    row.reduce(
      (total, _, j) => total + (isTreeVisible(matrix, i, j) ? 1 : 0),
      total,
    ),
  0,
);

console.log(`There are ${visible} visible trees`);
