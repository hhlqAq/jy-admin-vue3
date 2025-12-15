import { createI18n } from 'vue-i18n'

import en from './lang/en'
import zh from './lang/zh'

const i18n = createI18n({
  // Use Composition API, Set to false
  allowComposition: true,
  legacy: false,
  locale: 'zh',
  messages: {
    zh,
    en,
  },
})

export default i18n
