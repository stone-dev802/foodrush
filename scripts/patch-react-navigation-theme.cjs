const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const fallbackThemeJs = `{
  dark: false,
  colors: {
    primary: '#F97316',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#0F172A',
    border: '#E2E8F0',
    notification: '#F97316'
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '900' }
  }
}`;

const files = [
  {
    file: 'node_modules/@react-navigation/native/lib/commonjs/theming/ThemeContext.js',
    content: `"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeContext = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(), t = new WeakMap();
  return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e);
}

function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n.default = e, t && t.set(e, n), n;
}

const fallbackTheme = ${fallbackThemeJs};
const ThemeContext = exports.ThemeContext = React.createContext(fallbackTheme);
`
  },
  {
    file: 'node_modules/@react-navigation/native/lib/module/theming/ThemeContext.js',
    content: `import * as React from 'react';

const fallbackTheme = ${fallbackThemeJs};

export const ThemeContext = React.createContext(fallbackTheme);
`
  },
  {
    file: 'node_modules/@react-navigation/native/src/theming/ThemeContext.tsx',
    content: `import * as React from 'react';

const fallbackTheme = ${fallbackThemeJs};

export const ThemeContext = React.createContext(fallbackTheme);
`
  },
  {
    file: 'node_modules/@react-navigation/native/lib/commonjs/theming/useTheme.js',
    content: `"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = useTheme;

var React = _interopRequireWildcard(require("react"));
var _ThemeContext = require("./ThemeContext.js");

function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(), t = new WeakMap();
  return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e);
}

function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n.default = e, t && t.set(e, n), n;
}

const fallbackTheme = ${fallbackThemeJs};

function useTheme() {
  return React.useContext(_ThemeContext.ThemeContext) ?? fallbackTheme;
}
`
  },
  {
    file: 'node_modules/@react-navigation/native/lib/module/theming/useTheme.js',
    content: `import * as React from 'react';
import { ThemeContext } from './ThemeContext.js';

const fallbackTheme = ${fallbackThemeJs};

export function useTheme() {
  return React.useContext(ThemeContext) ?? fallbackTheme;
}
`
  },
  {
    file: 'node_modules/@react-navigation/native/src/theming/useTheme.tsx',
    content: `import * as React from 'react';
import { ThemeContext } from './ThemeContext';

const fallbackTheme = ${fallbackThemeJs};

export function useTheme() {
  return React.useContext(ThemeContext) ?? fallbackTheme;
}
`
  }
];

for (const entry of files) {
  const target = path.join(root, entry.file);
  if (!fs.existsSync(path.dirname(target))) {
    continue;
  }

  fs.writeFileSync(target, entry.content);
}

console.log('React Navigation theme fallback patch applied.');
