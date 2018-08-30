/* @flow */

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { light } from 'react-syntax-highlighter/styles/prism';

import {keyToggleHandler, KEYPRESS} from '../../../../lib';
import ExampleBox from '../ExampleBox';

type Props = {
  keyValue: ?string,
};

function Default({keyValue}: Props) {
  return (
    <ExampleBox>
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
      
      <h3>Code:</h3>
      <SyntaxHighlighter language='javascript' style={light}>
        {'keyToggleHandler({keyEventName: KEYPRESS, keyValue: \'s\'})(Component)'}
      </SyntaxHighlighter>
    </ExampleBox>
  );
}

export default keyToggleHandler({keyEventName: KEYPRESS, keyValue: 's'})(Default);
