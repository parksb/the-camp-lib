import axios, { AxiosRequestConfig } from 'axios';

export interface RequestOptions {
  readonly method: 'GET' | 'POST';
  readonly uri?: string;
  readonly url?: string;
  readonly headers?: any;
  readonly form?: any;
  readonly json?: boolean;
}

export interface HttpResponse {
  headers: any;
  statusCode: number;
  statusMessage: string;
  body: any;
}

const getPostContentType = (isJson?: boolean): string => {
  if (isJson) {
    return 'application/json';
  }
  return 'application/x-www-form-urlencoded';
};

const removeUndefined = (object?: object): Record<string, string> => {
  const result: Record<string, string> = {};
  if (object) {
    Object.keys(object).forEach((key) => {
      if (object[key] !== undefined) {
        result[key] = object[key];
      }
    });
  }
  return result;
};

const buildPostBody = (
  isJson?: boolean,
  data?: object,
): object | string | undefined => {
  if (isJson) {
    return data;
  }
  if (!data) {
    return data;
  }
  return new URLSearchParams(removeUndefined(data)).toString();
};

export const request = async (requestOption: RequestOptions): Promise<HttpResponse> => {
  let headers = requestOption.headers;
  let data = requestOption.form;
  if (requestOption.method === 'POST') {
    const contentType = getPostContentType(requestOption.json);
    headers = {
      ...requestOption.headers,
      'Content-Type': contentType,
    };
    data = buildPostBody(requestOption.json, requestOption.form);
  }
  const config: AxiosRequestConfig = {
    headers,
    data,
    method: requestOption.method,
    url: (requestOption.url || requestOption.uri),
  };
  const response = await axios(config);
  const body = await response.data;
  return {
    body,
    headers: response.headers,
    statusCode: response.status,
    statusMessage: response.statusText,
  }
};
