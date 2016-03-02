/* @flow */

import React from 'react';

import {keyToggleHandler, S} from '../../../lib';

type Props = {
  keyCode: ?number,
};

function Demo({keyCode}: Props): ReactElement {
  return (
    <div>
      <h2>Input</h2>

      <p>
        Press <code>s</code> in the following form component and see that the key
        is not being handled.
      </p>

      <input />

      {keyCode === S &&
        <p>Pressed <code>s</code></p>
      }
    </div>
  );
}

export default keyToggleHandler({keyCode: S})(Demo);
