export type ApiBrowserSource = 'lua' | 'javascript' | 'css';

export type ApiBrowserGroupKind = 'class' | 'enum' | 'css';

export type ApiBrowserEntryKind = 'function' | 'enum' | 'property';

export type ApiBrowserSurface = 'panel' | 'sidebar';

export type ApiBrowserListLocation = 'panel' | 'sidebar';

export interface ApiBrowserParameter {
	key: string;
	name: string;
	type: string;
	description: string;
}

export interface ApiBrowserCssValue {
	name: string;
	description: string;
}

export interface ApiBrowserEntry {
	id: string;
	source: ApiBrowserSource;
	kind: ApiBrowserEntryKind;
	groupId: string;
	groupName: string;
	name: string;
	signature: string;
	description: string;
	conciseDescription?: string;
	returnType?: string;
	value?: string | number;
	functionName?: string;
	params: ApiBrowserParameter[];
	cssValues?: ApiBrowserCssValue[];
	example?: string;
	server?: boolean;
	client?: boolean;
	serverClass?: string;
	clientClass?: string;
	editable: boolean;
}

export interface ApiBrowserGroup {
	id: string;
	source: ApiBrowserSource;
	kind: ApiBrowserGroupKind;
	name: string;
	description: string;
	extends?: string;
	variable?: string;
	entries: ApiBrowserEntry[];
}

export interface ApiBrowserCatalog {
	groups: ApiBrowserGroup[];
	entryCount: number;
}

export interface ApiBrowserPayload {
	lua: ApiBrowserCatalog;
	javascript: ApiBrowserCatalog;
	css: ApiBrowserCatalog;
}

export interface ApiBrowserSelection {
	source: ApiBrowserSource;
	groupId?: string;
	entryId?: string;
	edit?: boolean;
}

export type ApiBrowserHostMessage =
	| { type: 'initialize'; payload: ApiBrowserPayload; surface: ApiBrowserSurface; listLocation: ApiBrowserListLocation; selection?: ApiBrowserSelection; }
	| { type: 'navigate'; selection: ApiBrowserSelection; }
	| { type: 'preferencesChanged'; listLocation: ApiBrowserListLocation; }
	| { type: 'saveComplete'; entry: ApiBrowserEntry; }
	| { type: 'saveFailed'; entryId: string; message: string; }
	| { type: 'copyComplete'; text: string; }
	| { type: 'catalogAction'; source: ApiBrowserSource; action: 'setQuery' | 'collapse' | 'overview'; query?: string; };

export type ApiBrowserWebviewMessage =
	| { type: 'ready'; source: ApiBrowserSource; }
	| { type: 'sourceChanged'; source: ApiBrowserSource; }
	| { type: 'copy'; text: string; }
	| { type: 'saveEntry'; entry: ApiBrowserEntry; }
	| { type: 'openSelection'; selection: ApiBrowserSelection; }
	| { type: 'openChangelog'; }
	| { type: 'setListLocation'; listLocation: ApiBrowserListLocation; };
