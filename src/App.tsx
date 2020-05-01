import React from "react";
import { createCopyful, interpolateString } from "./Copyful";

const staticCopy = {
  "en-us": {
    header: {
      title: "Copyful",
      subtitle: "Copy management shouldn't get in the way of code.",
      dynamicValues:
        "Yes, even dynamic values, like this number: {0} and this string: {1}.",
    },
  },
  "1337": {
    header: {
      title: "c0pyful",
      subtitle: "c0py m4n463m3n7 5h0uldn'7 637 1n 7h3 w4y 0f c0d3.",
      dynamicValues:
        "y35, 3v3n dyn4m1c v4lu35, l1k3 7h15 numb3r: {0} 4nd 7h15 57r1n6: {1}.",
    },
  },
};

const { CopyfulProvider, useCopy } = createCopyful(staticCopy["1337"]);

function App() {
  return (
    <CopyfulProvider value={staticCopy["en-us"]}>
      <SomePage />
    </CopyfulProvider>
  );
}

function SomePage() {
  const copy = useCopy();
  const { title, subtitle, dynamicValues } = copy.header;
  const interpolated = interpolateString(dynamicValues, [1, '"Hello World"']);
  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>{interpolated}</p>
      </header>
    </div>
  );
}

export default App;
