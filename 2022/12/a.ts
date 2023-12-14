import { findShortestPath, parseMap, renderVisited } from "./shared.ts";

const input = await Deno.readTextFile("./input.txt");

const { current, goal, map } = parseMap(input.split("\n"));

const { distance, visited } = findShortestPath(current, goal, map);

renderVisited(visited, map);

console.log(`The shortest path is at ${distance} steps`);
