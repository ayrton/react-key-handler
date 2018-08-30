/* @flow */
import {KEYDOWN, KEYPRESS, KEYUP, KEY_CODE_KEYS, NORMALIZED_KEYS} from './constants';
import {type primitiveOrArray} from './types';

type KeyboardKey = {|
  +keyValue: ?primitiveOrArray<string>,
  +keyCode: ?primitiveOrArray<number>,
  +code: ?primitiveOrArray<string>,
|};

/**
 * Check if `given` element is an input / textarea form element or acts as one.
 */

export function isInput(element: HTMLElement): boolean {
  if (!element) {
    return false;
  }

  const {tagName} = element;
  const editable = isContentEditable(element);

  return tagName === 'INPUT' || tagName === 'TEXTAREA' || editable;
}

function isContentEditable(element: HTMLElement): boolean {
  if (typeof element.getAttribute !== 'function') {
    return false;
  }

  return !!element.getAttribute('contenteditable');
}

/**
 * Matches an event against a given keyboard key.
 */

function matchesElementOrArray<T>(a: T | T[], b: T) {
  if (Array.isArray(a)) {
    return a.includes(b);
  }
  return a === b;
}

export function matchesKeyboardEvent(event: KeyboardEvent, {keyCode, keyValue, code}: KeyboardKey): boolean {
  if (!isNullOrUndefined(keyValue)) {
    const value = eventKey(event);
    if (matchesElementOrArray(keyValue, value)) {
      return true;
    }
  }

  if (!isNullOrUndefined(code)) {
    if (matchesElementOrArray(code, event.code)) {
      return true;
    }
  }

  if (!isNullOrUndefined(keyCode)) {
    // Firefox handles keyCode through which
    const keyCodeTarget = event.keyCode || event.which;
    if (matchesElementOrArray(keyCode, keyCodeTarget)) {
      return true;
    }
  }

  return false;
}

function isNullOrUndefined(value): boolean {
  return (value === undefined) || (value === null);
}

export function eventKey(event: KeyboardEvent): string {
  const {key, keyCode, type} = event;

  if (key) {
    const normalizedKey = NORMALIZED_KEYS[key] || key;

    if (normalizedKey !== 'Unidentified') {
      return normalizedKey;
    }
  }

  if (type === KEYPRESS) {
    const charCode = eventCharCode(event);

    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }

  if (type === KEYDOWN || type === KEYUP) {
    return KEY_CODE_KEYS[String(keyCode)] || 'Unidentified';
  }

  return '';
}

function eventCharCode(event: KeyboardEvent): number {
  let {charCode, keyCode} = event;

  if ('charCode' in event) {
    if (charCode === 0 && keyCode === 13) {
      return 13;
    }
  } else {
    charCode = keyCode;
  }

  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}
