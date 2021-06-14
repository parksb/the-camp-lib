import axios, { AxiosRequestConfig } from 'axios';

export interface RequestOption {
  readonly method: 'GET' | 'POST';
  readonly uri?: string;
  readonly url?: string;
  readonly headers?: any;
  readonly form?: any;
  readonly json?: boolean;
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

export const request = async (requestOption: RequestOption) => {
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
  const option: AxiosRequestConfig = {
    headers,
    data,
    method: requestOption.method,
    url: (requestOption.url || requestOption.uri),
  };
  return axios(option);
};
