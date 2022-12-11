export type Position = [x: number, y: number];

export type State = {
  knots: Position[];
  visited: Array<Array<boolean>>;
};

export const render = ({ knots, visited }: State) => {
  const map = visited.map((row) =>
    row.map((cellVisited) => cellVisited ? "#" : ".")
  ) as string[][];

  [...knots].reverse().forEach((pos, i) => {
    map[pos[1]][pos[0]] = i === knots.length - 1
      ? "H"
      : `${knots.length - 1 - i}`;
  });

  [...map].reverse().forEach((row) => console.log(row.join("")));
};

const moveHead = (pos: Position, direction: string): Position => {
  switch (direction) {
    case "L":
      return [pos[0] - 1, pos[1]];
    case "U":
      return [pos[0], pos[1] + 1];
    case "R":
      return [pos[0] + 1, pos[1]];
    case "D":
      return [pos[0], pos[1] - 1];
  }

  return pos;
};

const moveTail = (posH: Position, posT: Position): Position => {
  const dx = posH[0] - posT[0];
  const dy = posH[1] - posT[1];

  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  if (absDx === 2) {
    return [posT[0] + dx / absDx, posT[1] + (absDy > 0 ? dy / absDy : 0)];
  }

  if (absDy === 2) {
    return [posT[0] + (absDx > 0 ? dx / absDx : 0), posT[1] + dy / 2];
  }

  return posT;
};

const normalizeState = (
  state: State,
): State => {
  let { knots, visited } = state;
  let [head, ...tailKnots] = knots;

  // Add column to the left when x is negative
  if (head[0] === -1) {
    head = [head[0] + 1, head[1]];
    tailKnots = tailKnots.map((pos) => [pos[0] + 1, pos[1]]);

    visited = visited.map((row) => [false, ...row]);
  }

  // Add row to the bottom when y is negative
  if (head[1] === -1) {
    head = [head[0], head[1] + 1];
    tailKnots = tailKnots.map((pos) => [pos[0], pos[1] + 1]);

    visited = [new Array(visited[0].length).fill(false), ...visited];
  }

  // Add column to the right when x is greater than the current visited length
  if (head[0] === visited[0].length) {
    visited = visited.map((row) => [...row, false]);
  }

  // Add row to the top when y is greater than the current visited length
  if (head[1] === visited.length) {
    visited = [...visited, new Array(visited[0].length).fill(false)];
  }

  const tail = tailKnots[tailKnots.length - 1];

  visited = visited.map((row, y) =>
    y === tail[1] ? row.map((cell, x) => x === tail[0] ? true : cell) : row
  );

  knots = [head, ...tailKnots];

  return { knots, visited };
};

export const move = (state: State, inputLine: string): State => {
  const [direction, timesStr] = inputLine.split(" ");
  const times = parseInt(timesStr);
  let { knots, visited } = state;

  for (let i = 0; i < times; i++) {
    let [head, ...tailKnots] = knots;
    head = moveHead(head, direction);
    tailKnots = tailKnots.map((pos, i) =>
      moveTail(i === 0 ? head : tailKnots[i - 1], pos)
    );

    const normalized = normalizeState({ knots: [head, ...tailKnots], visited });
    knots = normalized.knots;
    visited = normalized.visited;
  }

  return {
    knots,
    visited,
  };
};

export const countVisited = (visited: State["visited"]) => {
  return visited.reduce(
    (count, row) => count + row.filter((cell) => cell).length,
    0,
  );
};
