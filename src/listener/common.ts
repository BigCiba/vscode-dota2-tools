import * as vscode from "vscode";
import { stopWatch as stopWatch3 } from "./listenerLocalization";

export async function StopAllListener() {
	stopWatch3();
}

const configName = "dota2-tools.A3.listener";
export function TryStartWatch() {
	let records: Record<string, boolean> = {};
	let config: ListenerConfig | undefined = vscode.workspace.getConfiguration().get(configName);
	if (config) {
		for (const key in config) {
			const element = config[key as "localization"];
			if (element == true) {
				records[key] = element;
				vscode.workspace.getConfiguration().update(configName + "." + key, false);
				break;
			}
		}
	}

	for (const key in records) {
		const element = records[key];
		vscode.workspace.getConfiguration().update(configName + "." + key, element);
	}
}