/* @flow */

import React from 'react';

import ComponentDemo from './component-demo';
import DecoratorDemo from './decorator-demo';

/**
 * App component.
 */

export default function App(): ReactElement {
  return (
    <div>
      <h1>react-key-handler</h1>

      <ComponentDemo />
      <DecoratorDemo />
    </div>
  );
}
