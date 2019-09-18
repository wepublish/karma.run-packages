export default [
  '@storybook/addon-docs/react/preset',
  ...(process.env.NODE_ENV === 'production' ? ['@storybook/preset-typescript'] : [])
]
