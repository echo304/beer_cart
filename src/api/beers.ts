import { Beer } from './types';
import { apiGet } from './utils';

export async function getAll(): Promise<Beer[]> {
  const url = `http://localhost:3004/beers`;
  const res = await apiGet(url);
  return res;
}
