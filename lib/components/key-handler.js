/* @flow */

import React from 'react';

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
    if (!isDocumentAvailable()) return;

    window.document.addEventListener(this.props.keyEventName, this.handleKeyUp);
  }

  componentWillUnmount(): void {
    if (!isDocumentAvailable()) return;

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

/**
 * Check if `window.document` is available or not.
 */

function isDocumentAvailable() {
  return typeof window !== 'undefined' && window.document;
}

export * from '../constants/key-event-names';
export * from '../constants/key-codes';
