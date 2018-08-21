/* @flow */

import React from 'react';
import InputElement from './examples/input/default';
import InputElementKeypress from './examples/input/keypress';
import KeyHandlerComponent from './examples/component';
import KeyHandlerDecorator from './examples/decorators/key-handler';
import KeyToggleHandlerDecorator from './examples/decorators/key-toggle-handler';

/**
 * App component.
 */

export default function App() {
  return (
    <div>
      <h1>
        <a
          href="https://github.com/ayrton/react-key-handler"
          target="_blank"
          rel="noopener noreferrer">
          react-key-handler
        </a>
      </h1>

      <KeyHandlerDecorator />
      <KeyToggleHandlerDecorator />
      <KeyHandlerComponent />
      <InputElement />
      <InputElementKeypress />
    </div>
  );
}
