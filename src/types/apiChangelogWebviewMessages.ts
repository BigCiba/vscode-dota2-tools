export type ApiChangelogHostMessage = {
	type: 'initialize';
	markdown: string;
	updatedAt: number;
};

export type ApiChangelogWebviewMessage = { type: 'ready'; };
