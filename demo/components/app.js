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

export default function App(): React$Element {
  return (
    <div>
      <h1>
        <a href="https://github.com/ayrton/react-key-handler" target="_blank">
          react-key-handler
        </a>
      </h1>

      <KeyHandlerDecorator />
      <KeyToggleHandlerDecorator/>
      <KeyHandlerComponent />
      <InputElement />
      <InputElementKeypress />
    </div>
  );
}
