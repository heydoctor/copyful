# ✏️ Copyful

[![codecov](https://codecov.io/gh/heydoctor/copyful/branch/master/graph/badge.svg?token=KRQ62D1GW7)](https://codecov.io/gh/heydoctor/copyful)
[![npm](https://img.shields.io/npm/v/copyful.svg)](https://www.npmjs.com/package/copyful)
[![npm](https://img.shields.io/npm/dm/copyful.svg)](https://npm-stat.com/charts.html?package=copyful&from=2017-05-19)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-brightgreen.svg)](http://standardjs.com/)
[![MIT License](https://img.shields.io/npm/l/copyful.svg?style=flat-square)](https://github.com/heydoctor/copyful/blob/master/LICENSE)

Statically, or dynamically, pull in product microcopy from a version controlled third party.

Product copy can become difficult to manage across product platforms as well as internal design and engineering tooling. Copy changes frequently and for many reasons (more clarity, typo, legal guidance, etc...) and engineering **must** be involved to make these changes. Sometimes the changes aren't straightforward - it becomes a hunt across repositories or copy has drifted across our web and native applications.

Copyful simplifies copy management by providing a simple way to consume and distribute copy across react applications.

## Usage

Install with npm or yarn.

```
npm install copyful
yarn add copyful
```

Instantiate Copyful with `createCopyful`.

```tsx
import React from 'react';
import { createCopyful } from './Copyful';

const copy = {
  header: {
    title: 'Welcome to {pageTitle}',
    subtitle: 'Freerange Organic Copy Management'
  }
}

export const {
  CopyfulProvider,
  useCopy
} = createCopyful(copy);

function App() {
  return (
    <CopyfulProvider>
      <HeaderSection />
    </CopyfulProvider>
  );
}
```

### Hooks

```tsx
function HeaderSection() {
  const context = {
    pageTitle: 'Copyful',
  };

  const { title, subtitle } = useCopy('header', context);

  return (
    <header className="header-section">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
}
```

### Render Prop

```tsx
function HeaderSection() {
  return (
    <Copyful copyKey="header" context={{ pageTitle: 'Copyful' }}>
      {({ title, subtitle }) => (
        <header className="header-section">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </header>
      )}
    </Copyful>
  );
}
```

### Example

Checkout `/example` for a working react app using Copyful, or pull down the repo and play with it locally
'yarn example'

## Remote Sources

Copyful also has built in support for pulling down your copy from remote sources via its CLI. To begin, it only has support for [Contentful](https://www.contentful.com) but in an extensisble and modular fashion, such that it should be easy to add other _adapters_ like Google Sheets or any other headless CMS.

### How It Works

The Copyful CLI will pull down the content from your remote source and transform it into a consistent structure we can recognize. The resulting output is a dynamically generated .js/.ts file so the typing may be inferred when importing and creating the `copyful` instance referenced above.

```ts
interface Copyful {
  [locale: string]: {
    [category: string]: {
      [name: string]: string;
    };
  };
}

// path-you-provided.ts
export const copy = {
  'en-us': {
    hero: {
      tagline: 'Easy, affordable, and secure online medical visits.',
    },
  },
};
```

### Commands

#### `clone`

- `adapter` _string_ The remote source you want to pull from. Defaults to `contentful`
- `path` _string_ The filepath in which you want the copy to be written to

```sh
$ npx copyful clone --adapter <adapter> --path app/assets/copy.js
```

### Sources

> Notes on any nuances or unique considerations for remote sources

##### Contentful

When cloning, ensure that `COPYFUL_CONTENTFUL_SPACE` and `COPYFUL_CONTENTFUL_ACCESS_TOKEN` are populated in your environment. Initially, we're quite opinionated on the data structure, both in Contentful and the resulting generated copy file.
