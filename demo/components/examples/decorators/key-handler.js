/* @flow */

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { light } from 'react-syntax-highlighter/styles/prism';

import {keyHandler, KEYPRESS} from '../../../../lib';
import ExampleBox from '../ExampleBox';

type Props = {
  keyValue: ?string,
};


function Demo({keyValue}: Props) {
  return (
    <ExampleBox>
      <h2>Decorator example:</h2>

      <p>Press <code>s</code> to <strong>open</strong> the menu.</p>

      {keyValue === 's' &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }

      <h3>Code:</h3>
      <SyntaxHighlighter language='javascript' style={light}>
        {'keyHandler({keyEventName: KEYPRESS, keyValue: \'s\'})(Component)'}
      </SyntaxHighlighter>
    </ExampleBox>
  );
}

export default keyHandler({keyEventName: KEYPRESS, keyValue: 's'})(Demo);
