export const getInterpolatedCopy = <TCopy, TContext>(copy: TCopy, context: TContext) =>
  findInterpolations(copy, context);

const findInterpolations = (copy: any, context: any): any => {
  if (typeof copy === 'string') {
    return interpolateCopy(copy, context);
  }

  return Object.keys(copy).reduce((acc, key) => {
    const currentItem = copy[key];

    if (currentItem !== 'string') {
      return {
        ...acc,
        [key]: findInterpolations(currentItem, context),
      };
    }

    return acc;
  }, copy);
};

const interpolateCopy = (str: string, context: any) => {
  const delimeterMatcher = /{\S+}/gm;
  const variables = (str.match(delimeterMatcher) || []).map((dV: string) =>
    dV.substring(1, dV.length - 1)
  );

  if (variables.length) {
    let interpolatedValue = str;
    variables.forEach(v => {
      const target = `{${v}}`;
      const value = context[v] || target;
      interpolatedValue = interpolatedValue.replace(target, value);
    });
    return interpolatedValue;
  }
  return str;
};
