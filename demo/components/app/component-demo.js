/* @flow */

import React from 'react';

import KeyHandler, {S} from '../../../lib';

/**
 * Types.
 */

type State = {
  showMenu: boolean,
};

/**
 * ComponentDemo component.
 *
 * A demo to show how to use the component.
 */

export default class ComponentDemo extends React.Component {
  state: State = { showMenu: false };

  constructor(props: void): void {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  render(): ReactElement {
    const {showMenu} = this.state;

    return (
      <div>
        <KeyHandler keyCode={S} onKeyHandle={this.toggleMenu} />

        <h2>Component</h2>

        <p>Press 'S' to toggle the menu</p>

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
