import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';

export type ApiResultSelector<T> = (res: AxiosResponse<any>) => T;
const DEFAULT_RESULT_SELECTOR: ApiResultSelector<any> = (res) => res.data;

export async function apiGet(
  url: string,
  params = {},
  config = {},
  resultSelector = DEFAULT_RESULT_SELECTOR
) {
  const data = _.assign({}, { params }, config);
  const res = await axios.get(url, data);
  return resultSelector(res);
}

export async function apiPost(
  url: string,
  params = {},
  config = {},
  resultSelector = DEFAULT_RESULT_SELECTOR
) {
  const res = await axios.post(url, params, config);
  return resultSelector(res);
}
