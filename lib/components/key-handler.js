/* @flow */

import React from 'react';
import {canUseDOM} from 'exenv';

import {KEYUP} from '../constants/key-event-names';
import {isInput} from '../utils';

/**
 * Types.
 */

type Props = {
  keyEventName: string,
  keyCode: number,
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
    if (event.keyCode !== this.props.keyCode) {
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
  keyCode: number,
  keyEventName: ?string,
}

type State = {
  keyCode: ?number,
};

/**
 * KeyHandler decorators.
 */

export function keyHandler({keyCode, keyEventName}: DecoratorProps): Function {
  return (component) => {
    return class KeyHandleDecorator extends React.Component {
      state: State = { keyCode: null };

      constructor(props: any) {
        super(props);

        this.handleKey = this.handleKey.bind(this);
      }

      render(): ReactElement {
        return (
          <div>
            <KeyHandler keyCode={keyCode} keyEventName={keyEventName} onKeyHandle={this.handleKey} />

            {this.renderDecoratedComponent()}
          </div>
        );
      }

      renderDecoratedComponent(): ReactElement {
        const {keyCode} = this.state;

        return React.createElement(component, { ...this.props, keyCode });
      }

      handleKey(event: KeyboardEvent): void {
        this.setState({ keyCode: event.keyCode });
      }
    };
  };
}

export function keyToggleHandler({keyCode, keyEventName}: DecoratorProps): Function {
  return (component) => {
    return class KeyHandleDecorator extends React.Component {
      state: State = { keyCode: null };

      constructor(props: any) {
        super(props);

        this.handleToggleKey = this.handleToggleKey.bind(this);
      }

      render(): ReactElement {
        return (
          <div>
            <KeyHandler keyCode={keyCode} keyEventName={keyEventName} onKeyHandle={this.handleToggleKey} />

            {this.renderDecoratedComponent()}
          </div>
        );
      }

      renderDecoratedComponent(): ReactElement {
        const {keyCode} = this.state;

        return React.createElement(component, { ...this.props, keyCode });
      }

      handleToggleKey(event: KeyboardEvent): void {
        if (this.state.keyCode === event.keyCode) {
          return this.setState({ keyCode: null });
        }

        this.setState({ keyCode: event.keyCode });
      }
    };
  };
}

export * from '../constants/key-event-names';
export * from '../constants/key-codes';
