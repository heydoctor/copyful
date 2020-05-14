import React from 'react';
import { useCopy } from './configureCopy';

const HeaderSection = () => {
  const context = {
    someNumber: 4815162342,
    someString: 'Hello World!',
  };

  const { title, subtitle, dynamicValues } = useCopy('header', context);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>{dynamicValues}</p>
      </header>
    </div>
  );
};

export default HeaderSection;
