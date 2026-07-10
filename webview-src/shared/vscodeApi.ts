export interface VsCodeApi<State> {
	postMessage(message: unknown): void;
	getState(): State | undefined;
	setState(state: State): State;
}

declare function acquireVsCodeApi<State = unknown>(): VsCodeApi<State>;

// VS Code requires acquireVsCodeApi() to be called only once per Webview.
const vscodeApi = acquireVsCodeApi<unknown>();

export function getVsCodeApi<State>(): VsCodeApi<State> {
	return vscodeApi as VsCodeApi<State>;
}
