const parseTreesRow = (line: string) => {
  return [...line].map((i) => parseInt(i));
};

export const parseTreesMatrix = (input: string) =>
  input.split("\n").reduce((rows, line) => {
    rows.push(parseTreesRow(line));
    return rows;
  }, [] as number[][]);

export const range = (from: number, to: number) => {
  if (to < 0 || from < 0) return [];

  if (from === to) return [];
  if (from > to) {
    return [...Array(from + 1 - to).keys()].map((i) => from - i);
  }

  return [...Array(to + 1 - from).keys()].map((i) => i + from);
};
