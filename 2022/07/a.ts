import {
  Directory,
  findDirectorySizes,
  parseInputLine,
  printTree,
  State,
} from "./shared.ts";

const root = { name: "/", children: {} } as Directory;
const state: State = {
  tree: root,
  current: root,
};

const input = await Deno.readTextFile("./input.txt");
input.split("\n").forEach(parseInputLine(state));

printTree(state.tree);

const threshold = 100000;

const result = findDirectorySizes(root).directories.filter((dir) =>
  dir.size <= threshold
).reduce((acc, dir) => acc + dir.size, 0);

console.log(
  `The sum of total sizes of directories is ${result}`,
);
