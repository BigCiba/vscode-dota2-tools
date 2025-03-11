declare interface Table {
	[x: string]: any;
}

declare type ValueOf<T> = T[keyof T];

declare interface LuaFunction {
	function?: string;
	class?: string;
	class_cl?: string;
	return?: string;
	description?: string;
	params?: { [key: string]: LuaParam; };
	server?: boolean;
	client?: boolean;
	example?: string;
	type?: string;
}
declare interface LuaEnum {
	name?: string;
	class?: string;
	value?: string;
	function?: string;
	description_lite?: string;
	description?: string;
	example?: string;
	client?: string;
	type?: string;
}
declare interface LuaParam {
	description: string;
	type: string,
	params_name: string,
}
declare interface CssProperty {
	class?: string,
	value?: any,
	example?: string,
	description?: string;
}
declare interface ListenerConfig {
	localization: boolean;
	kv2js: boolean;
	ability_excel: boolean;
	unit_excel: boolean;
	cloud_sheet: boolean;
}

declare interface ModuleListConfig {
	ability_icon: boolean;
	items_game: boolean;
	vsnd_picker: boolean;
	addon_info: boolean;
	lua_api_tree: boolean;
	js_api_tree: boolean;
	css_api_tree: boolean;
	panel_tree: boolean;
	lua_completion: boolean;
	js_completion: boolean;
	css_completion: boolean;
	kv_lua_associated: boolean;
	translate: boolean;
	sheet_cloud: boolean;
	dota2kv: boolean;
}


interface AccessTokenResponseData {
	/** 错误码，非 0 取值表示失败 */
	code: number,
	/** 错误描述 */
	msg: string,
	/** 租户访问凭证 */
	tenant_access_token: string,
	/** 过期时间，单位为秒 */
	expire: number;
}
interface DocumentFile {
	/** 创建时间戳 */
	created_time: string,
	/** 修改时间戳 */
	modified_time: string,
	/** 文件名  */
	name: string,
	/** 所有者ID */
	owner_id: string,
	/** 父文件夹标识 */
	parent_token: string,
	shortcut_info: {
		/** 快捷方式指向的原文件token */
		target_token: string,
		/** 快捷方式指向的原文件类型 */
		target_type: string;
	},
	/** 文件标识 */
	token: string,
	/** 文件类型 */
	type: "sheet" | "folder",
	/** 在浏览器中查看的链接 */
	url: string;
}
interface DocumentListResponseData {
	/** 错误码，非 0 取值表示失败 */
	code: number,
	/** 错误描述 */
	msg: string,
	data: {
		/** 文件夹清单列表 */
		files: DocumentFile[];
	},
}
interface SheetInfoResponseData {
	/** 错误码，非 0 取值表示失败 */
	code: number,
	/** 错误描述 */
	msg: string,
	data: {
		/** 工作表列表 */
		sheets: {
			/** 工作表id */
			sheet_id: string,
			/** 工作表标题 */
			title: string,
			/** 工作表索引位置，索引从 0 开始计数。 */
			index: string,
			/** 工作表类型 */
			resource_type: "sheet",
			/** 工作表是否被隐藏 */
			hidden: boolean;
			/** 单元格属性 */
			grid_properties: {
				/** 冻结的行数量 */
				frozen_row_count: number,
				/** 冻结的列数量 */
				frozen_column_count: number,
				/** 工作表的行数 */
				row_count: number,
				/** 工作表的列数量 */
				column_count: number,
			};
		}[];
	};
}
interface SheetMetaInfoResponseData {
	/** 错误码，非 0 取值表示失败 */
	code: number,
	/** 错误描述 */
	msg: string,
	data: {
		/** 工作表列表 */
		sheets: {
			/** 工作表id */
			sheetId: string,
			/** 工作表标题 */
			title: string,
			/** 工作表索引位置，索引从 0 开始计数。 */
			index: string,
		}[];
	};
}
interface SheetDataResponseData {
	/** 错误码，非 0 取值表示失败 */
	code: number,
	/** 错误描述 */
	msg: string,
	data: {
		/** sheet 的版本号 */
		revision: number,
		/** spreadsheet 的 token */
		spreadsheetToken: string,
		/** 值与范围 */
		valueRange: {
			/** 插入维度 */
			majorDimension: string,
			/** 返回数据的范围，为空时表示查询范围没有数据 */
			range: string,
			/** sheet 的版本号 */
			revision: number,
			/** 查询得到的值 */
			values: string[][];
		};
	};
}

interface MetaDataResponseData {
	code: number;
	msg: string;
	data: {
		docs_metas: {
			docs_token: string;
			docs_type: string;
			title: string;
			owner_id: string;
			create_time: number;
			latest_modify_user: string;
			latest_modify_time: number;
		}[];
	};
}

interface CreateFolderResponseData {
	/** 错误码，非 0 取值表示失败 */
	code: number,
	/** 错误描述 */
	msg: string,
	data: {
		token: string,
		url: string;
	};
}
interface CopyFileResponseData {
	/** 错误码，非 0 取值表示失败 */
	code: number,
	/** 错误描述 */
	msg: string,
	data: {
		file: {
			name: string,
			parent_token: string,
			token: string,
			type: string,
			url: string;
		};
	};
}

interface RecordResponseData {
	code: number,
	data: {
		has_more: boolean;
		items: {
			fields: Record<string, string>;
			id: string;
			record_id: string;
		}[];
		page_token: string;
		total: number;
	};
}
