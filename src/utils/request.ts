import axios from 'axios';
/** 通用请求函数 */
export async function request<T>(
	method: "POST" | "GET",
	url: string,
	requestParams: {
		headers?: Record<string, string>,
		/** 路径参数 */
		pathParams?: Record<string, string>,
		/** 查询参数 */
		params?: Record<string, string>,
		/** 请求体 */
		data?: Record<string, any>,
	} = {}
): Promise<T | undefined> {
	try {
		/** 替换路径参数 */
		if (requestParams.pathParams) {
			for (const key in requestParams.pathParams) {
				url = url.replace(`:${key}`, requestParams.pathParams[key]);
			}
		}
		if (method == "GET") {
			const response = await axios.get(url, {
				headers: requestParams.headers,
				params: requestParams.params
			});
			if (response.data) {
				return response.data;
			}
		} else {
			const response = await axios.post(url, requestParams.data, {
				headers: requestParams.headers,
				params: requestParams.params
			});
			if (response.data) {
				return response.data;
			}
		}
	} catch (error) {
		console.error(error);
	}
}