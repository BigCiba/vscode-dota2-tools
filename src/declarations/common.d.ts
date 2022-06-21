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
}

interface ModuleListConfig {
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
}
