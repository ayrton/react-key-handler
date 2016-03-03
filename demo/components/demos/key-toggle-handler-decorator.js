/* @flow */

import React from 'react';

import {keyToggleHandler} from '../../../lib';

type Props = {
  keyName: ?string,
};

function Demo({keyName}: Props): ReactElement {
  return (
    <div>
      <h2>Toggle Decorator example:</h2>

      <p>Press <code>s</code> to <strong>toggle</strong> the menu.</p>

      {keyName === 's' &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyToggleHandler({keyName: 's'})(Demo);
