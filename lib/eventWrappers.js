'use strict';

exports.__esModule = true;

var _wrapKeyDownEvent;

var wrapKeyDownEvent = (exports.wrapKeyDownEvent = function wrapKeyDownEvent(availablekeys) {
  return function(handler) {
    return function(_ref) {
      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      var keyCode = _ref.keyCode;

      if (keyCode in availablekeys) {
        handler.apply(undefined, params);
      }
    };
  };
});

var KEY_CODES = (exports.KEY_CODES = {
  Backspace: 8,
  Tab: 9,
  Enter: 13,
  Shift: 16,
  Ctrl: 17,
  Alt: 18,
  PauseBreak: 19,
  CapsLock: 20,
  Escape: 27,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  LeftArrow: 37,
  UpArrow: 38,
  RightArrow: 39,
  DownArrow: 40,
  Insert: 45,
  Delete: 46,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  LeftWindowKey: 91,
  RightWindowKey: 92,
  SelectKey: 93,
  NumPad0: 96,
  NumPad1: 97,
  NumPad2: 98,
  NumPad3: 99,
  NumPad4: 100,
  NumPad5: 101,
  NumPad6: 102,
  NumPad7: 103,
  NumPad8: 104,
  NumPad9: 105,
  Multiply: 106,
  Add: 107,
  Subtract: 109,
  DecimalPoint: 110,
  Divide: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F12: 123,
  NumLock: 144,
  ScrollLock: 145,
  SemiColon: 186,
  EqualSign: 187,
  Comma: 188,
  Dash: 189,
  Period: 190,
  ForwardSlash: 191,
  GraveAccent: 192,
  OpenBracket: 219,
  BackSlash: 220,
  CloseBracket: 221,
  SingleQuote: 222,
});

var submitEvent = (exports.submitEvent = wrapKeyDownEvent(
  ((_wrapKeyDownEvent = {}), (_wrapKeyDownEvent[KEY_CODES.Enter] = null), _wrapKeyDownEvent),
));