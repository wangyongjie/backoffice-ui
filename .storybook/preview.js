import './global.scss'
import './vue-setting'

export const parameters = {
  actions: {
    argTypesRegex: "(.*?)"
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}