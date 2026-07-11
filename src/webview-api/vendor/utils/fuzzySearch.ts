/**
 * Fuzzy match: checks if all characters of `query` appear in `text` in order.
 * Returns a score (lower is better) or Infinity if no match.
 */
export function fuzzyMatch(text: string, query: string): number {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  let qi = 0;
  for (let ti = 0; ti < textLower.length && qi < queryLower.length; ti++) {
    if (textLower[ti] === queryLower[qi]) qi++;
  }
  if (qi < queryLower.length) return Infinity;

  let score = 0;
  let textIdx = 0;
  let prevMatchIdx = -1;

  for (let i = 0; i < queryLower.length; i++) {
    const ch = queryLower[i];
    let bestPos = -1;
    let bestPosScore = Infinity;

    for (let t = textIdx; t < textLower.length; t++) {
      if (textLower[t] !== ch) continue;

      let posScore = 0;
      if (prevMatchIdx >= 0) {
        const gap = t - prevMatchIdx - 1;
        posScore += gap * 2;
      }

      if (t === 0) {
        posScore -= 5;
      } else if (text[t - 1] === '_' || text[t - 1] === '.') {
        posScore -= 3;
      } else if (text[t] !== text[t].toLowerCase() && text[t - 1] === text[t - 1].toLowerCase()) {
        posScore -= 2;
      }

      posScore += t * 0.1;

      if (posScore < bestPosScore) {
        bestPosScore = posScore;
        bestPos = t;
      }

      if (prevMatchIdx >= 0 && t === prevMatchIdx + 1) break;
    }

    if (bestPos === -1) return Infinity;

    score += bestPosScore;
    prevMatchIdx = bestPos;
    textIdx = bestPos + 1;
  }

  if (textLower.startsWith(queryLower)) {
    score -= queryLower.length * 5;
  }

  score += (text.length - query.length) * 0.5;

  return score;
}

export function fuzzyContains(text: string, query: string): boolean {
  return isFinite(fuzzyMatch(text, query));
}

export function fuzzySort<T>(items: T[], getText: (item: T) => string, query: string): T[] {
  return items
    .map((item) => ({ item, score: fuzzyMatch(getText(item), query) }))
    .filter((x) => isFinite(x.score))
    .sort((a, b) => a.score - b.score)
    .map((x) => x.item);
}
