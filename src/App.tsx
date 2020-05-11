import React from "react";
import { createCopyful } from "./Copyful";
import copy from "./copy.json";

export interface MyCopyType {
  [key: string]: {
    header: {
      title: string;
      subtitle: string;
      nested: {
        dynamicValues: string;
      };
    };
  };
}

const getCopySomehow = (locale: string) => {
  return (copy as MyCopyType)[locale];
};

const { CopyfulProvider, useCopy } = createCopyful(getCopySomehow("1337"));

function App() {
  return (
    <CopyfulProvider copy={getCopySomehow("en-us")}>
      <SomePage />
    </CopyfulProvider>
  );
}

function SomePage() {
  const context = {
    someNumber: 4815162342,
    someString: "Hello World!",
  };
  const {
    title,
    subtitle,
    nested: { dynamicValues },
  } = useCopy(context).header;

  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>{dynamicValues}</p>
      </header>
    </div>
  );
}

export default App;
