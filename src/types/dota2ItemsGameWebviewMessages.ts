export interface Dota2ItemsGameField {
	label: string;
	value: string;
}

export interface Dota2ItemsGameVisualModifier {
	name: string;
	fields: Dota2ItemsGameField[];
}

export interface Dota2ItemsGameDetail {
	imageData?: string;
	fields: Dota2ItemsGameField[];
	bundle: Dota2ItemsGameField[];
	bundleContain: Dota2ItemsGameField[];
	visualModifiers: Dota2ItemsGameVisualModifier[];
	priceInfo: Dota2ItemsGameField[];
}

export type Dota2ItemsGameSearchResult = {
	headers: string[];
	rows: string[][];
};

export type Dota2ItemsGameWebviewMessage =
	| { type: 'ready'; }
	| { type: 'search'; payload: { query: string; }; };

export type Dota2ItemsGameHostMessage =
	| { type: 'searchResult'; payload: { query: string; result?: Dota2ItemsGameDetail | Dota2ItemsGameSearchResult; }; };
