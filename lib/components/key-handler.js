/* @flow */

import React from 'react';
import {canUseDOM} from 'exenv';

import {KEYDOWN, KEYPRESS, KEYUP} from '../constants';
import {isInput, matchesKeyboardEvent, eventKey, eventKeyName} from '../utils';

/**
 * KeyHandler component.
 */

export default class KeyHandler extends React.Component {
  props: {
    keyValue?: string,
    keyCode?: number,
    keyEventName: KEYDOWN | KEYPRESS | KEYUP,
    keyName?: string,
    onKeyHandle?: (event: KeyboardEvent) => void,
  };

  static propTypes = {
    keyValue: React.PropTypes.string,
    keyCode: React.PropTypes.number,
    keyEventName: React.PropTypes.oneOf([KEYDOWN, KEYPRESS, KEYUP]),
    keyName: React.PropTypes.string,
    onKeyHandle: React.PropTypes.func,
  };

  handleKey: (event: KeyboardEvent) => void;

  static defaultProps = {
    keyEventName: KEYUP,
  };

  shouldComponentUpdate(): boolean {
    return false;
  }

  constructor(props) {
    super(props);

    /* eslint-disable no-console */

    if (!props.keyValue && !props.keyCode && !props.keyName) {
      console.error('Warning: Failed propType: Missing prop `keyValue`, `keyCode` or `keyName` for `KeyHandler`.');
    }

    if (props.keyName) {
      console.error('Warning: Failed propType: Do not use deprecated prop `keyName`, use `keyValue` or `keyCode` instead for `KeyHandler`.');
    }

    /* eslint-enable */

    this.handleKey = this.handleKey.bind(this);
  }

  componentDidMount(): void {
    if (!canUseDOM) return;

    window.document.addEventListener(this.props.keyEventName, this.handleKey);
  }

  componentWillUnmount(): void {
    if (!canUseDOM) return;

    window.document.removeEventListener(this.props.keyEventName, this.handleKey);
  }

  render(): null {
    return null;
  }

  handleKey(event: KeyboardEvent): void {
    const {keyValue, keyCode, keyName, onKeyHandle} = this.props;

    if (!onKeyHandle) {
      return;
    }

    const {target} = event;

    if (target instanceof window.HTMLElement && isInput(target)) {
      return;
    }

    if (!matchesKeyboardEvent(event, {keyValue, keyCode, keyName})) {
      return;
    }

    onKeyHandle(event);
  }
}

/**
 * Types.
 */

type DecoratorProps = {
  keyValue?: string,
  keyCode?: number,
  keyName?: string,
  keyEventName?: string,
}

type State = {
  keyValue: ?string,
  keyCode: ?number,
  keyName: ?string,
};

/**
 * KeyHandler decorators.
 */

function keyHandleDecorator(matcher: ?Function = null): Function {
  return function(props: DecoratorProps): Function {
    const { keyValue, keyCode, keyName, keyEventName } = props || {};

    return (Component) => (
      class KeyHandleDecorator extends React.Component {
        state: State = { keyValue: null, keyCode: null, keyName: null };

        handleKey: (event: KeyboardEvent) => void;

        constructor(props) {
          super(props);

          this.handleKey = this.handleKey.bind(this);
        }

        render() {
          return (
            <div>
              <KeyHandler keyValue={keyValue} keyCode={keyCode} keyEventName={keyEventName} keyName={keyName} onKeyHandle={this.handleKey} />
              <Component {...this.props} {...this.state} />
            </div>
          );
        }

        handleKey(event: KeyboardEvent): void {
          if (matcher && matcher(event, this.state)) {
            this.setState({ keyValue: null, keyCode: null, keyName: null });
          } else {
            this.setState({ keyValue: eventKey(event), keyCode: event.keyCode, keyName: eventKeyName(event) });
          }
        }
      }
    );
  };
}

export const keyHandler = keyHandleDecorator();
export const keyToggleHandler = keyHandleDecorator(matchesKeyboardEvent);

/**
 * Constants
 */

export * from '../constants';
