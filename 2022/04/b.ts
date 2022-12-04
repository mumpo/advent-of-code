type Range = [number, number];

const overlap = ([a0, a1]: Range, [b0, b1]: Range) => {
  return a1 >= b0 && b1 >= a0;
};

const parseRange = (text: string): Range => {
  const [a, b] = text.split("-");
  return [parseInt(a), parseInt(b)];
};

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

const result = lines.reduce((total, line) => {
  const [textA, textB] = line.split(",");

  const rangeA = parseRange(textA);
  const rangeB = parseRange(textB);

  return overlap(rangeA, rangeB) ? total + 1 : total;
}, 0);

console.log(`There are ${result} contained assignments`);
