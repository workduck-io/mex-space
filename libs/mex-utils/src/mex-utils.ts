import Fuse from 'fuse.js';
import { nanoid } from 'nanoid';

export function mexUtils(): string {
  return 'mex-utils';
}

export const randomString = () => {
  return `SNIPPET_${nanoid(5)}`;
};

export const searchThroughIndex = () => {
  const fuse = new Fuse(['hello', 'world']);
  return fuse.search('hello');
};
