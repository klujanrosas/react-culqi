# react-culqi

> A React library for integration with Culqi payments processor.

[![NPM registry](https://img.shields.io/npm/v/react-culqi.svg?style=for-the-badge)](https://yarnpkg.com/en/package/react-culqi)
[![Travis CI](https://img.shields.io/travis/com/klujanrosas/react-culqi/master.svg?longCache=true&style=for-the-badge)](https://travis-ci.com/klujanrosas/react-culqi)

## Install

```bash
# Yarn
yarn add react-culqi

# NPM
npm install --save react-culqi
```

## Usage

See an interactive example at:

[![Edit react-culqi](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/v68m7719p3)

```jsx
import { CulqiProvider, Culqi } from 'react-culqi';

const App = () => {
  return (
    <CulqiProvider
      publicKey="your-culqi-public-key-here"
      onToken={token => {
        /* handle a successful token */
      }}
      onError={error => {
        /* handle an error during tokenization */
      }}
    >
      <Culqi>
        {({ openCulqi, setAmount, amount }) => {
          return <button onClick={openCulqi}>Open Culqi</button>;
        }}
      </Culqi>
    </CulqiProvider>
  );
};
```

## License

MIT © [klujanrosas](https://github.com/klujanrosas)
