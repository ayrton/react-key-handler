/* @flow */

import React from 'react';
import ExampleBox from '../ExampleBox';

type code = {| code: string, value: string |}
type State = {
  codes: code[],
};

export default class CodeExplore extends React.Component<{||}, State> {
  state: State = { codes: [] };

  render() {
    const { codes } = this.state;
    const undefCodes: Array<code | void> = [undefined, undefined, undefined];
    const elements = undefCodes
      .concat(codes)
      .reverse()
      .slice(0, 3)
      .map((code, i) => {
        if (code === undefined) {
          return <li key={i}>...</li>;
        }
        return <li key={i}>{code.code} =&gt; {code.value}</li>;
      });

    return (
      <ExampleBox>
        <h2>Input&nbsp;
          <code>KeyboardEvent</code>&nbsp;
          <code>.code</code>&nbsp;
          and <code>.value</code>&nbsp;
          explore:
        </h2>

        <input onKeyPress={this.handleKeyPress} />

        <p>
          Last 3 values (code =&gt; value):
        </p>
        <ol>
          {elements}
        </ol>
      </ExampleBox>
    );
  }

  handleKeyPress = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const {codes} = this.state;

    codes.push({
      // $FlowFixMe
      code: e.nativeEvent.code,
      value: e.key,
    });
    if (codes.length > 3) {
      codes.shift();
    }

    this.setState({ codes });
  };
}
