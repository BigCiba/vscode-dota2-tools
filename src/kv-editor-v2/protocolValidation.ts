import {
	KV_EDITOR_PROTOCOL_VERSION,
	KvEditorV2WebviewMessage,
} from '../types/kvEditorV2Shared';
import { isValidKvEditorV2Command } from './commandValidation';



export function isValidKvEditorV2Message(value: unknown): value is KvEditorV2WebviewMessage {
	if (!isRecord(value) || value.protocolVersion !== KV_EDITOR_PROTOCOL_VERSION || typeof value.type !== 'string') {return false;}
	switch (value.type) {
		case 'clientReady':
		case 'reloadData':
			return true;
		case 'executeCommand':
			return typeof value.requestId === 'string'
				&& typeof value.documentUri === 'string'
				&& Number.isInteger(value.baseVersion)
				&& isValidKvEditorV2Command(value.command);
		case 'updatePreference':
			return typeof value.requestId === 'string'
				&& isRecord(value.preference)
				&& ['localizedMode', 'frozenColumn', 'columnWidths'].includes(String(value.preference.type));
		case 'openTarget':
			return ['textEditor', 'formulaHelp', 'localizationFile', 'scriptFile'].includes(String(value.target))
				&& (value.path === undefined || typeof value.path === 'string');
		case 'requestResource':
			return typeof value.requestId === 'string' && value.resource === 'textureMenu';
		default:
			return false;
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
