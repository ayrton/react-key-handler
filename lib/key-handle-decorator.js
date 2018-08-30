/* @flow */

import React from 'react';

import KeyHandler from './key-handler';
import { type KeyConstants } from './constants';
import { matchesKeyboardEvent, eventKey } from './utils';
import { type primitiveOrArray } from './types';

export type KeyhandleDecoratorState = {|
  keyValue?: ?primitiveOrArray<string>,
  keyCode: ?primitiveOrArray<number>,
  code: ?primitiveOrArray<string>,
|};

export type DecoratorProps = {|
  keyValue: ?primitiveOrArray<string>,
  keyCode: ?primitiveOrArray<number>,
  code: ?primitiveOrArray<string>,
  keyEventName?: KeyConstants,
|};

export default function keyHandleDecorator<T>(
  matcher?: typeof matchesKeyboardEvent,
): Function {
  return (props?: DecoratorProps & T): Function => {
    const { keyValue, keyCode, code, keyEventName } = props || {};

    return Component =>
      class KeyHandleDecorator extends React.Component<
        T,
        KeyhandleDecoratorState,
      > {
        state: KeyhandleDecoratorState = {
          keyCode: null,
          keyValue: null,
          code: null,
        };

        render() {
          return (
            <React.Fragment>
              <KeyHandler
                keyValue={keyValue}
                keyCode={keyCode}
                code={code}
                keyEventName={keyEventName}
                onKeyHandle={this.handleKey}
              />
              <Component {...this.props} {...this.state} />
            </React.Fragment>
          );
        }

        handleKey = (event: KeyboardEvent): void => {
          if (matcher && matcher(event, this.state)) {
            this.setState({ keyValue: null, keyCode: null });
            return;
          }

          this.setState({ keyValue: eventKey(event), keyCode: event.keyCode });
        };
      };
  };
}

export const keyHandler = keyHandleDecorator();
export const keyToggleHandler = keyHandleDecorator(matchesKeyboardEvent);
