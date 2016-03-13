/* @flow */

import React from 'react';

import {keyToggleHandler} from '../../../lib';

type Props = {
  keyName: ?string,
};

function Demo({keyName}: Props): React$Element {
  return (
    <div>
      <h2>Input example:</h2>

      <p>
        Press <code>s</code> in the following form component and see that the key
        handle will be ignored.
      </p>

      <input />

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
