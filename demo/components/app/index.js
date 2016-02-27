/* @flow */

import React from 'react';

import KeyHandler, {M} from '../../../lib';

/**
 * Types.
 */

type State = {
  showMenu: boolean,
};

/**
 * App component.
 */

export default class App extends React.Component {
  state: State = { showMenu: false };

  constructor(props: void): void {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  render(): ReactElement {
    const {showMenu} = this.state;

    return (
      <div>
        <KeyHandler keyCode={M} onKeyHandle={this.toggleMenu} />

        <h1>react-key-handler</h1>
        <p>Press 'M' to toggle the menu</p>

        {showMenu &&
          <ol>
            <li>hello</li>
            <li>world</li>
          </ol>
        }
      </div>
    );
  }

  toggleMenu(event: KeyboardEvent) {
    event.preventDefault();

    this.setState({ showMenu: !this.state.showMenu });
  }
}
