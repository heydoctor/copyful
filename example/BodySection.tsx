import React from 'react';
import { withCopy } from './configureCopy';

const BodySection = ({ copy }: { copy: string }) => {
  return <div>{copy}</div>;
};
export default withCopy(BodySection, 'body');
