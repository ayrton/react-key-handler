/* @flow */

import React from 'react';

import {keyToggleHandler, S} from '../../../lib';

/**
 * Types.
 */

type Props = {
  keyCode: ?number,
};

/**
 * ToggleDecoratorDemo component.
 *
 * A demo to show how to use the toggle decorator.
 */

function DecoratorDemo({keyCode}: Props) {
  return (
    <div>
      <h2>Toggle Decorator</h2>

      <p>Press <code>s</code> to <strong>toggle</strong> the menu.</p>

      {keyCode === S &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

/**
 * ToggleDecoratorDemo container.
 */

export default keyToggleHandler({keyCode: S})(DecoratorDemo);
