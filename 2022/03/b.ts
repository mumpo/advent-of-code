const groupN = (lines: string[], n: number): string[][] => {
  if (lines.length <= n) {
    return [lines];
  }

  const group = lines.slice(0, n);
  const rest = lines.slice(n);

  return [group, ...groupN(rest, n)];
};

const intersectChars = (
  line: string,
  charMap: Map<string, number>,
  index: number,
) => {
  [...line].forEach((char) => {
    if (index === 0) {
      charMap.set(char, index + 1);
      return;
    }

    if (!charMap.has(char) || charMap.get(char) < index) {
      return;
    }

    charMap.set(char, index + 1);
  });
};

const findNInMap = (map: Map<string, number>, n: number) => {
  for (const [key, value] of map.entries()) {
    if (value === n) {
      return key;
    }
  }

  throw new Error(`${n} not found in map`);
};

const findCommonChar = (lines: string[]) => {
  const charMap = new Map<string, number>();
  lines.forEach((line, index) => intersectChars(line, charMap, index));

  return findNInMap(charMap, lines.length);
};

const uppercaseA = "A".charCodeAt(0);
const lowercaseA = "a".charCodeAt(0);

const getPriority = (item: string) => {
  const charCode = item.charCodeAt(0);

  return charCode >= lowercaseA
    ? charCode - lowercaseA + 1
    : charCode - uppercaseA + 27;
};

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

const totalPriority = groupN(lines, 3).reduce(
  (total, line) => total + getPriority(findCommonChar(line)),
  0,
);

console.log("The total priority is", totalPriority);
