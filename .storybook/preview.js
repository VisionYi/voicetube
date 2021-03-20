import { parameters as nuxtParameters } from '~~/.nuxt-storybook/storybook/preview.js'
import '~~/.nuxt-storybook/storybook/preview.js'

export const parameters = {
  ...nuxtParameters,
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#333333',
      }
    ],
  },
  // here don't work. issue: https://github.com/nuxt-community/storybook/issues/205
  // docs: {
  //   source: {
  //     type: 'dynamic'
  //   }
  // }
}
