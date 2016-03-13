/* @flow */

import React from 'react';
import keyNames from 'keycodes';
import {canUseDOM} from 'exenv';

import {KEYDOWN, KEYPRESS, KEYUP} from '../constants';
import {isInput, keyValues, matchesKeyboardEvent} from '../utils';

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

  handleKey: (event: KeyboardEvent) => void;

  static defaultProps = {
    keyEventName: KEYUP,
  };

  shouldComponentUpdate(): boolean {
    return false;
  }

  constructor(props) {
    super(props);

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

    if (!matchesKeyboardEvent(event, {keyValue, keyCode, keyName})) {
      return;
    }

    const {target} = event;

    if (target instanceof window.HTMLElement) {
      if (isInput(target)) {
        return;
      }
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

export function keyHandler({keyValue, keyCode, keyName, keyEventName}: DecoratorProps): Function {
  return (component) => {
    return class KeyHandleDecorator extends React.Component {
      state: State = { keyValue: null, keyCode: null, keyName: null };

      handleKey: (event: KeyboardEvent) => void;

      constructor(props) {
        super(props);

        this.handleKey = this.handleKey.bind(this);
      }

      render(): React$Element {
        return (
          <div>
            <KeyHandler keyValue={keyValue} keyCode={keyCode} keyEventName={keyEventName} keyName={keyName} onKeyHandle={this.handleKey} />

            {this.renderDecoratedComponent()}
          </div>
        );
      }

      renderDecoratedComponent(): React$Element {
        const {keyValue, keyCode, keyName} = this.state;

        return React.createElement(component, { ...this.props, keyValue, keyCode, keyName });
      }

      handleKey(event: KeyboardEvent): void {
        this.setState({ keyValue: event.key || keyValues(keyNames(event.keyCode)), keyCode: event.keyCode, keyName: keyNames(event.keyCode) });
      }
    };
  };
}

export function keyToggleHandler({keyValue, keyCode, keyName, keyEventName}: DecoratorProps): Function {
  return (component) => {
    return class KeyHandleDecorator extends React.Component {
      state: State = { keyValue: null, keyCode: null, keyName: null };

      handleToggleKey: (event: KeyboardEvent) => void;

      constructor(props) {
        super(props);

        this.handleToggleKey = this.handleToggleKey.bind(this);
      }

      render(): React$Element {
        return (
          <div>
            <KeyHandler keyValue={keyValue} keyCode={keyCode} keyEventName={keyEventName} keyName={keyName} onKeyHandle={this.handleToggleKey} />

            {this.renderDecoratedComponent()}
          </div>
        );
      }

      renderDecoratedComponent(): React$Element {
        const {keyValue, keyCode, keyName} = this.state;

        return React.createElement(component, { ...this.props, keyValue, keyCode, keyName });
      }

      handleToggleKey(event: KeyboardEvent): void {
        const {keyValue, keyCode, keyName} = this.state;

        if (matchesKeyboardEvent(event, {keyValue, keyCode, keyName})) {
          this.setState({ keyValue: null, keyCode: null, keyName: null });
          return;
        }

        this.setState({ keyValue: event.key || keyValues(keyNames(event.keyCode)), keyCode: event.keyCode, keyName: keyNames(event.keyCode) });
      }
    };
  };
}

export * from '../constants';
