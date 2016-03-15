/* @flow */

import React from 'react';

import InputElement from './examples/input/default';
import InputElementKeypress from './examples/input/keypress';
import KeyHandlerComponent from './demos/key-handler-component';
import KeyHandlerDecorator from './demos/key-handler-decorator';
import KeyToggleHandlerDecorator from './demos/key-toggle-handler-decorator';

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
