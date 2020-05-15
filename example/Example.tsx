import React from 'react';
import { CopyfulProvider, Copyful } from './configureCopy';
import { HeaderSection } from './HeaderSection';

export const Example = () => {
  return (
    <CopyfulProvider>
      {/* Example using Hooks */}
      <HeaderSection />

      {/* Example using a render prop */}
      <Copyful copyKey="footer" context={{ anotherValue: 'I love pizza' }}>
        {copy => (
          <section>
            <article>{copy}</article>
          </section>
        )}
      </Copyful>
    </CopyfulProvider>
  );
};
