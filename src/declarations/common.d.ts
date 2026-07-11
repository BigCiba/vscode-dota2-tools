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
	dota2kv: boolean;
}


interface AccessTokenResponseData {
	/** Error code; a non-zero value indicates failure */
	code: number,
	/** Error description */
	msg: string,
	/** Tenant access token */
	tenant_access_token: string,
	/** Expiration time, in seconds */
	expire: number;
}
interface DocumentFile {
	/** Creation timestamp */
	created_time: string,
	/** Modification timestamp */
	modified_time: string,
	/** File name  */
	name: string,
	/** Owner ID */
	owner_id: string,
	/** Parent folder token */
	parent_token: string,
	shortcut_info: {
		/** The original file token the shortcut points to */
		target_token: string,
		/** The original file type the shortcut points to */
		target_type: string;
	},
	/** File token */
	token: string,
	/** File type */
	type: "sheet" | "folder",
	/** Link to view in the browser */
	url: string;
}
interface DocumentListResponseData {
	/** Error code; a non-zero value indicates failure */
	code: number,
	/** Error description */
	msg: string,
	data: {
		/** List of files in the folder */
		files: DocumentFile[];
	},
}
interface SheetInfoResponseData {
	/** Error code; a non-zero value indicates failure */
	code: number,
	/** Error description */
	msg: string,
	data: {
		/** List of worksheets */
		sheets: {
			/** Worksheet id */
			sheet_id: string,
			/** Worksheet title */
			title: string,
			/** Worksheet index position; index starts counting from 0. */
			index: string,
			/** Worksheet type */
			resource_type: "sheet",
			/** Whether the worksheet is hidden */
			hidden: boolean;
			/** Cell properties */
			grid_properties: {
				/** Number of frozen rows */
				frozen_row_count: number,
				/** Number of frozen columns */
				frozen_column_count: number,
				/** Number of rows in the worksheet */
				row_count: number,
				/** Number of columns in the worksheet */
				column_count: number,
			};
		}[];
	};
}
interface SheetMetaInfoResponseData {
	/** Error code; a non-zero value indicates failure */
	code: number,
	/** Error description */
	msg: string,
	data: {
		/** List of worksheets */
		sheets: {
			/** Worksheet id */
			sheetId: string,
			/** Worksheet title */
			title: string,
			/** Worksheet index position; index starts counting from 0. */
			index: string,
		}[];
	};
}
interface SheetDataResponseData {
	/** Error code; a non-zero value indicates failure */
	code: number,
	/** Error description */
	msg: string,
	data: {
		/** Version number of the sheet */
		revision: number,
		/** Token of the spreadsheet */
		spreadsheetToken: string,
		/** Values and range */
		valueRange: {
			/** Insertion dimension */
			majorDimension: string,
			/** Range of the returned data; empty means the queried range has no data */
			range: string,
			/** Version number of the sheet */
			revision: number,
			/** Values obtained from the query */
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
	/** Error code; a non-zero value indicates failure */
	code: number,
	/** Error description */
	msg: string,
	data: {
		token: string,
		url: string;
	};
}
interface CopyFileResponseData {
	/** Error code; a non-zero value indicates failure */
	code: number,
	/** Error description */
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
