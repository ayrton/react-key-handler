/* @flow */

import React from 'react';

import {keyToggleHandler, S} from '../../../lib';

type Props = {
  keyCode: ?number,
};

function Demo({keyCode}: Props) {
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

export default keyToggleHandler({keyCode: S})(Demo);
