const config = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss") ,
        },
      },
    },
  ],

  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },

  docs: {
    autodocs: true
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  }
};

export const framework = {
  name: '@storybook/react-webpack5',
  options: {}
};

export const docs = {
  autodocs: true
};

export default config