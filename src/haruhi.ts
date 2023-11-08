#!/usr/bin/env yavascript
import { loadNouns } from "./nouns";

const { flags, args } = parseScriptArgs({
  timer: number,
  volume: number,
  json: boolean,
  help: boolean,
  clear: boolean,
  h: boolean,
});

if (flags.help || flags.h) {
  console.log(
    `
Usage: haruhi.ts [options] [nouns...]
Options:
  --timer (number): print an entry once every n milliseconds
  --volume (number): print a specific volume (ie. book number)
  --json (boolean): output json
  --clear (boolean): clear terminal between entries
`.trim()
  );
  std.exit(0);
}

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

function printNoun(noun: string, index: number) {
  const title = makeTitle(noun, index);
  if (flags.json) {
    echo(JSON.stringify({ title }));
  } else {
    echo(title);
  }
}

const nouns = loadNouns();
function printPick() {
  const { value: noun, index } = pickRandom(nouns);
  if (flags.clear) {
    clear();
  }
  printNoun(noun, index);
}

if (flags.timer != null) {
  printPick();
  setInterval(printPick, flags.timer);
} else if (flags.volume != null) {
  const index = flags.volume - 1;
  const noun = nouns[index];
  if (!noun) {
    console.error(red("No such volume: " + flags.volume));
    std.exit(1);
  } else {
    printNoun(noun, index);
  }
} else if (args.length > 0) {
  for (const arg of args) {
    const fakeIndex = Math.floor(Math.random() * 10000 + nouns.length);
    printNoun(arg, fakeIndex);
  }
} else {
  printPick();
}
