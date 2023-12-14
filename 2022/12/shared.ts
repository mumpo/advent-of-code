export type Coordinates = { x: number; y: number };

const charOffset = "a".charCodeAt(0);

type ParseMapResult = {
  current: Coordinates;
  goal: Coordinates;
  map: number[][];
};

export const parseMap = (lines: string[]): ParseMapResult => {
  let current: Coordinates;
  let goal: Coordinates;

  const map = lines.map((line, y) =>
    [...line].map((char, x) => {
      switch (char) {
        case "S":
          current = { x, y };
          return "a".charCodeAt(0) - charOffset;
        case "E":
          goal = { x, y };
          return "z".charCodeAt(0) - charOffset;
        default:
          return char.charCodeAt(0) - charOffset;
      }
    })
  );

  return { current, goal, map };
};

const getNodeId = (node: Coordinates) => `${node.x}-${node.y}`;

export const findShortestPath = (
  start: Coordinates,
  goal: Coordinates,
  map: number[][],
) => {
  const queue = [
    { node: start, distance: 0 },
  ];

  const visited = new Set<string>();
  visited.add(getNodeId(start));

  const goalId = getNodeId(goal);

  while (queue.length > 0) {
    const { node, distance } = queue.shift();
    const nodeId = getNodeId(node);

    if (nodeId === goalId) {
      return { distance, visited };
    }

    const possibleSteps: Coordinates[] = [];
    if (node.x > 0) {
      possibleSteps.push({ x: node.x - 1, y: node.y });
    }
    if (node.x < map[0].length - 1) {
      possibleSteps.push({ x: node.x + 1, y: node.y });
    }
    if (node.y > 0) {
      possibleSteps.push({ x: node.x, y: node.y - 1 });
    }
    if (node.y < map.length - 1) {
      possibleSteps.push({ x: node.x, y: node.y + 1 });
    }

    possibleSteps.filter((step) => {
      const diffElevation = map[step.y][step.x] - map[node.y][node.x];

      if (diffElevation > 1) {
        return false;
      }

      return !visited.has(getNodeId(step));
    }).forEach((step) => {
      const stepId = getNodeId(step);
      queue.push({ node: step, distance: distance + 1 });
      visited.add(stepId);
    });
  }

  return { distance: -1, visited };
};

export const renderVisited = (visited: Set<string>, map: number[][]) => {
  const pathMap = map.map((row) =>
    row.map((node) => String.fromCharCode("a".charCodeAt(0) + node))
  );
  for (const nodeId of visited) {
    const [x, y] = nodeId.split("-");
    pathMap[parseInt(y)][parseInt(x)] = ".";
  }

  pathMap.forEach((row) => console.log(row.join("")));
};
