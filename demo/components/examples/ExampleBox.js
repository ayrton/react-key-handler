/* @flow */

import * as React from 'react';

type Props = {
  children: React.Node,
};

const ExampleBox = ({ children }: Props) => (
  <div
    style={{
      border: '1px solid grey',
      borderRadius: '5px',
      padding: '5px',
      marginBottom: '10px',
    }}>
    {children}
  </div>
);

export default ExampleBox;
