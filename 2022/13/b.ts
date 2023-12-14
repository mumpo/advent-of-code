import { comparePackets } from "./shared.ts";

const input = await Deno.readTextFile("./input.txt");

const dividers = [[[2]], [[6]]];

const packets = input.replaceAll("\n\n", "\n").split("\n").map((packet) =>
  JSON.parse(packet)
).concat(dividers);

const ordered = packets.sort(comparePackets);

const decoderKey = ordered.reduce(
  (accum, packet, i) => dividers.includes(packet) ? accum * (i + 1) : accum,
  1,
);

console.log("The decoder key is", decoderKey);
