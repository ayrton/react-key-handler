/* @flow */

import {eventKey, eventKeyName} from './synthetic-keyboard-event';

/**
 * Types.
 */

type Props = {
  keyValue: ?string,
  keyCode: ?number,
  keyName: ?string
};

/**
 * Check if `given` element is an input or textarea form element.
 */

export function isInput(element: HTMLElement): boolean {
  if (!element) {
    return false;
  }

  const {tagName} = element;

  return tagName === 'INPUT' || tagName === 'TEXTAREA';
}

/**
 * Matches an event against a given keyboard key.
 */

export function matchesKeyboardEvent(event: KeyboardEvent, {keyCode, keyValue, keyName}: Props): boolean {
  if (keyCode !== undefined && keyCode !== null) {
    return keyCode === event.keyCode;
  }

  if (keyValue !== undefined && keyValue !== null) {
    return keyValue === eventKey(event);
  }

  if (keyName !== undefined && keyName !== null) {
    return keyName === eventKeyName(event);
  }

  return false;
}
