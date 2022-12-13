export type Monkey = {
  items: number[];
  operation: (old: number) => number;
  chooseMonkey: (worryLevel: number) => number;
  divisibleBy: number;
};

const operatorFns = {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
  "-": (a: number, b: number) => a - b,
  "/": (a: number, b: number) => a / b,
} as Record<string, (a: number, b: number) => number>;

export const parseMonkey = (fromStr: string): Monkey => {
  const itemsMatch = fromStr.match(/Starting items\: (.*)/);
  if (!itemsMatch) {
    throw new Error("Invalid input while parsing monkey items");
  }

  const items = itemsMatch[1].split(" ").map((itemStr) => parseInt(itemStr));

  const operationMatch = fromStr.match(/Operation\: new = (\w+) (.) (\w+)/);
  if (!operationMatch) {
    throw new Error("Invalid input while parsing monkey operation");
  }

  const [, operandA, operator, operandB] = operationMatch;
  const operatorFn = operatorFns[operator];

  const operation = (old: number) => {
    const a = operandA === "old" ? old : parseInt(operandA);
    const b = operandB === "old" ? old : parseInt(operandB);

    return operatorFn(a, b);
  };

  const testMatch = fromStr.match(/Test\: divisible by (\d+)/);
  const ifTrueMatch = fromStr.match(/If true\: throw to monkey (\d+)/);
  const ifFalseMatch = fromStr.match(/If false\: throw to monkey (\d+)/);

  if (!testMatch || !ifTrueMatch || !ifFalseMatch) {
    throw new Error("Invalid input while parsing monkey choosing function");
  }

  const divisibleBy = parseInt(testMatch[1]);
  const monkeyIfTrue = parseInt(ifTrueMatch[1]);
  const monkeyIfFalse = parseInt(ifFalseMatch[1]);

  const chooseMonkey = (worryLevel: number) =>
    worryLevel % divisibleBy === 0 ? monkeyIfTrue : monkeyIfFalse;

  return {
    items,
    operation,
    chooseMonkey,
    divisibleBy,
  };
};

const DEBUG = false;

const round = (
  monkeys: Monkey[],
  worryFn: (level: number) => number,
  inspectionCount: number[],
) => {
  monkeys.forEach((monkey, monkeyIndex) => {
    monkey.items.forEach((item) => {
      const worryLevel = worryFn(monkey.operation(item));
      const passToMonkey = monkey.chooseMonkey(worryLevel);

      monkeys[passToMonkey].items.push(worryLevel);

      inspectionCount[monkeyIndex] = inspectionCount[monkeyIndex]
        ? inspectionCount[monkeyIndex] + 1
        : 1;
    });

    monkey.items = [];
  });
};

export const getMonkeyBusiness = (
  monkeys: Monkey[],
  worryFn: (level: number) => number,
  numRounds: number,
) => {
  const inspectionCount: number[] = [];

  for (let i = 1; i <= numRounds; i++) {
    round(monkeys, worryFn, inspectionCount);

    if (DEBUG) {
      console.log(
        `After round ${i}, the monkeys are holding items with these worry levels:`,
      );
      monkeys.forEach((monkey, i) =>
        console.log(`Monkey ${i}: ${monkey.items.join(", ")}`)
      );
    }
  }

  if (DEBUG) {
    console.log("Inspection levels");
    inspectionCount.forEach((count, i) =>
      console.log(`Monkey ${i} inspected items ${count} times.`)
    );
  }

  const [firstMonkey, secondMonkey] = [...inspectionCount].sort((a, b) =>
    a === b ? 0 : (a > b ? -1 : 1)
  );

  return firstMonkey * secondMonkey;
};
