import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import jsdom from 'jsdom';
import path from 'path';
import requirePaths from 'app-module-path';

requirePaths.addPath(
  path.join(__dirname, '..', '..', 'lib')
);

global.window = jsdom.jsdom().defaultView;
global.document = global.window.document;

chai.use(chaiEnzyme());
