import { createCopyful } from '../src/copyful';
import { copy } from './copy';

export type Locales = 'en-us' | '1337';

export const getCopySomehow = <C extends Record<Locales, object>, L extends Locales>(
  copy: C,
  locale: L
) => copy[locale];

export const { CopyfulProvider, Copyful, useCopy } = createCopyful(getCopySomehow(copy, 'en-us'));
