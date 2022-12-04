const input = await Deno.readTextFile("./input.txt");

const uppercaseA = "A".charCodeAt(0);
const lowercaseA = "a".charCodeAt(0);

const getPriority = (item: string) => {
  const charCode = item.charCodeAt(0);

  return charCode >= lowercaseA
    ? charCode - lowercaseA + 1
    : charCode - uppercaseA + 27;
};

const findCommonChar = (first: string, second: string) => {
  const firstMap = new Map<string, boolean>();
  const secondMap = new Map<string, boolean>();

  for (let i = 0; i < first.length; i++) {
    const firstChar = first[i];
    const secondChar = second[i];

    if (firstChar === secondChar || secondMap.has(firstChar)) {
      return firstChar;
    }

    if (firstMap.has(secondChar)) {
      return secondChar;
    }

    firstMap.set(firstChar, true);
    secondMap.set(secondChar, true);
  }

  throw new Error("common char not found");
};

const totalPriority = input.split("\n").reduce((accumPriority, line) => {
  const first = line.slice(0, line.length / 2);
  const second = line.slice(line.length / 2);

  const commonChar = findCommonChar(first, second);

  return accumPriority + getPriority(commonChar);
}, 0);

console.log("The total priority is", totalPriority);
