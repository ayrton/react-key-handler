/* @flow */

import React from 'react';

import {keyToggleHandler} from '../../../lib';

type Props = {
  keyName: ?string,
};

const S = 's';

function Demo({keyName}: Props): ReactElement {
  return (
    <div>
      <h2>Toggle Decorator</h2>

      <p>Press <code>s</code> to <strong>toggle</strong> the menu.</p>

      {keyName === S &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyToggleHandler({keyName: S})(Demo);
