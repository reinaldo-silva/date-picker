const config = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: {
          implementation: require('postcss'),
        },
      },
    },
  ],

  typescript: {
    check: true,
  },

  docs: {
    autodocs: true,
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};

export const framework = {
  name: '@storybook/react-webpack5',
  options: {},
};

export const docs = {
  autodocs: true,
};

export default config;
