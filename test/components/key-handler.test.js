import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import {mount, render} from 'enzyme';

import KeyHandler, {KEYUP, KEYDOWN, M} from 'components/key-handler';

describe('KeyHandler', () => {
  it('renders nothing', () => {
    const el = render(<KeyHandler />);
    expect(el).to.be.blank();
  });

  it('handles key up events when key code match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyCode={M} onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(true);
  });

  it('handles no key up events when no key code match', () => {
    const handler = sinon.spy();
    mount(<KeyHandler onKeyHandle={handler} />);

    triggerKeyEvent(KEYUP, M);

    expect(handler.calledOnce).to.equal(false);
  });

  it('handler key down events', () => {
    const handler = sinon.spy();
    mount(<KeyHandler keyCode={M} keyEventName={KEYDOWN} onKeyHandle={handler} />);

    triggerKeyEvent(KEYDOWN, M);

    expect(handler.calledOnce).to.equal(true);
  });
});

function triggerKeyEvent(eventName, keyCode) {
  const event = new window.KeyboardEvent(eventName, { keyCode });
  document.dispatchEvent(event);
}
