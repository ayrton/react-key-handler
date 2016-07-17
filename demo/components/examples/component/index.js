/* @flow */

import React from 'react';

import KeyHandler, {KEYPRESS} from '../../../../lib';

type State = {
  showMenu: boolean,
};

export default class Component extends React.Component {
  state: State = { showMenu: false };

  toggleMenu: (event: KeyboardEvent) => void;

  constructor(props: void) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  render() {
    const { showMenu } = this.state;

    return (
      <div>
        <KeyHandler keyEventName={KEYPRESS} keyValue="s" onKeyHandle={this.toggleMenu} />

        <h2>Component example:</h2>

        <p>Press <code>s</code> to <strong>toggle</strong> the menu.</p>

        {showMenu &&
          <ol>
            <li>hello</li>
            <li>world</li>
          </ol>
        }
      </div>
    );
  }

  toggleMenu(event: KeyboardEvent): void {
    event.preventDefault();

    this.setState({ showMenu: !this.state.showMenu });
  }
}
