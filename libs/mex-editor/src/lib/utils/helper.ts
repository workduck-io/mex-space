/*
 * Checks for links that start with  the separator (.) and returns key and whether it is a child node i.e. starting with the separator
 * Also removes multiple separator invocations like "a.b....c..d"
 */
export const withoutContinuousDelimiter = (text: string, delimiter = '.') => {
  const key = text
    .split(delimiter)
    .filter((ch) => ch !== '')
    .join(delimiter);

  if (text?.startsWith(delimiter) && key.length > 0)
    return { key: `.${key}`, isChild: true };
  return { key, isChild: false };
};

export const removeNulls = (obj: any): any => {
  if (obj === null) {
    return undefined;
  }
  if (typeof obj === 'object') {
    for (const key in obj) {
      obj[key] = removeNulls(obj[key]);
    }
  }
  return obj;
};
