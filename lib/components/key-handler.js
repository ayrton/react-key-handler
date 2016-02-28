/* @flow */

import React from 'react';
import {canUseDOM} from 'exenv';

import {KEYUP} from '../constants/key-event-names';

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
    if (event.keyCode !== this.props.keyCode) return;

    this.props.onKeyHandle(event);
  }
}

/**
 * Types.
 */

type State = {
  keyCode: ?number,
};

/**
 * Decorated a component with given pressed keyCode.
 */

export function keyHandler({keyCode}) {
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
            <KeyHandler keyCode={keyCode} onKeyHandle={this.handleKey} />

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

export * from '../constants/key-event-names';
export * from '../constants/key-codes';
