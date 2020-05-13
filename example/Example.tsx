import React from 'react';
import { CopyfulProvider, getCopySomehow } from './configureCopy';
import HeaderSection from './HeaderSection';
import BodySection from './BodySection';

function Example() {
  return (
    <CopyfulProvider copy={getCopySomehow('en-us')}>
      {/* Example Using Hooks */}
      <HeaderSection />
      {/* Example Using HOC */}
      <BodySection />
    </CopyfulProvider>
  );
}

export default Example;
