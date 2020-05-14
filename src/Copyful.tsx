import * as React from 'react';
import { getInterpolatedCopy } from './helpers';
export type InterpolationValues = { [key: string]: string | number };

export const createCopyful = <TCopy,>(defaultCopy: TCopy) => {
  const Context = React.createContext(defaultCopy);

  const CopyfulProvider: (props: {
    copy?: TCopy;
    children: any;
  }) => JSX.Element = ({
    copy = defaultCopy,
    children,
  }: {
    copy?: TCopy;
    children: React.ComponentType;
  }) => {
    const value = copy || defaultCopy;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useCopy = (context: InterpolationValues = {}): TCopy => {
    const copy = React.useContext(Context);
    const interpolatedCopy = context
      ? getInterpolatedCopy(copy, context)
      : copy;
    return React.useMemo(() => interpolatedCopy, [interpolatedCopy]);
  };

  const withCopy = (Component: any) => {
    const WithCopy = React.forwardRef(function WithCopy(props: any, ref: any) {
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
