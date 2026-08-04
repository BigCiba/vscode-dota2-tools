/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as mysql from 'mysql2';
import * as path from 'path';
import { apiParse } from '../utils/apiParse';

/**
 * Dota2接口笔记相关的类
 */
export class DotaApiNote {
	api_note: Table;
	css_note: Table;
	classList: Table;
	enumList: Table;
	context: vscode.ExtensionContext;
	config = {
		host: '111.231.89.227',
		port: 3306,
		user: 'tool',
		password: 'spa54owm',
		database: 'tool'
	};
	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.api_note = JSON.parse(fs.readFileSync(context.extensionPath + '/resource/api_note.json', 'utf-8'));
		this.css_note = JSON.parse(fs.readFileSync(path.join(context.extensionPath, 'resource', 'dump_panorama_css_properties.json'), 'utf-8'));
		[this.classList, this.enumList] = apiParse(this.context, this.api_note);
	}
	// 初始化获取数据
	init(callback: () => void) {
		let initCount = 0;
		let CheckInit = (tag: string) => {
			initCount++;
			if (initCount >= 5) {
				// 更新本地的api_note文件
				// fs.writeFileSync(this.context.extensionPath + '/resource/api_note.json', JSON.stringify(this.api_note))
				[this.classList, this.enumList] = apiParse(this.context, this.api_note);
				callback();
			}
		};

		this.action('SELECT * FROM `function`', results => {

			for (const funcInfo of results) {
				if (this.api_note[funcInfo.class] == undefined) {
					this.api_note[funcInfo.class] = {};
				}
				this.api_note[funcInfo.class][funcInfo.function] = this.formatLuaFunction(funcInfo);
			}
			CheckInit("function");
		});
		this.action('SELECT * FROM `enum`', results => {
			for (const enumInfo of results) {
				if (this.api_note[enumInfo.class] == undefined) {
					this.api_note[enumInfo.class] = {};
				}
				this.api_note[enumInfo.class][enumInfo.name] = this.formatLuaEnum(enumInfo);
			}
			CheckInit("enum");
		});
		this.action('SELECT * FROM `class`', results => {
			for (const classInfo of results) {
				if (this.api_note[classInfo.class] == undefined) {
					this.api_note[classInfo.class] = {};
				}
				this.api_note[classInfo.class].description = classInfo.description;
				this.api_note[classInfo.class].extends = classInfo.extends || "";
				this.api_note[classInfo.class].variable = classInfo.variable || "";
			}
			CheckInit("class");
		});
		this.action('SELECT * FROM `enum_type`', results => {
			for (const classInfo of results) {

				if (this.api_note[classInfo.class] == undefined) {
					this.api_note[classInfo.class] = {};
				}
				this.api_note[classInfo.class].description = classInfo.description;
			}
			CheckInit("enum_type");
		});
		this.action('SELECT * FROM `css_property`', results => {
			for (const classInfo of results) {
				this.css_note[classInfo.class] = this.formatCssProperty(classInfo);
			}
			CheckInit("css_property");
		});
	}
	// 操作数据库
	action(sql: string, callback?: (results: any) => {} | void): void;
	action(sql: string, values: any[], callback?: (results: any) => {} | void): void;
	action(sql: string, valuesOrCallback?: any[] | ((results: any) => {} | void), callback?: (results: any) => {} | void): void {
		let connection = mysql.createConnection(this.config);
		const values = Array.isArray(valuesOrCallback) ? valuesOrCallback : [];
		const resultCallback = typeof valuesOrCallback === 'function' ? valuesOrCallback : callback;
		connection.connect();
		connection.query(sql, values, function (error, results) {
			if (error) { throw error; };
			if (resultCallback) {
				resultCallback(results);
			}
		});
		connection.end();
	}
	// 数据库数据转function
	formatLuaFunction(funcInfo: any) {
		let res: LuaFunction = {};
		if (funcInfo.class) { res.class = funcInfo.class; }
		if (funcInfo.class_cl) { res.class_cl = funcInfo.class_cl; }
		if (funcInfo.type) { res.type = funcInfo.type; }
		if (funcInfo.function) { res.function = funcInfo.function; }
		if (funcInfo.return) { res.return = funcInfo.return; }
		if (funcInfo.description) { res.description = funcInfo.description; }
		if (funcInfo.server) { res.server = (funcInfo.server == 1 ? true : false); }
		if (funcInfo.client) { res.client = (funcInfo.client == 1 ? true : false); }
		if (funcInfo.example) { res.example = funcInfo.example; }
		if (funcInfo.params) {
			if (typeof funcInfo.params === 'object') {
				res.params = funcInfo.params;
			}
			else if (typeof funcInfo.params === 'string') {
				res.params = JSON.parse(funcInfo.params);
			}
		}
		return res;
	}
	// 数据库数据转enum
	formatLuaEnum(enumInfo: any) {
		let res: LuaEnum = {};
		if (enumInfo.class) { res.class = enumInfo.class; }
		if (enumInfo.type) { res.type = enumInfo.type; }
		if (enumInfo.name) { res.name = enumInfo.name; }
		if (enumInfo.value != undefined) { res.value = enumInfo.value; }
		if (enumInfo.function) { res.function = enumInfo.function; }
		if (enumInfo.description) { res.description = enumInfo.description; }
		if (enumInfo.description_lite) { res.description_lite = enumInfo.description_lite; }
		if (enumInfo.example) { res.example = enumInfo.example; }
		return res;
	}
	// 数据库数据转css
	formatCssProperty(cssProperty: { class: string, value: string, description: string, example: string; }) {
		let res: CssProperty = {};
		if (cssProperty.class) { res.class = cssProperty.class; }
		if (cssProperty.value != undefined && cssProperty.value != "") {
			res.value = JSON.parse(cssProperty.value);
		}
		if (cssProperty.description) { res.description = cssProperty.description; }
		if (cssProperty.example) { res.example = cssProperty.example; }
		return res;
	}
	// 获取注释数据
	getApiNote() {
		return this.api_note;
	}
	// 获取classList
	getClassList() {
		return this.classList;
	}
	// 获取enumList
	getEnumList() {
		return this.enumList;
	}
	// 获取css注释数据
	getCssApiNote() {
		return this.css_note;
	}
	// 从数据库获取函数的注释
	getFunctionNote(funcInfo: LuaFunction, callback: (results: any) => {} | void): LuaFunction | void {
		this.action('SELECT * FROM `function` WHERE (function="' + funcInfo.function + '" AND class="' + funcInfo.class + '");', results => {
			let formatData = this.formatLuaFunction(results[0]);
			funcInfo.description = formatData.description;
			funcInfo.example = formatData.example;
			funcInfo.return = formatData.return;
			for (const param_name in funcInfo.params) {
				if (formatData.params) {
					funcInfo.params[param_name].type = formatData.params[param_name].type;
					funcInfo.params[param_name].params_name = formatData.params[param_name].params_name;
					funcInfo.params[param_name].description = formatData.params[param_name].description;
				}
			}
			if (funcInfo.class && funcInfo.function) {
				if (this.api_note[funcInfo.class] == undefined) {
					this.api_note[funcInfo.class] = {};
				}
				this.api_note[funcInfo.class][funcInfo.function] = formatData;
			}
			callback(funcInfo);
		});
	}
	// 从数据库获取常量的注释
	getEnumNote(enumInfo: LuaEnum, callback: (results: any) => {} | void): LuaEnum | void {
		this.action('SELECT * FROM `enum` WHERE (name="' + enumInfo.name + '");', results => {
			let formatData = this.formatLuaEnum(results[0]);
			enumInfo.description = formatData.description;
			enumInfo.description_lite = formatData.description_lite;
			enumInfo.example = formatData.example;

			if (enumInfo.class && enumInfo.name) {
				if (this.api_note[enumInfo.class] == undefined) {
					this.api_note[enumInfo.class] = {};
				}
				this.api_note[enumInfo.class][enumInfo.name] = formatData;
			}
			callback(enumInfo);
		});
	}
	// 从数据库获取Css的注释
	getCssNote(cssInfo: CssProperty, callback: (results: any) => {} | void): CssProperty | void {
		this.action('SELECT * FROM `css_property` WHERE (class="' + cssInfo.class + '");', results => {
			let formatData = this.formatCssProperty(results[0]);

			cssInfo.description = formatData.description || cssInfo.description;
			cssInfo.value = formatData.value || cssInfo.value;
			cssInfo.example = formatData.example || cssInfo.example;
			if (cssInfo.class) {
				this.css_note[cssInfo.class] = cssInfo;
			}
			callback(cssInfo);
		});
	}
	// 更新数据库函数注释
	updataFunctionNote(funcInfo: LuaFunction): void {
		if (funcInfo.class && funcInfo.function) {
			if (this.api_note[funcInfo.class] == undefined) {
				this.api_note[funcInfo.class] = {};
			}
			this.api_note[funcInfo.class][funcInfo.function] = this.formatLuaFunction(funcInfo);
		}
		const sql = 'UPDATE `function` SET `class`=?, `description`=?, `return`=?, `example`=?, `params`=? WHERE (`class`=? AND `function`=?);';
		this.action(sql, [
			funcInfo.class ?? '',
			funcInfo.description ?? '',
			funcInfo.return ?? '',
			funcInfo.example ?? '',
			JSON.stringify(funcInfo.params ?? {}),
			funcInfo.class ?? '',
			funcInfo.function ?? '',
		]);
	}
	// 更新数据库常量注释
	updataEnumNote(enumInfo: LuaEnum): void {
		if (enumInfo.class && enumInfo.name) {
			if (this.api_note[enumInfo.class] == undefined) {
				this.api_note[enumInfo.class] = {};
			}
			this.api_note[enumInfo.class][enumInfo.name] = this.formatLuaEnum(enumInfo);
		}
		const sql = 'UPDATE `enum` SET `class`=?, `description`=?, `example`=?, `description_lite`=? WHERE (`class`=? AND `name`=?);';
		this.action(sql, [
			enumInfo.class ?? '',
			enumInfo.description ?? '',
			enumInfo.example ?? '',
			enumInfo.description_lite ?? '',
			enumInfo.class ?? '',
			enumInfo.name ?? '',
		]);
	}
	// 更新数据库CSS注释
	updataCssNote(cssProperty: CssProperty): void {
		this.action('SELECT * FROM `css_property` WHERE `class`=?', [cssProperty.class ?? ''], (result) => {
			const values = [
				cssProperty.class ?? '',
				JSON.stringify(cssProperty.value ?? {}),
				cssProperty.description ?? '',
				cssProperty.example ?? '',
			];
			if (result.length == 0) {
				this.action('INSERT INTO `css_property` (`class`, `value`, `description`, `example`) VALUES (?, ?, ?, ?);', values);
			} else if (result.length > 0) {
				this.action(
					'UPDATE `css_property` SET `class`=?, `value`=?, `description`=?, `example`=? WHERE `class`=?;',
					[...values, cssProperty.class ?? ''],
				);
			}
		});
	}
}