type ArrayOrNumber = number | number[] | ArrayOrNumber[];

const DEBUG = false;
const debug = DEBUG ? console.log : () => {};

export const comparePackets = (
  left: ArrayOrNumber,
  right: ArrayOrNumber,
  depth = 0,
): number => {
  debug("- Compare", left, right);

  if (Array.isArray(left)) {
    if (!Array.isArray(right)) {
      return comparePackets(left, [right], depth + 1);
    }

    if (!left.length && !right.length) {
      return 0;
    }

    if (!left.length) {
      debug("- Left side ran out of items, so inputs are in the right order");
      return -1;
    }

    if (!right.length) {
      debug(
        "- Right side ran out of items, so inputs are not in the right order",
      );
      return 1;
    }

    const comparison = comparePackets(left[0], right[0]);
    if (comparison !== 0) {
      return comparison;
    }

    return comparePackets(left.slice(1), right.slice(1), depth + 1);
  } else {
    if (Array.isArray(right)) {
      return comparePackets([left], right, depth + 1);
    }

    if (left === right) {
      return 0;
    }

    if (left < right) {
      debug("- Left side is smaller, so inputs are in the right order");
    }

    if (left > right) {
      debug("- Right side is smaller, so inputs are not in the right order");
    }

    return left < right ? -1 : 1;
  }
};
