export default {
  presets: ['@babel/preset-env'],
  targets: {
    // Try to match node with electron versions.
    // See: https://www.electronjs.org/docs/latest/tutorial/electron-timelines
    node: 'v20.9.0',
    electron: '29.0.0',
  },
}
