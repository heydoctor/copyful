# Copyful

Statically, or dynamically, pull in product microcopy from a version controlled third party.

Product copy can become difficult to manage across product platforms as well as internal design and engineering tooling. Copy changes frequently and for many reasons (more clarity, typo, legal guidance, etc...) and engineering **must** be involved to make these changes. Sometimes the changes aren't straightforward - it becomes a hunt across repositories or copy has drifted across our web and native applications.

Copyful simplifies copy management by providing a simple way to consume and distribute copy across react applications.

## Usage
Install with npm or yarn.
```
npm install --save copyful
```

Instantiate Copyful with `createCopyful`.
```javascript
import React from "react";
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
} = createCopyful(copy));

function App() {
  return (
    <CopyfulProvider>
      <HeaderSection />
    </CopyfulProvider>
  );
}
```

### Hooks
This is the recommended usage for apps using React 16.8+
```javascript
function HeaderSection() {
  const context = {
    pageTitle: 'Copyful'
  };
  const { title, subtitle } = useCopy(context).header;

  return (
    <header className="header-section">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </header>
  );
}
```

## Coming Soon
### HOC
For React < 16.8; Wrap your app with the provider, and access copy through props.
```javascript
function HeaderSection({copy}) {
  return (
    <header className="header-section">
      <h1>{copy.title}</h1>
      <h2>{copy.subtitle}</h2>
    </header>
  );
}

export default withCopy(HeaderSection)
```