/* @flow */

import React from 'react';

import KeyHandler, {S} from '../../../lib';

type State = {
  showMenu: boolean,
};

export default class Demo extends React.Component {
  state: State = { showMenu: false };

  constructor(props: void) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  render(): ReactElement {
    const {showMenu} = this.state;

    return (
      <div>
        <KeyHandler keyCode={S} onKeyHandle={this.toggleMenu} />

        <h2>Component</h2>

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
