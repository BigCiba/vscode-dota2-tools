export interface TranslateBase {
	supportedLanguages: Record<string, string>;
	url: string;
	remapLang(sourceLang: keyof TranslateBase["supportedLanguages"]): string;
	translate(text: string, sourceLang: string, targetLang: string): Promise<string>;
}