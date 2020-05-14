import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { createCopyful } from '../src';
import { copy } from '../example/copy';

const enUS = copy['en-us'];
const leet = copy['1337'];

const setup = (copyOverride = enUS) => {
  const { CopyfulProvider, useCopy } = createCopyful(enUS);

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
    <CopyfulProvider copy={copyOverride}>
      <TextComponent />
    </CopyfulProvider>
  );
};

afterEach(cleanup);

describe('useCopy', () => {
  const { asFragment } = setup(enUS);

  it('returns strings and interpolates values with provided context', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('CopyfulProvider', () => {
  it('supports overriding default copy', () => {
    const { asFragment } = setup(leet);

    expect(asFragment()).toMatchSnapshot();
  });
});
