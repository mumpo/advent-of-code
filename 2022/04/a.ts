type Range = [number, number];

// contains returns true if the first range contains the second
const contains = ([a0, a1]: Range, [b0, b1]: Range) => {
  return b0 >= a0 && b1 <= a1;
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

  if ((contains(rangeA, rangeB) || contains(rangeB, rangeA))) {
    return total + 1;
  }

  return total;
}, 0);

console.log(`There are ${result} contained assignments`);
