import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { createCopyful } from '../src';
import { copy } from '../example/copy';
import { getCopySomehow, Locales } from '../example/configureCopy';

const setup = (copyOverrideLocale: Locales = 'en-us') => {
  const { CopyfulProvider, useCopy } = createCopyful(getCopySomehow(copy, copyOverrideLocale));

  function TextComponent() {
    const { title, dynamicValues } = useCopy('header', {
      someNumber: 4,
      someString: 'heydoc',
    });

    return (
      <>
        <span>{title}</span>
        <span>{dynamicValues}</span>
      </>
    );
  }

  return render(
    <CopyfulProvider>
      <TextComponent />
    </CopyfulProvider>
  );
};

afterEach(cleanup);

describe('useCopy', () => {
  const { asFragment } = setup('en-us');

  it('returns strings and interpolates values with provided context', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
