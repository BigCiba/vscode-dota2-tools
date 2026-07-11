// Maps each Russian ЙЦУКЕН letter to the Latin character sitting on the same
// physical QWERTY key. Lets users search the (English-only) API without switching
// keyboard layout — e.g. typing "ьщвшашук" becomes "modifier".
const RU_TO_EN: Record<string, string> = {
  й: "q", ц: "w", у: "e", к: "r", е: "t", н: "y", г: "u", ш: "i", щ: "o", з: "p", х: "[", ъ: "]",
  ф: "a", ы: "s", в: "d", а: "f", п: "g", р: "h", о: "j", л: "k", д: "l", ж: ";", э: "'",
  я: "z", ч: "x", с: "c", м: "v", и: "b", т: "n", ь: "m", б: ",", ю: ".", ё: "`",
};

/**
 * Transliterate Russian-layout keystrokes to their QWERTY equivalents.
 * Non-Cyrillic characters pass through unchanged; case is preserved for letters.
 */
export function translitRuToEn(input: string): string {
  let out = "";
  for (const ch of input) {
    const lower = ch.toLowerCase();
    const mapped = RU_TO_EN[lower];
    if (mapped === undefined) {
      out += ch;
    } else {
      out += ch === lower ? mapped : mapped.toUpperCase();
    }
  }
  return out;
}
