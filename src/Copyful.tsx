import React, { createContext } from "react";
export type InterpolateString = (copyString: string, dynamicValues: Array<string|number> ) => string;

export const createCopyful = <T,>(defaultCopy: T) => {

  const Context = createContext(defaultCopy);

  const CopyfulProvider: any = ({
    value = defaultCopy,
    children,
  }: {
    value?: T;
    children: React.ComponentType;
  }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useCopy = (): T => {
    const copy = React.useContext(Context);
    return React.useMemo(() => copy, [copy]);
  };

  return {
    CopyfulProvider,
    useCopy
  };
};

export const interpolateString: InterpolateString = (copyString, dynamicValues) => {
  let newString = copyString;
  dynamicValues.forEach( ( value, i) => {
    newString = newString.replace(`{${i}}`, value.toString());
  })
  return newString;
}

export default createCopyful;
