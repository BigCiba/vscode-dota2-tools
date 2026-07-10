export type Dota2IconKind = 'ability' | 'item';

export type Dota2IconSource = 'builtin' | 'game' | 'content';

export type Dota2HeroAttribute =
	| 'DOTA_ATTRIBUTE_STRENGTH'
	| 'DOTA_ATTRIBUTE_AGILITY'
	| 'DOTA_ATTRIBUTE_INTELLECT'
	| 'DOTA_ATTRIBUTE_ALL';

export interface Dota2IconEntry {
	key: string;
	name: string;
	copyValue: string;
	localizedName?: string;
	uri: string;
	source: Dota2IconSource;
}

export interface Dota2HeroEntry {
	name: string;
	uri: string;
}

export interface Dota2IconPayload {
	abilities: Dota2IconEntry[];
	items: Dota2IconEntry[];
	heroes: Record<Dota2HeroAttribute, Dota2HeroEntry[]>;
	defaultHeroUri: string;
}

export type Dota2IconWebviewMessage =
	| { type: 'ready'; }
	| { type: 'copyIcon'; payload: { key: string; }; }
	| { type: 'revealIcon'; payload: { key: string; }; };

export type Dota2IconHostMessage =
	| { type: 'initialize'; payload: Dota2IconPayload; }
	| { type: 'copyComplete'; payload: { key: string; copyValue: string; }; };
