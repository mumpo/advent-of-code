import chalk from "https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js";

export type Coordinates = { x: number; y: number };

export type State = {
  rocks: Set<string>;
  sand: Set<string>;
  currentSand?: Coordinates;
  minX: number;
  maxX: number;
  maxY: number;
  hasFloor?: boolean;
  isGameOver: boolean;
};

export const coordinatesToString = ({ x, y }: Coordinates) => `${x},${y}`;

export const range = (from: number, to: number) => {
  if (to < 0 || from < 0) return [];

  if (from === to) return [];
  if (from > to) {
    return [...Array(from + 1 - to).keys()].map((i) => from - i);
  }

  return [...Array(to + 1 - from).keys()].map((i) => i + from);
};

export const initStateFromInput = (input: string): State => {
  const rocks = new Set<string>();
  const sand = new Set<string>();

  let minX = 500;
  let maxX = 500;
  let maxY = 0;

  input.split("\n").forEach((line) => {
    const vertices = line.split(" -> ");
    vertices.forEach((vertex, i) => {
      if (i === vertices.length - 1) {
        return;
      }

      const [x0, y0] = [...vertex.split(",")].map((n) => parseInt(n));
      const [x1, y1] = [...(vertices[i + 1]).split(",")].map((n) =>
        parseInt(n)
      );

      range(x0, x1).forEach((x) => {
        rocks.add(coordinatesToString({ x, y: y0 }));

        minX = Math.min(x, minX);
        maxX = Math.max(x, maxX);
      });

      range(y0, y1).forEach((y) => {
        rocks.add(coordinatesToString({ x: x0, y }));

        maxY = Math.max(y, maxY);
      });
    });
  });

  return { rocks, sand, minX, maxX, maxY, isGameOver: false };
};

export const render = (
  { rocks, currentSand, sand, minX, maxX, maxY, hasFloor }: State,
) => {
  let result = "";

  if (hasFloor) {
    const allSandX = [...sand].map((sandPoint) =>
      parseInt(sandPoint.split(",")[0])
    );
    minX = Math.min(minX, ...allSandX);
    maxX = Math.max(maxX, ...allSandX);
  }

  for (let y = 0; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const tag = coordinatesToString({ x, y });

      let char = chalk.hex("#444444")("█");
      if (rocks.has(tag) || (y === maxY && hasFloor)) {
        char = chalk.red("█");
      } else if (sand.has(tag)) {
        char = chalk.yellow("▧");
      } else if (currentSand && currentSand.x === x && currentSand.y === y) {
        char = chalk.yellow("▼");
      }

      result += char;
    }

    result += "\n";
  }

  console.log(result);
};

const simulateCycle = (state: State): State => {
  const { rocks, maxY, hasFloor } = state;
  let { sand, currentSand } = state;
  if (!currentSand) {
    currentSand = { x: 500, y: 0 };
  }

  const isBlocked = ({ x, y }: Coordinates) => {
    if (hasFloor && y === maxY) {
      return true;
    }

    const tag = coordinatesToString({ x, y });
    return rocks.has(tag) || sand.has(tag);
  };

  if (isBlocked(currentSand)) {
    return { ...state, isGameOver: true };
  }

  const possibleSteps = [
    { x: currentSand.x, y: currentSand.y + 1 },
    { x: currentSand.x - 1, y: currentSand.y + 1 },
    { x: currentSand.x + 1, y: currentSand.y + 1 },
  ];

  const nextStep = possibleSteps.filter((step) => !isBlocked(step));
  if (!nextStep.length) {
    sand = new Set(sand);
    sand.add(coordinatesToString(currentSand));
    return { ...state, sand, currentSand: undefined };
  }

  currentSand = nextStep[0];
  if (currentSand.y > maxY) {
    return { ...state, isGameOver: true };
  }

  return { ...state, currentSand, sand };
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const simulate = async (initialState: State, shouldRender = false) => {
  let state = initialState;
  let i = 0;

  while (!state.isGameOver) {
    if (shouldRender) {
      console.clear();
      console.log("Render cycle", i++);
    }

    state = simulateCycle(state);

    if (shouldRender) {
      render(state);
      await sleep(20);
    }
  }

  return state;
};
