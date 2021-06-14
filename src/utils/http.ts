import axios from 'axios';

export interface RequestOption {
  readonly method: 'GET' | 'POST';
  readonly url: string;
  readonly headers?: any;
  readonly data?: any;
  readonly params?: any;
  readonly json?: boolean;
}

const removeUndefined = (object?: Object): Record<string, string> => {
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

export const request = async (requestOption: RequestOption) => {
  const options = {
    ...requestOption,
  };
  if (options.method === 'POST') {
    const headers = {
      ...options.headers,
    };
    if (requestOption.json) {
      headers['Content-Type'] = 'application/json';
    } else {
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.data = new URLSearchParams(removeUndefined(requestOption.data));
    }
    options.headers = headers;
  }
  return await axios(options);
};
