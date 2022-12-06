export type Action = {
  move: number;
  from: number;
  to: number;
};

export const parseInput = (lines: string[]) => {
  const stacks: string[][] = [];
  const stacksPattern = /((\[(.)\])|(\s{3}))/g;
  const endPattern = /^[1-9\s]+$/g;

  const chunkSize = 3;

  let lineIndex = 0;
  for (const line of lines) {
    if (line.match(endPattern)) {
      break;
    }

    let columnIndex = 0;
    for (let i = 0; i < line.length; i += chunkSize + 1) {
      const chunk = line.slice(i, i + chunkSize);

      if (lineIndex === 0) {
        stacks.push([]);
      }

      if (chunk.trim() !== "") {
        stacks[columnIndex].push(chunk.slice(1, 2));
      }

      columnIndex++;
    }

    lineIndex++;
  }

  const actionRegex = /^move (\d*) from (\d*) to (\d*)$/;

  const actions = lines.slice(lineIndex + 2).map((line) => {
    const match = line.match(actionRegex);
    if (!match) {
      return null;
    }

    return {
      move: parseInt(match[1]),
      from: parseInt(match[2]),
      to: parseInt(match[3]),
    };
  }).filter((action) => action !== null) as Action[];

  return { stacks, actions };
};

export const printStacks = (stacks: string[][]) => {
  const rows = Math.max(...stacks.map((stack) => stack.length));

  for (let i = 0; i < rows; i++) {
    const line = stacks.map((
      stack,
    ) => (rows - i <= stack.length
      ? `[${stack[stack.length + i - rows]}]`
      : "   ")
    );

    console.log(line.join(" "));
  }

  console.log(
    new Array(stacks.length).fill(1).map((_, i) => ` ${i + 1} `).join(" "),
  );
};

const moveCrane = (stacks: string[][], action: Action) => {
  for (let i = 0; i < action.move; i++) {
    stacks[action.to - 1].unshift(stacks[action.from - 1].shift());
  }
};

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

const { stacks, actions } = parseInput(lines);

console.log("initial");
printStacks(stacks);

actions.forEach((action) => moveCrane(stacks, action));

printStacks(stacks);
console.log("result", stacks.map((stack) => stack[0]).join(""));
