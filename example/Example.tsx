import React, { useState } from 'react';
import { CopyfulProvider, Copyful, getCopySomehow, Locales } from './configureCopy';
import { copy } from './copy';
import { HeaderSection } from './HeaderSection';

export const Example = () => {
  const [locale, setLocale] = useState<Locales>('en-us');

  const toggleLocale = () => {
    setLocale(locale === 'en-us' ? '1337' : 'en-us');
  };

  return (
    <CopyfulProvider copy={getCopySomehow(copy, locale)}>
      {/* Example using Hooks */}
      <button onClick={toggleLocale}>Toggle Locale</button>
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
