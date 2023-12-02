#!/usr/bin/env yavascript
import { loadNouns, capitalize, pickRandom } from "./utils";

const nouns = loadNouns();

setInterval(() => {
  const noun1 = pickRandom(nouns).value;
  const noun2 = pickRandom(nouns).value;

  echo(
    `There's no way my ${noun1} is a${
      /^[aeiou]/.test(noun2) ? "n" : ""
    } ${noun2}!`
  );
}, 1000);
