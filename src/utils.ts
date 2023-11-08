export function loadNouns() {
  const nounsTxt = readFile(require.resolve("./nouns.txt"));
  const nounsArray = nounsTxt.trim().split("\n");

  // remove duplicates
  return Array.from(new Set(nounsArray));
}

export function pickRandom<T>(array: Array<T>): { value: T; index: number } {
  const index = Math.floor(Math.random() * array.length);
  return { value: array[index], index };
}

export function capitalize(str: string): string {
  const words = str.split(/\s/g);
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}
