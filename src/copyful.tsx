import React, { useState, useEffect, ReactElement } from 'react';
import { getInterpolatedCopy } from './helpers';

type InterpolationContext = Record<string, string | number>;

export const createCopyful = <TCopy extends object>(defaultCopy: TCopy) => {
  const Context = React.createContext<Partial<TCopy>>(defaultCopy);

  const CopyfulProvider: React.FC<{ copy?: Partial<TCopy> }> = ({ children, copy }) => {
    const [currentCopy, setCurrentCopy] = useState<Partial<TCopy>>(defaultCopy);
    useEffect(() => {
      setCurrentCopy(copy || defaultCopy);
    }, [copy]);
    return <Context.Provider value={currentCopy}>{children}</Context.Provider>;
  };

  const useCopy = <T extends keyof TCopy>(key: T, context: InterpolationContext = {}) => {
    const copy = React.useContext(Context);
    const copyBlock = copy[key] || defaultCopy[key];

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
    context?: InterpolationContext;
    children: (copy: TCopy[T]) => ReactElement;
  }) => children(useCopy(copyKey, context));

  return {
    CopyfulProvider,
    useCopy,
    Copyful,
  };
};

export default createCopyful;
