#!/usr/bin/env yavascript
import { loadNouns, pickRandom, capitalize } from "./utils";

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

const emotes = `
  :) :( :o :O :3 >:3 >:3c >:( >:) c: C: D:
  :-) :^) B) >.< uwu ._. :v >.> <.< >///<
  owo O.O o.o 0_0 <(^.^<) <(^.^)> (>^.^)>
  :D T.T Q.Q orz :p :P xD XD
`
  .split(/\s+/)
  .filter(Boolean)
  .concat("ayy lmao");

function makeTitle(noun: string, nounIndex: number) {
  const emote = pickRandom(emotes).value;

  return `Volume ${nounIndex + 1}: The ${capitalize(
    noun
  )} of Haruhi Suzumiya ${emote}`;
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
