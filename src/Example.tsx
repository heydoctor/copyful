import React from "react";
import { CopyfulProvider, getCopySomehow } from "./configureCopy";
import HeaderSection from "./HeaderSection";
import BodySection from "./BodySection";

function App() {
  return (
    <CopyfulProvider copy={getCopySomehow("en-us")}>
      <HeaderSection />{/* Example Using Hooks */}
      <BodySection />{/* Example Using HOC */}
    </CopyfulProvider>
  );
}

export default App;
