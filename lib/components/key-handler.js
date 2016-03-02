/* @flow */

import React from 'react';
import keyNames from 'keycodes';
import {canUseDOM} from 'exenv';

import {KEYUP} from '../constants';
import {isInput} from '../utils';

/**
 * Types.
 */

type Props = {
  keyCode: ?number,
  keyEventName: string,
  keyName: ?string,
  onKeyHandle: Function,
};

/**
 * KeyHandler component.
 */

export default class KeyHandler extends React.Component {
  props: Props;

  static defaultProps = {
    keyEventName: KEYUP,
  };

  shouldComponentUpdate(): boolean {
    return false;
  }

  constructor(props: Props) {
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
    const keyCode = this.props.keyCode || keyNames(this.props.keyName);

    if (event.keyCode !== keyCode) {
      return;
    }

    const {target} = event;

    if (target instanceof window.HTMLElement) {
      if (isInput(target)) {
        return;
      }
    }

    this.props.onKeyHandle(event);
  }
}

/**
 * Types.
 */

type DecoratorProps = {
  keyCode: ?number,
  keyName: ?string,
  keyEventName: ?string,
}

type State = {
  keyCode: ?number,
  keyName: ?string,
};

/**
 * KeyHandler decorators.
 */

export function keyHandler({keyCode, keyName, keyEventName}: DecoratorProps): Function {
  return (component) => {
    return class KeyHandleDecorator extends React.Component {
      state: State = { keyCode: null, keyName: null };

      constructor(props: any) {
        super(props);

        this.handleKey = this.handleKey.bind(this);
      }

      render(): ReactElement {
        return (
          <div>
            <KeyHandler keyCode={keyCode} keyEventName={keyEventName} keyName={keyName} onKeyHandle={this.handleKey} />

            {this.renderDecoratedComponent()}
          </div>
        );
      }

      renderDecoratedComponent(): ReactElement {
        const {keyCode, keyName} = this.state;

        return React.createElement(component, { ...this.props, keyCode, keyName });
      }

      handleKey(event: KeyboardEvent): void {
        this.setState({ keyCode: event.keyCode, keyName: keyNames(event.keyCode) });
      }
    };
  };
}

export function keyToggleHandler({keyCode, keyName, keyEventName}: DecoratorProps): Function {
  return (component) => {
    return class KeyHandleDecorator extends React.Component {
      state: State = { keyCode: null, keyName: null };

      constructor(props: any) {
        super(props);

        this.handleToggleKey = this.handleToggleKey.bind(this);
      }

      render(): ReactElement {
        return (
          <div>
            <KeyHandler keyCode={keyCode} keyEventName={keyEventName} keyName={keyName} onKeyHandle={this.handleToggleKey} />

            {this.renderDecoratedComponent()}
          </div>
        );
      }

      renderDecoratedComponent(): ReactElement {
        const {keyCode, keyName} = this.state;

        return React.createElement(component, { ...this.props, keyCode, keyName });
      }

      handleToggleKey(event: KeyboardEvent): void {
        if (this.state.keyCode === event.keyCode) {
          return this.setState({ keyCode: null, keyName: null });
        }

        this.setState({ keyCode: event.keyCode, keyName: keyNames(event.keyCode) });
      }
    };
  };
}

export * from '../constants';
