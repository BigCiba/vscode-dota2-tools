import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { getDotaApiNoteClass } from '../module/apiNote';
import { getPathConfiguration } from '../utils/getPathConfiguration';

/**
 * 用来生成Emmylua插件跳转使用的文件
 * @export
 */
export function generateLuaApiDocument(context: vscode.ExtensionContext) {
	const dotaApiNote = getDotaApiNoteClass();
	const apiNote = dotaApiNote.getApiNote();
	const classList = dotaApiNote.getClassList();
	const enumList = dotaApiNote.getEnumList();

	let setting = getPathConfiguration("dota2-tools.lua api document path");
	if (setting) {
		let outPath = path.normalize(setting);
		vscode.window.showInputBox({ prompt: "确定生成至这个路径吗？", value: path.join(outPath, "lua_api.lua") }).then((msg) => {
			if (msg !== undefined) {
				mkdirp(path.dirname(msg));

				let result = "";
				for (const className in classList) {
					const classNote = apiNote[className];
					const funcList = classList[className];
					if (classNote !== undefined && funcList !== undefined) {
						result += `---@class ${className}${classNote.extends !== "" ? " : " + classNote.extends : ""}\n`;
						if (classNote.variable != undefined && classNote.variable != "") {
							result += `---@type ${className}\n${classNote.variable} = ${className}\n`;
						}
						for (const funcInfo of funcList) {
							let count = 0;
							let functionParams = "";
							let noteParams = "";
							for (let paramsName in funcInfo.params) {
								let paramsInfo = funcInfo.params[paramsName];
								noteParams += `${count === 0 ? "" : "\n"}---@param ${paramsInfo.params_name} ${getFormatParamType(paramsInfo.type)}`;
								let paramsNameNote = paramsInfo.params_name || paramsName;
								if (count === 0) {
									count++;
									functionParams += paramsNameNote;
								} else {
									functionParams += ', ' + paramsNameNote;
								}
							}
							result += `---${funcInfo.description ?? ""}${noteParams === "" ? "" : "\n" + noteParams}
---@return ${getFormatParamType(funcInfo.return) ?? "void"}
function ${(funcInfo.class === "Global" || funcInfo.class_cl === "Global") ? funcInfo.function : (funcInfo.class || funcInfo.class_cl) + ":" + funcInfo.function}(${functionParams}) end

`;
						}

					}
				}
				for (const enumType in enumList) {
					result += `\n-- ${enumType} \n`;
					for (const enumInfo of enumList[enumType]) {
						let content = `${enumInfo.name} = ${enumInfo.value}`;

						const hasDesc = enumInfo.description != null && enumInfo.description != "No Description Set" || enumInfo.description_lite != null && enumInfo.description_lite != "No Description Set";

						let description = "";
						if (hasDesc) {
							for (let i = 0; i < Math.max(0, Math.ceil(20 - content.length / 4)); i++) {
								description += '\t';
							}
							description += `--- ${enumInfo.description || enumInfo.description_lite}`;
						}
						result += `${content}${description}\n`;
					}
				}
				fs.writeFileSync(msg, result);
			}
		});
	}
}
function getFormatParamType(param: string) {
	if (param === "int" || param === "float") {
		return "number";
	} else if (param === "bool") {
		return "boolean";
	}
	return param;
}