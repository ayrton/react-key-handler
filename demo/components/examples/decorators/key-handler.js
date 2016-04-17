/* @flow */

import React from 'react';

import {keyHandler, KEYPRESS} from '../../../../lib';

type Props = {
  keyValue: ?string,
};


function Demo({keyValue}: Props): React$Element {
  return (
    <div>
      <h2>Decorator example:</h2>

      <p>Press <code>s</code> to <strong>open</strong> the menu.</p>

      {keyValue === 's' &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyHandler({keyEventName: KEYPRESS, keyValue: 's'})(Demo);
