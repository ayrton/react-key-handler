/* @flow */

import React from 'react';

import {keyHandler} from '../../../lib';

type Props = {
  keyName: ?string,
};


function Demo({keyName}: Props): ReactElement {
  return (
    <div>
      <h2>Decorator example:</h2>

      <p>Press <code>s</code> to <strong>open</strong> the menu.</p>

      {keyName === 's' &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyHandler({keyName: 's'})(Demo);
