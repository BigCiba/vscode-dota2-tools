import * as vscode from 'vscode';
import { request } from '../utils/request';
import * as lark from "@larksuiteoapi/node-sdk";

const URL_LIST = {
	/** 获取Token */
	TENANT_ACCESS_TOKEN: 'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
	/** 获取文件夹文档列表，接口频率未知尽量少调用 */
	FILES: 'https://open.feishu.cn/open-apis/drive/v1/files',
	/** 获取工作表，100 次/分钟 */
	SHEETS: 'https://open.feishu.cn/open-apis/sheets/v3/spreadsheets/:spreadsheet_token/sheets/query',
	/** 获取表格元数据，没有次数限制 */
	SHEET_METAINFO: 'https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/metainfo',
	/** 获取表格数据，没有次数限制 */
	SHEET: 'https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/:spreadsheetToken/values/:range',
	/** 获取文件元数据，没有次数限制 */
	META: 'https://open.feishu.cn/open-apis/suite/docs-api/meta',
	/** 新建文件夹 */
	CREATE_FOLDER: 'https://open.feishu.cn/open-apis/drive/v1/files/create_folder',
	/** 复制文件 */
	COPY_FILE: "https://open.feishu.cn/open-apis/drive/v1/files/:file_token/copy",
	/** 多维表格列出记录 */
	RECORDS: "https://open.feishu.cn/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records"
};
export class FeiShu {
	appid: string;
	secret: string;
	branchFolder: string;
	appToken: string;
	languageConfig: Record<string, { tableID: string, viewID: string; }> = {};
	tenant_access_token: string | undefined;
	/** 令牌过期时间的时间戳，以秒为单位 */
	expire: number | undefined;
	client: lark.Client;
	constructor() {
		const config = this.getConfig();
		this.appid = config["App ID"];
		this.secret = config["App Secret"];
		this.branchFolder = config["Branch Folder"];
		this.appToken = config["App Token"];
		this.languageConfig = {
			"Schinese": {
				tableID: config["Schinese ID"]?.split("|")?.[0],
				viewID: config["Schinese ID"]?.split("|")?.[1]
			},
			"English": {
				tableID: config["English ID"]?.split("|")?.[0],
				viewID: config["English ID"]?.split("|")?.[1]
			},
			"Russian": {
				tableID: config["Russian ID"]?.split("|")?.[0],
				viewID: config["Russian ID"]?.split("|")?.[1]
			}
		};
		this.client = new lark.Client({
			appId: this.appid,
			appSecret: this.secret,
			disableTokenCache: false
		});
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
			params?: Record<string, string | number>,
			/** 请求体 */
			data?: Record<string, any>,
		} = {}
	): Promise<T | undefined> {
		// 每次请求前检查租户访问凭证
		const valid = await this.updateTenantAccessToken();
		if (valid) {
			return await request(method, url, requestParams);
		} else {
			vscode.window.showErrorMessage("获取租户访问凭证失败");
		}
	}
	/** 获取access_token */
	async getTenantAccessToken() {
		if (this.appid == "" || this.secret == "") {
			return false;
		}
		const data = await request<AccessTokenResponseData>(
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
			this.expire = Date.now() / 1000 + data.expire;
			return true;
		}
		return false;
	}
	/** 检查租户访问凭证是否需要更新 */
	async updateTenantAccessToken() {
		if (this.tenant_access_token == undefined) {
			return false;
		}
		if (this.tenant_access_token && this.expire) {
			const currentTimeInSeconds = Date.now() / 1000; // 当前时间的时间戳，以秒为单位
			const remainingTime = this.expire - currentTimeInSeconds; // 当前时间剩余秒数
			if (remainingTime < 30 * 60) {
				console.log("令牌剩余时间不到30分钟");
				await this.getTenantAccessToken();
				return true;
			} else {
				return true;
			}
		}
		return false;
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
			console.log(files.data.files);

			return files.data.files;
		}
		return [];
	}
	/** 获取文档信息（次数限制，暂时不用） */
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
	async getSheetMetaInfo(spreadsheetToken: string) {
		const sheet = await this.request<SheetMetaInfoResponseData>(
			"GET",
			URL_LIST.SHEET_METAINFO,
			{
				headers: {
					'Authorization': 'Bearer ' + this.tenant_access_token,
					'Content-Type': 'application/json; charset=utf-8'
				},
				pathParams: {
					spreadsheetToken: spreadsheetToken
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
				},
				params: {
					valueRenderOption: "FormattedValue"
				}
			}
		);
	}
	/** 获取元数据 */
	getMetaData(spreadsheetTokenList: string[]) {
		if (spreadsheetTokenList.length <= 0) {
			return;
		}
		return this.request<MetaDataResponseData>(
			"POST",
			URL_LIST.META,
			{
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Authorization': 'Bearer ' + this.tenant_access_token,
				},
				data: {
					request_docs: spreadsheetTokenList.map((spreadsheetToken) => {
						return {
							"docs_token": spreadsheetToken,
							"docs_type": "sheet"
						};
					})
				}
			}
		);
	}
	/** 新建文件夹 */
	createFolder(folderName: string, folderToken: string) {
		return this.request<CreateFolderResponseData>(
			"POST",
			URL_LIST.CREATE_FOLDER,
			{
				headers: {
					'Authorization': 'Bearer ' + this.tenant_access_token,
					'Content-Type': 'application/json; charset=utf-8',
				},
				data: {
					name: folderName,
					folder_token: folderToken
				}
			}
		);
	}
	/**
	 * 复制文件到新位置。
	 *
	 * @param {string} fileToken - 要复制的文件的令牌。
	 * @param {string} newName - 复制文件的新名称。
	 * @param {string} folderToken - 复制文件到的文件夹的令牌。
	 */
	copyFile(fileToken: string, newName: string, folderToken: string) {
		return this.request<CopyFileResponseData>(
			"POST",
			URL_LIST.COPY_FILE,
			{
				headers: {
					'Authorization': 'Bearer ' + this.tenant_access_token,
					'Content-Type': 'application/json; charset=utf-8',
				},
				pathParams: {
					file_token: fileToken
				},
				data: {
					name: newName,
					type: "sheet",
					folder_token: folderToken
				}
			}
		);
	}

	/** 导出表格到本地csv */
	async exportSheetToCsv(spreadsheetToken: string, range: string, path: string) {
		const res = await this.client.drive.exportTask.create({
			data: {
				file_extension: 'csv',
				token: 'WbcWsyesMhpkLitsvVQceml5nVg',
				type: 'sheet',
				sub_id: '0DZLKE',
			},
		});
	}


	/** 导出多维表格数据 */
	async exportRecords(type: string) {
		const config = this.languageConfig[type];
		const result: Record<string, string> = await this.records(type, config.tableID, config.viewID);
		return result;
	}

	async records(type: string, tableID: string, viewID: string, page_token?: string, result: Record<string, string> = {}): Promise<Record<string, string>> {
		const params: any = {
			view_id: viewID,
			field_names: `["Tokens","${type}"]`,
			page_size: 500
		};
		if (page_token) {
			params.page_token = page_token;
		}
		const data = await this.request<RecordResponseData>(
			"GET",
			URL_LIST.RECORDS,
			{
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Authorization': 'Bearer ' + this.tenant_access_token,
				},
				pathParams: {
					app_token: this.appToken,
					table_id: tableID
				},
				params: params
			}
		);
		if (data?.code == 0) {
			for (const iterator of data.data.items) {
				result[iterator.fields["Tokens"]] = iterator.fields[type];
			}
			if (data.data.has_more) {
				let pageData = await this.records(type, tableID, viewID, data.data.page_token, result);
				result = Object.assign(result, pageData);
			}
		}
		return result;
	}
}