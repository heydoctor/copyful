import React, { createContext, useMemo } from "react";
import { getInterpolatedCopy } from "./helpers";
export type InterpolationValues = { [key: string]: string | number };

export const createCopyful = <TCopy,>(defaultCopy: TCopy) => {
  const Context = createContext(defaultCopy);

  const CopyfulProvider: (props: {
    copy: TCopy;
    children: any;
  }) => JSX.Element = ({
    copy = defaultCopy,
    children,
  }: {
    copy?: TCopy;
    children: React.ComponentType;
  }) => {
    return <Context.Provider value={copy}>{children}</Context.Provider>;
  };

  const useCopy = (context: InterpolationValues = {}): TCopy => {
    const copy = React.useContext(Context);
    const interpolatedCopy = context
      ? getInterpolatedCopy(copy, context)
      : copy;
    return useMemo(() => interpolatedCopy, [interpolatedCopy]);
  };

  return {
    CopyfulProvider,
    useCopy,
  };
};

export default createCopyful;
