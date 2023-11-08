export function loadNouns() {
  const nounsTxt = readFile(require.resolve("./nouns.txt"));
  const nounsArray = nounsTxt.trim().split("\n");

  // remove duplicates
  return Array.from(new Set(nounsArray));
}
