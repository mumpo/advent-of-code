import { cycle } from "./shared.ts";

const draw = (history: number[]) => {
  const line = history.map((pixelPosition, i) => {
    const shouldRender = i >= pixelPosition && i < pixelPosition + 3;
    return shouldRender ? "#" : ".";
  });

  console.log(line.join(""));
};

const input = await Deno.readTextFile("./input.txt");

const history = input.split("\n").reduce(cycle, [0]);

for (let i = 0; i < history.length; i += 40) {
  draw(history.slice(i, i + 40));
}
