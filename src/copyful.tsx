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

  const useCopy = <T extends keyof TCopy>(
    key: T,
    context: InterpolationValues = {}
  ): TCopy[T] => {
    const copy = React.useContext(Context);
    const copyBlock = copy[key];

    const interpolatedCopy = context
      ? getInterpolatedCopy(copyBlock, context)
      : copyBlock;

    return React.useMemo(() => interpolatedCopy, [interpolatedCopy]);
  };

  const withCopy = (
    Component: any,
    key: keyof TCopy,
    context: InterpolationValues = {}
  ) => {
    const WithCopy = React.forwardRef(function WithCopy(props: any, ref: any) {
      const { innerRef, ...rest } = props;
      const copy = useCopy(key, context) || defaultCopy;

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
