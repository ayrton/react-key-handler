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

  constructor(props: Props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount(): void {
    if (!canUseDOM) return;

    window.document.addEventListener(this.props.keyEventName, this.handleKeyUp);
  }

  componentWillUnmount(): void {
    if (!canUseDOM) return;

    window.document.removeHandler(this.props.keyEventName, this.handleKeyUp);
  }

  render(): null {
    return null;
  }

  handleKeyUp(event: KeyboardEvent): void {
    if (event.keyCode !== this.props.keyCode) return;

    this.props.onKeyHandle(event);
  }
}

export * from '../constants/key-event-names';
export * from '../constants/key-codes';
