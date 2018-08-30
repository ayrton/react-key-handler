import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import {mount, render} from 'enzyme';
import triggerKeyEvent from './helpers/triggerKeyEvent';

import KeyHandler, {KEYUP, KEYDOWN} from '../../lib';

const M = 77;
const S = 83;
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';

describe('KeyHandler', () => {
  it('renders nothing', () => {
    const el = render(<KeyHandler />);
    expect(el).to.be.blank();
  });

  it('handles key up events when key value match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyValue={ARROW_LEFT} onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, undefined, ARROW_LEFT);

    expect(handler.calledOnce).to.equal(true);
  });

  it('handles more than one key value match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyValue={[ARROW_LEFT, ARROW_RIGHT]} onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, undefined, ARROW_LEFT);
    triggerKeyEvent(KEYUP, undefined, ARROW_RIGHT);
    triggerKeyEvent(KEYUP, undefined, 's');

    expect(handler.calledTwice).to.equal(true);
  });

  it('handles key up events when key code match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyCode={M} onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(true);
  });

  it('ignores key up events when no key value match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyValue={ARROW_LEFT} onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, undefined, ARROW_RIGHT);

    expect(handler.calledOnce).to.equal(false);
  });

  it('ignores key up events when no key code match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyCode={S} onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(false);
  });

  it('ignores key up events when no key code or no names are passed', () => {
    const handler = sinon.spy();
    mount(<KeyHandler onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(false);
  });

  it('handles key down events', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyCode={M} keyEventName={KEYDOWN} onKeyHandle={handler} />);

    triggerKeyEvent(KEYDOWN, M);

    expect(handler.calledOnce).to.equal(true);
  });

  // This make little sense - a user will not understand that there is a priority
  // the user wil most likely expect that the function gets called if any
  // of the matching criteria match.
  it.skip('prioritizes key value over code', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyCode={M} keyValue={ARROW_LEFT} onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(false);

    triggerKeyEvent(KEYUP, undefined, ARROW_LEFT);

    expect(handler.calledOnce).to.equal(true);
  });
});
