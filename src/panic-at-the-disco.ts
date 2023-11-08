#!/usr/bin/env yavascript
import { loadNouns, capitalize, pickRandom } from "./utils";

const nouns = loadNouns();

setInterval(() => {
  const noun1 = capitalize(pickRandom(nouns).value);
  const noun2 = capitalize(pickRandom(nouns).value);

  echo(`${noun1}! At The ${noun2}`);
}, 500);
