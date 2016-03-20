/* @flow */

import keyNames from 'keycodes';

import {KEYDOWN, KEYPRESS, KEYUP} from './constants';

const NORMALIZED_KEYS = {
  'Esc': 'Escape',
  'Spacebar': ' ',
  'Left': 'ArrowLeft',
  'Up': 'ArrowUp',
  'Right': 'ArrowRight',
  'Down': 'ArrowDown',
  'Del': 'Delete',
  'Win': 'OS',
  'Menu': 'ContextMenu',
  'Apps': 'ContextMenu',
  'Scroll': 'ScrollLock',
  'MozPrintableKey': 'Unidentified',
};

const KEY_CODE_KEYS = {
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  45: 'Insert',
  46: 'Delete',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
  144: 'NumLock',
  145: 'ScrollLock',
  224: 'Meta',
};

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
    return KEY_CODE_KEYS[keyCode] || 'Unidentified';
  }

  return '';
}

export function eventKeyName(event: KeyboardEvent): string {
  return keyNames(event.keyCode);
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
