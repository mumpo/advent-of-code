const isUnique = (buffer: string[]) => {
  return buffer.reduce((bufferMap, char) => {
    if (!bufferMap || bufferMap[char]) {
      return null;
    }
    bufferMap[char] = true;

    return bufferMap;
  }, {} as Record<string, boolean> | null) !== null;
};

export const findStartOfPacket = (
  input: string,
  index: number,
  buffer: string[],
  bufferSize: number,
): number | null => {
  if (index >= input.length) {
    return null;
  }

  const char = input.charAt(index);

  buffer.push(char);

  if (buffer.length > bufferSize) {
    buffer.shift();

    if (isUnique(buffer)) {
      return index;
    }
  }

  return findStartOfPacket(input, index + 1, buffer, bufferSize);
};
