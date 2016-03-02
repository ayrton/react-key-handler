/* @flow */

import React from 'react';

import {keyHandler} from '../../../lib';

type Props = {
  keyName: ?string,
};

const S = 's';

function Demo({keyName}: Props): ReactElement {
  return (
    <div>
      <h2>Decorator</h2>

      <p>Press <code>s</code> to <strong>open</strong> the menu.</p>

      {keyName === S &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyHandler({keyName: S})(Demo);
