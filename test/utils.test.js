import {expect} from 'chai';

import {isInput, matchesKeyboardEvent} from 'utils';

describe('isInput', () => {
  it('returns true if the element is an input', () => {
    expect(isInput({ tagName: 'INPUT' })).to.be.true;
  });

  it('returns true if the element is a textarea', () => {
    expect(isInput({ tagName: 'TEXTAREA' })).to.be.true;
  });

  it('returns false if the element is falsey', () => {
    expect(isInput(null)).to.be.false;
  });

  it('returns false if the element is not an input or textarea', () => {
    expect(isInput({ tagName: 'A' })).to.be.false;
  });
});

describe('matchesKeyboardEvent', () => {
  describe('matches KeyboardEvent.key against', () => {
    const arrowUpValueEvent = new window.KeyboardEvent('keyup', {key: 'ArrowUp'});

    it('keyValue Props property', () => {
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyValue: 'ArrowUp'})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyValue: 'ArrowDown'})).to.be.false;
    });

    it('keyCode Props property', () => {
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyCode: 38})).to.be.false;
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyCode: 40})).to.be.false;
    });

    it('keyName Props property', () => {
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyName: 'up'})).to.be.false;
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyName: 'down'})).to.be.false;
    });
  });

  describe('matches KeyboardEvent.keyCode against', () => {
    const arrowUpCodeEvent = new window.KeyboardEvent('keyup', {keyCode: 38});

    it('keyValue Props property', () => {
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyValue: 'ArrowUp'})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyValue: 'ArrowDown'})).to.be.false;
    });

    it('keyCode Props property', () => {
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyCode: 38})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyCode: 40})).to.be.false;
    });

    it('keyName Props property', () => {
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyName: 'up'})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyName: 'down'})).to.be.false;
    });
  });
});
