/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { apiParse } from '../utils/apiParse';

export class DotaApiNote {
	api_note: Table;
	css_note: Table;
	classList: Table;
	enumList: Table;
	context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.api_note = JSON.parse(fs.readFileSync(context.extensionPath + '/resource/api_note.json', 'utf-8'));
		this.css_note = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.json'), 'utf-8'));
		[this.classList, this.enumList] = apiParse(this.context, this.api_note);
	}

	init(callback: () => void) {
		// No remote DB — just use local JSON data
		callback();
	}

	getApiNote() {
		return this.api_note;
	}

	getClassList() {
		return this.classList;
	}

	getEnumList() {
		return this.enumList;
	}

	getCssApiNote() {
		return this.css_note;
	}

	getFunctionNote(funcInfo: LuaFunction, callback: (results: any) => {} | void): void {
		callback(funcInfo);
	}

	getEnumNote(enumInfo: LuaEnum, callback: (results: any) => {} | void): void {
		callback(enumInfo);
	}

	getCssNote(cssInfo: CssProperty, callback: (results: any) => {} | void): void {
		callback(cssInfo);
	}

	updataFunctionNote(funcInfo: LuaFunction): void {
		if (funcInfo.class && funcInfo.function) {
			if (this.api_note[funcInfo.class] == undefined) {
				this.api_note[funcInfo.class] = {};
			}
			this.api_note[funcInfo.class][funcInfo.function] = funcInfo;
		}
	}

	updataEnumNote(enumInfo: LuaEnum): void {
		if (enumInfo.class && enumInfo.name) {
			if (this.api_note[enumInfo.class] == undefined) {
				this.api_note[enumInfo.class] = {};
			}
			this.api_note[enumInfo.class][enumInfo.name] = enumInfo;
		}
	}

	updataCssNote(cssProperty: CssProperty): void {
		if (cssProperty.class) {
			this.css_note[cssProperty.class] = cssProperty;
		}
	}
}
