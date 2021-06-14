import axios, { AxiosRequestConfig } from 'axios';

export interface RequestOption {
  readonly method: 'GET' | 'POST';
  readonly url: string;
  readonly headers?: any;
  readonly data?: any;
  readonly params?: any;
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
  let data = requestOption.data;
  if (requestOption.method === 'POST') {
    const contentType = getPostContentType(requestOption.json);
    headers = {
      ...requestOption.headers,
      'Content-Type': contentType,
    };
    data = buildPostBody(requestOption.json, requestOption.data);
  }
  const option: AxiosRequestConfig = {
    ...requestOption,
    headers,
    data,
  };
  return axios(option);
};
