import { findStartOfPacket } from "./shared.ts";

const input = await Deno.readTextFile("./input.txt");

const buffer: string[] = [];
const bufferSize = 14;

const position = findStartOfPacket(input, 0, buffer, bufferSize);
console.log(`Start of message marker is at position ${position + 1}`);
