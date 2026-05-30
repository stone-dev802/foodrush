const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const packages = [
  '@react-navigation/stack',
  '@react-navigation/bottom-tabs',
  '@react-navigation/elements',
  '@react-navigation/native',
  '@react-navigation/core',
];

for (const packageName of packages) {
  const packageJsonPath = path.join(root, 'node_modules', ...packageName.split('/'), 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    continue;
  }

  const packageDir = path.dirname(packageJsonPath);
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const sourcePath = packageJson['react-native'] || packageJson.source;

  if (!sourcePath) {
    continue;
  }

  const hasSourceEntry =
    fs.existsSync(path.join(packageDir, sourcePath)) ||
    fs.existsSync(path.join(packageDir, sourcePath.replace(/\.(tsx|ts|jsx|js)$/, '.js')));

  if (hasSourceEntry) {
    continue;
  }

  const fallback = fs.existsSync(path.join(packageDir, 'lib/module/index.js'))
    ? 'lib/module/index.js'
    : 'lib/commonjs/index.js';

  packageJson['react-native'] = fallback;
  packageJson.source = fallback;

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
  console.log(`Fixed ${packageName} react-native entry -> ${fallback}`);
}
