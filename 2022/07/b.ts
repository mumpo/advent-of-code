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

const totalSpace = 70000000;

const sizeResult = findDirectorySizes(root);
const unusedSpace = totalSpace - sizeResult.total;

const threshold = 30000000 - unusedSpace;

const sizes = sizeResult.directories.filter((dir) => dir.size >= threshold).map(
  (dir) => dir.size,
);

console.log(
  "The folder with minimum size to delete has size",
  Math.min(...sizes),
);
