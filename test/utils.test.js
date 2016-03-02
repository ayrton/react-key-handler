import {expect} from 'chai';

import {isInput} from 'utils';

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
