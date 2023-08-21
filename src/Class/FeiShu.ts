import * as vscode from 'vscode';
import axios, { AxiosResponse } from 'axios';
import { request } from '../utils/request';

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
interface DocumentListResponseData {
	/** 错误码，非 0 取值表示失败 */
	code: number,
	/** 错误描述 */
	msg: string,
	data: {
		/** 文件夹清单列表 */
		files: {
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
			type: "sheet",
			/** 在浏览器中查看的链接 */
			url: string;
		}[];
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

const URL_LIST = {
	/** 获取Token */
	TENANT_ACCESS_TOKEN: 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
	/** 获取文件夹文档列表 */
	FILES: 'https://open.feishu.cn/open-apis/drive/v1/files',
	/** 获取工作表 */
	SHEETS: 'https://open.feishu.cn/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/query',
	/** 获取表格数据 */
	SHEET: 'https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/values/:range',
};
export class FeiShu {
	appid: string;
	secret: string;
	tenant_access_token: string | undefined;
	expire: number | undefined;
	constructor() {
		const config = this.getConfig();
		this.appid = config["App ID"];
		this.secret = config["App Secret"];
		this.init();
	}
	async init() {
		await this.getTenantAccessToken();
		// console.log(this.tenant_access_token);
		// const fileNames = await this.getDocumentList("A8E3fkqOHl1AobdyOzbc0BTtngb");
		// console.log(fileNames);
		// const sheet = await this.getDocumentInfo("SV7ysTAF3haPV3tP8RfcpAZOnBf");
		// console.log(sheet);

	}
	getConfig() {
		let config: any = vscode.workspace.getConfiguration().get('dota2-tools.A8.FeiShu');
		return config;
	}

	/** 通用请求函数 */
	async request<T>(
		method: "POST" | "GET",
		url: ValueOf<typeof URL_LIST>,
		requestParams: {
			headers?: {
				'Authorization'?: string,
				'Content-Type'?: "application/json; charset=utf-8",
			},
			/** 路径参数 */
			pathParams?: Record<string, string>,
			/** 查询参数 */
			params?: Record<string, string>,
			/** 请求体 */
			data?: Record<string, string>,
		} = {}
	): Promise<T | undefined> {
		return await request(method, url, requestParams);
	}
	/** 获取access_token */
	async getTenantAccessToken() {
		const data = await this.request<AccessTokenResponseData>(
			"POST",
			URL_LIST.TENANT_ACCESS_TOKEN,
			{
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				data: {
					"app_id": this.appid,
					"app_secret": this.secret
				}
			}
		);
		if (data) {
			this.tenant_access_token = data.tenant_access_token;
		}
	}
	/**
	 * 从指定的文件夹中获取文档列表。
	 * @param {string} folderToken - 要获取文档的文件夹的令牌。
	 */
	async getDocumentList(folderToken: string) {
		const files = await this.request<DocumentListResponseData>(
			"GET",
			URL_LIST.FILES,
			{
				headers: {
					'Authorization': 'Bearer ' + this.tenant_access_token
				},
				params: {
					folder_token: folderToken,
				}
			}
		);
		if (files) {
			return files.data.files;
		}
		return [];
	}
	/** 获取文档信息 */
	async getDocumentInfo(spreadsheetToken: string) {
		const sheet = await this.request<SheetInfoResponseData>(
			"GET",
			URL_LIST.SHEETS,
			{
				headers: {
					'Authorization': 'Bearer ' + this.tenant_access_token
				},
				pathParams: {
					spreadsheet_token: spreadsheetToken
				}
			}
		);
		if (sheet) {
			return sheet.data.sheets[0];
		}
	}
	/** 读取表格数据 */
	getSheetData(spreadsheetToken: string, range: string) {
		return this.request<SheetDataResponseData>(
			"GET",
			URL_LIST.SHEET,
			{
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Authorization': 'Bearer ' + this.tenant_access_token,
				},
				pathParams: {
					spreadsheetToken: spreadsheetToken,
					range: range
				}
			}
		);
	}
}