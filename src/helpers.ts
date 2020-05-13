export const getInterpolatedCopy = <TCopy, TContext>(
  copy: TCopy,
  context: TContext
) => {
  let newCopy = { ...copy };
  findInterpolations(newCopy, context);
  return newCopy;
};

const findInterpolations = (copy: any, context: any) => {
  Object.keys(copy).forEach((key) => {
    const currItem = copy[key];
    if (typeof currItem === 'object') {
      findInterpolations(currItem, context);
    } else if (typeof currItem === 'string') {
      copy[key] = interpolateCopy(currItem, context);
    }
  });
};

const interpolateCopy = (str: string, context: any) => {
  const delimeterMatcher = /{\S+}/gm;
  const variables = (str.match(delimeterMatcher) || []).map((dV: string) =>
    dV.substring(1, dV.length - 1)
  );
  if (variables.length) {
    let interpolatedValue = str;
    variables.forEach((v) => {
      const target = `{${v}}`;
      const value = context[v] || target;
      interpolatedValue = interpolatedValue.replace(target, value);
    });
    return interpolatedValue;
  }
  return str;
};
