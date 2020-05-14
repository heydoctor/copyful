import { createCopyful } from '../src/Copyful';
import { copy } from './copy';

export const getCopySomehow = (locale: 'en-us' | '1337') => {
  return copy[locale];
};

export const { CopyfulProvider, useCopy, withCopy } = createCopyful(getCopySomehow('1337'));
