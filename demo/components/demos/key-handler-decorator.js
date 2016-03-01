/* @flow */

import React from 'react';

import {keyHandler, S} from '../../../lib';

/**
 * Types.
 */

type Props = {
  keyCode: ?number,
};

/**
 * DecoratorDemo component.
 *
 * A demo to show how to use the decorator.
 */

function DecoratorDemo({keyCode}: Props) {
  return (
    <div>
      <h2>Decorator</h2>

      <p>Press <code>s</code> to <strong>open</strong> the menu.</p>

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
 * DecoratorDemo container.
 */

export default keyHandler({keyCode: S})(DecoratorDemo);
