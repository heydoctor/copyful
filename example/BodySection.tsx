import React from 'react';
import { withCopy, CopyType } from './configureCopy';

const BodySection = ({ copy }: { copy: CopyType }) => {
  return <div>{copy.body}</div>;
};
export default withCopy(BodySection);
