export type SolidDemoWebviewMessage =
	| { type: 'ready'; }
	| { type: 'ping'; payload: { requestId: string; count: number; }; };

export type SolidDemoHostMessage =
	| { type: 'hostReady'; payload: { extensionVersion: string; language: string; }; }
	| { type: 'pong'; payload: { requestId: string; receivedAt: string; }; };
