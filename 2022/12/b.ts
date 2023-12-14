import {
  Coordinates,
  findShortestPath,
  parseMap,
  renderVisited,
} from "./shared.ts";

const input = await Deno.readTextFile("./input.txt");

const { goal, map } = parseMap(input.split("\n"));

const lowerPoints = map.reduce(
  (points, row, y) =>
    row.reduce(
      (points, node, x) => node === 0 ? [...points, { x, y }] : points,
      points,
    ),
  [] as Coordinates[],
);

const shortestTrail = lowerPoints.reduce(
  (shortest: ReturnType<typeof findShortestPath> | null, start) => {
    const result = findShortestPath(start, goal, map);
    if (result.distance === -1) {
      return shortest;
    }

    if (!shortest) {
      return result;
    }

    return result.distance < shortest.distance ? result : shortest;
  },
  null,
);

const { visited, distance } = shortestTrail;

renderVisited(visited, map);

console.log(`The shortest trail is at ${distance} steps`);
