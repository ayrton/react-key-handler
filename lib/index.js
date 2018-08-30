/* @flow */
import KeyHandler from './key-handler';

export default KeyHandler;
export { KEYDOWN, KEYPRESS, KEYUP } from './constants';
export {
  default as keyHandleDecorator,
  keyToggleHandler,
  keyHandler,
} from './key-handle-decorator';
