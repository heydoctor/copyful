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

  const withCopy = (Component: any) => {
    const WithCopy = React.forwardRef(function WithCopy(props: any, ref) {
      const { innerRef, ...rest } = props;
      const copy = useCopy() || defaultCopy; 
      return <Component copy={copy} ref={innerRef || ref} {...rest} />;
    });

    return WithCopy;
  };

  return {
    CopyfulProvider,
    useCopy,
    withCopy,
  };
};

export default createCopyful;
