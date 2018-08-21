/* @flow */

import App from './components/app';
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Render the application.
 */

const root = document.getElementById('app');
if (!root) throw new Error('No app id in document');

ReactDOM.render(<App />, root);
