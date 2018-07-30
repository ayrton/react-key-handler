import {expect} from 'chai';
import {JSDOM} from 'jsdom';

import {isInput, matchesKeyboardEvent, eventKey} from 'utils';

describe('isInput', () => {
  it('returns true if the element is an input', () => {
    expect(isInput({ tagName: 'INPUT' })).to.be.true;
  });

  it('returns true if the element is a textarea', () => {
    expect(isInput({ tagName: 'TEXTAREA' })).to.be.true;
  });

  it('returns true if the element is contenteditable', () => {
    expect(isInput({ getAttribute: function() { return true; } })).to.be.true;
  });

  it('returns false if the element is not contenteditable', () => {
    expect(isInput({ getAttribute: function() { return false; } })).to.be.false;
  });

  it('returns false if the element is not an input or textarea', () => {
    expect(isInput({ tagName: 'A' })).to.be.false;
  });

  it('returns false if the element is falsey', () => {
    expect(isInput(null)).to.be.false;
  });
});

const getKeyboardEvent = (eventName: string, opts: {| key?: string, keyCode?: number |}) => {
  const { window: testWindow } = (new JSDOM('', { runScripts: 'dangerously' }));
  return new testWindow.KeyboardEvent(eventName, opts);
};

describe('matchesKeyboardEvent', () => {
  describe('matches KeyboardEvent.key against', () => {
    const arrowUpValueEvent = getKeyboardEvent('keyup', {key: 'ArrowUp'});

    it('keyValue Props property', () => {
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyValue: 'ArrowUp'})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyValue: 'ArrowDown'})).to.be.false;
    });

    it('keyCode Props property', () => {
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyCode: 38})).to.be.false;
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyCode: 40})).to.be.false;
    });
  });

  describe('matches KeyboardEvent.keyCode against', () => {
    const arrowUpCodeEvent = getKeyboardEvent('keyup', {keyCode: 38});

    it('keyValue Props property', () => {
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyValue: 'ArrowUp'})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyValue: 'ArrowDown'})).to.be.false;
    });

    it('keyCode Props property', () => {
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyCode: 38})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyCode: 40})).to.be.false;
    });
  });
});

describe('eventKey', () => {
  it('normalizes keys', () => {
    const event = getKeyboardEvent('keyup', {key: 'Esc'});
    expect(eventKey(event)).to.equal('Escape');
  });

  it('returns valid keys', () => {
    const event = getKeyboardEvent('keyup', {key: 'Escape'});
    expect(eventKey(event)).to.equal('Escape');
  });

  it('returns Unidentified key', () => {
    const event = getKeyboardEvent('keyup', {key: 'Unidentified'});
    expect(eventKey(event)).to.equal('Unidentified');
  });

  it('ignores Unidentified key in favor of key codes', () => {
    const event = getKeyboardEvent('keyup', {key: 'Unidentified', keyCode: 38});
    expect(eventKey(event)).to.equal('ArrowUp');
  });

  it('translates key codes', () => {
    const event = getKeyboardEvent('keyup', {keyCode: 38});
    expect(eventKey(event)).to.equal('ArrowUp');
  });

  it('falls back to Unidentified for unknown key code keys', () => {
    const event = getKeyboardEvent('keyup', {keyCode: 1337});
    expect(eventKey(event)).to.equal('Unidentified');
  });

  it('supports enter on key press', () => {
    const event = getKeyboardEvent('keypress', {keyCode: 13});
    expect(eventKey(event)).to.equal('Enter');
  });
});
