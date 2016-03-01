/* @flow */

import React from 'react';

import {keyHandler, S} from '../../../lib';

type Props = {
  keyCode: ?number,
};

function Demo({keyCode}: Props) {
  return (
    <div>
      <h2>Decorator</h2>

      <p>Press <code>s</code> to <strong>open</strong> the menu.</p>

      {keyCode === S &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyHandler({keyCode: S})(Demo);
