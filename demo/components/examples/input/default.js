/* @flow */

import React from 'react';

import {keyToggleHandler} from '../../../../lib';

type Props = {
  keyValue: ?string,
};

function Default({keyValue}: Props): React$Element {
  return (
    <div>
      <h2>Input example:</h2>

      <p>
        Press <code>s</code> in the following form component and see that the key
        handle will be ignored by default.
      </p>

      <input />

      {keyValue === 's' &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyToggleHandler({keyValue: 's'})(Default);
