#!/usr/bin/env yavascript
import { loadNouns } from "./nouns";

function pickRandom<T>(array: Array<T>): { value: T; index: number } {
  const index = Math.floor(Math.random() * array.length);
  return { value: array[index], index };
}

function capitalize(str: string): string {
  const words = str.split(/\s/g);
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function makeTitle(noun: string, nounIndex: number) {
  return `Volume ${nounIndex + 1}: The ${capitalize(noun)} of Haruhi Suzumiya`;
}

const nouns = loadNouns();
function printPick() {
  const { value: noun, index } = pickRandom(nouns);
  echo(makeTitle(noun, index));
}

setInterval(printPick, 1000);
