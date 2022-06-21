/* eslint-disable eqeqeq */
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
	action(sql: string, callback?: (results: any) => {} | void) {
		let connection = mysql.createConnection(this.config);
		connection.connect();
		connection.query(sql, function (error, results, fields) {
			if (error) { throw error; };
			if (callback) {
				callback(results);
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
		let col_class = `class='${funcInfo.class}'`;
		let col_return = `\`return\`='${funcInfo.return}'`;
		let col_description = funcInfo.description == undefined ? `description=''` : `description='${funcInfo.description?.replace(/\n/g, '').replace(/\t/g, '\\t').replace(/'/g, '`')}'`;
		let col_example = funcInfo.example == undefined ? `example=''` : `example='${funcInfo.example?.replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/'/g, '`')}'`;
		let col_params = `params='${JSON.stringify(funcInfo.params)}'`;
		let sql = `UPDATE function SET ${col_class}, ${col_description}, ${col_return}, ${col_example}, ${col_params} WHERE (class='${funcInfo.class}' AND function='${funcInfo.function}');`;

		this.action(sql);
	}
	// 更新数据库常量注释
	updataEnumNote(enumInfo: LuaEnum): void {
		if (enumInfo.class && enumInfo.name) {
			if (this.api_note[enumInfo.class] == undefined) {
				this.api_note[enumInfo.class] = {};
			}
			this.api_note[enumInfo.class][enumInfo.name] = this.formatLuaEnum(enumInfo);
		}
		let col_class = `class='${enumInfo.class}'`;
		let col_description = enumInfo.description == undefined ? `description=''` : `description='${enumInfo.description?.replace(/\n/g, '').replace(/\t/g, '\\t').replace(/'/g, '`')}'`;
		let col_description_lite = enumInfo.description_lite == undefined ? `description_lite=''` : `description_lite='${enumInfo.description_lite?.replace(/\n/g, '').replace(/\t/g, '\\t').replace(/'/g, '`')}'`;
		let col_example = enumInfo.example == undefined ? `example=''` : `example='${enumInfo.example?.replace(/\n/g, '\\n').replace(/\t/g, '\\t')}'`;
		let sql = `UPDATE enum SET ${col_class}, ${col_description}, ${col_example}, ${col_description_lite} WHERE (class='${enumInfo.class}' AND name='${enumInfo.name}');`;

		this.action(sql);
	}
	// 更新数据库CSS注释
	updataCssNote(cssProperty: CssProperty): void {
		let sql = 'SELECT * FROM `css_property` WHERE class="' + cssProperty.class + '"';
		this.action('SELECT * FROM `css_property` WHERE class="' + cssProperty.class + '"', (result) => {
			if (result.length == 0) {
				let col_class = `'${cssProperty.class}'`;
				let col_description = cssProperty.description == undefined ? `''` : `'${cssProperty.description?.replace(/\n/g, '').replace(/\t/g, '\\t').replace(/'/g, '`')}'`;
				let col_value = cssProperty.value == undefined ? `''` : `'${JSON.stringify(cssProperty.value)}'`;
				let col_example = cssProperty.example == undefined ? `''` : `'${cssProperty.example?.replace(/\n/g, '\\n').replace(/\t/g, '\\t')}'`;
				let sql = `INSERT INTO css_property VALUES (${col_class}, ${col_value}, ${col_description}, ${col_example});`;
				this.action(sql);
			} else if (result.length > 0) {
				let col_class = `class='${cssProperty.class}'`;
				let col_description = cssProperty.description == undefined ? `description=''` : `description='${cssProperty.description?.replace(/\n/g, '').replace(/\t/g, '\\t').replace(/'/g, '`')}'`;
				let col_value = cssProperty.value == undefined ? `value=''` : `value='${JSON.stringify(cssProperty.value)}'`;
				let col_example = cssProperty.example == undefined ? `example=''` : `example='${cssProperty.example?.replace(/\n/g, '\\n').replace(/\t/g, '\\t')}'`;
				let sql = `UPDATE css_property SET ${col_class}, ${col_description}, ${col_example}, ${col_value} WHERE class='${cssProperty.class}';`;
				this.action(sql);
			}
		});
	}
}