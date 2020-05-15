import React, { ReactElement } from 'react';
import { getInterpolatedCopy } from './helpers';

export type Context = Record<string, string | number>;

export const createCopyful = <TCopy extends object>(defaultCopy: TCopy) => {
  const Context = React.createContext(defaultCopy);

  const CopyfulProvider: React.FC = ({ children }) => (
    <Context.Provider value={defaultCopy}>{children}</Context.Provider>
  );

  const useCopy = <T extends keyof TCopy>(key: T, context: Context = {}) => {
    const copy = React.useContext(Context);
    const copyBlock = copy[key];

    const interpolatedCopy: TCopy[T] = context
      ? getInterpolatedCopy(copyBlock, context)
      : copyBlock;

    return React.useMemo(() => interpolatedCopy, [interpolatedCopy]);
  };

  const Copyful = <T extends keyof TCopy>({
    children,
    copyKey,
    context = {},
  }: {
    copyKey: T;
    context?: Context;
    children: (copy: TCopy[T]) => ReactElement;
  }) => children(useCopy(copyKey, context));

  return {
    CopyfulProvider,
    useCopy,
    Copyful,
  };
};

export default createCopyful;
