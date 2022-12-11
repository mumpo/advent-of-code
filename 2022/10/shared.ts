export const cycle = (history: number[], instruction: string): number[] => {
  const current = history[history.length - 1];
  history.push(current);

  const [operation, valueStr] = instruction.split(" ");

  if (operation === "addx") {
    const value = parseInt(valueStr);
    history.push(current + value);
  }

  return history;
};
