#!/usr/bin/env yavascript
import { loadNouns } from "./utils";

function shuffle(array: Array<any>) {
  let currentIndex = array.length,
    randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const nouns = loadNouns();
shuffle(nouns);
writeFile("src/nouns.txt", nouns.join("\n"));
