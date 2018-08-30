/* @flow */

import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { light } from 'react-syntax-highlighter/styles/prism';

import ExampleBox from '../ExampleBox';
import KeyHandler, { KEYPRESS } from '../../../../lib';

type State = {
  showMenu: boolean,
};

export default class Component extends React.Component<{||}, State> {
  state: State = { showMenu: false };

  render() {
    const { showMenu } = this.state;

    return (
      <ExampleBox>
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="s"
          onKeyHandle={this.toggleMenu}
        />
        <h2>Component example:</h2>

        <p>
          Press <code>s</code> to <strong>toggle</strong> the menu.
        </p>

        {showMenu && (
          <ol>
            <li>hello</li>
            <li>world</li>
          </ol>
        )}

        <h3>Code:</h3>
        <SyntaxHighlighter language="javascript" style={light}>
          {`<KeyHandler
  keyEventName={KEYPRESS}
  keyValue="s"
  onKeyHandle={this.toggleMenu}
/>`}
        </SyntaxHighlighter>
      </ExampleBox>
    );
  }

  toggleMenu = (event: KeyboardEvent) => {
    event.preventDefault();

    this.setState({ showMenu: !this.state.showMenu });
  };
}
