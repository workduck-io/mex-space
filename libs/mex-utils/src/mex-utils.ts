import { nanoid } from 'nanoid';

export function mexUtils(): string {
  return 'mex-utils';
}

export const randomString = () => {
  return `SNIPPET_${nanoid(5)}`;
};
