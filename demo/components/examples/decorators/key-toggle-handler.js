/* @flow */

import React from 'react';

import {keyToggleHandler, KEYPRESS} from '../../../../lib';

type Props = {
  keyValue: ?string,
};

function Demo({keyValue}: Props) {
  return (
    <div>
      <h2>Toggle Decorator example:</h2>

      <p>Press <code>s</code> to <strong>toggle</strong> the menu.</p>

      {keyValue === 's' &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyToggleHandler({keyEventName: KEYPRESS, keyValue: 's'})(Demo);
