/* @flow */

import React from 'react';

import InputElement from './demos/input-element';
import KeyHandlerComponent from './demos/key-handler-component';
import KeyHandlerDecorator from './demos/key-handler-decorator';
import KeyToggleHandlerDecorator from './demos/key-toggle-handler-decorator';

/**
 * App component.
 */

export default function App(): ReactElement {
  return (
    <div>
      <h1>react-key-handler</h1>

      <KeyHandlerDecorator />
      <KeyToggleHandlerDecorator/>
      <KeyHandlerComponent />
      <InputElement />
    </div>
  );
}
