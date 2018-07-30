export default function triggerKeyEvent(eventName, keyCode, keyValue = undefined) {
  const event = new window.KeyboardEvent(eventName, { keyCode, key: keyValue });
  document.dispatchEvent(event);
}
