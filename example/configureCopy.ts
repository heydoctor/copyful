import { createCopyful } from '../src/Copyful';
import copy from './copy.json';

export interface LocalesType {
  [key: string]: CopyType;
}
export interface CopyType {
  header: {
    title: string;
    subtitle: string;
    nested: {
      dynamicValues: string;
    };
  };
  body: string;
}

export const getCopySomehow = (locale: string) => {
  return (copy as LocalesType)[locale];
};

export const { CopyfulProvider, useCopy, withCopy } = createCopyful(
  getCopySomehow('1337')
);
