import React from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/xq-light.css';
import './app.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}