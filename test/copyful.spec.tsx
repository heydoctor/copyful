import React from 'react';
import { render, act } from '@testing-library/react';
import { createCopyful, InterpolationValues } from '../src';
import exampleCopy from '../example/copy.json';

// Render a component that uses useCopy to store useCopy's return value.
function setup<TCopy>(
  createCopy: TCopy,
  context: InterpolationValues = {},
  providerCopy?: TCopy
): TCopy {
  const createCopyClone = JSON.parse(JSON.stringify(createCopy));

  const { CopyfulProvider, useCopy } = createCopyful(createCopyClone);
  const useCopyData = {} as TCopy;

  function TextComponent() {
    Object.assign(useCopyData, useCopy(context));
    return null;
  }
  if (providerCopy) {
    const providerCopyClone = JSON.parse(JSON.stringify(providerCopy));
    render(
      <CopyfulProvider copy={providerCopyClone}>
        <TextComponent />
      </CopyfulProvider>
    );
  } else {
    render(<TextComponent />);
  }
  return useCopyData;
}
const enUS = exampleCopy['en-us'];
const leet = exampleCopy['1337'];
const someNumber = 4;
const someString = 'HeyDoc';

describe('CopyfulProvider', () => {
  const copyData = setup(enUS, { someNumber, someString }, leet);

  it('overrides the copy object provided to createCopyful with the one provided to CopyfulProvider', () => {
    expect(copyData.body).not.toEqual(enUS.body);
    expect(copyData.body).toEqual(leet.body);
  });
});

describe('useCopy', () => {
  const copyData = setup(enUS, { someNumber, someString });

  it('returns the same object structure as the copy provided', () => {
    Object.keys(enUS).forEach((key) => {
      expect(copyData).toHaveProperty(key);
    });
  });

  it('properly maps only the interpolation values provided', () => {
    const actual = copyData.header.nested.dynamicValues;
    const expected = enUS.header.nested.dynamicValues
      .replace('{someNumber}', someNumber.toString())
      .replace('{someString}', someString);
    expect(actual).toEqual(expected);
  });
});
