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
      <h2>Input</h2>

      <p>
        Press <code>s</code> in the following form component and see that the key
        is not being handled.
      </p>

      <input />

      {keyName === S &&
        <p>Pressed <code>s</code></p>
      }
    </div>
  );
}

export default keyToggleHandler({keyName: S})(Demo);
