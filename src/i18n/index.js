import { createI18n } from 'vue-i18n'
import store from '@/store'

import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'

const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}

const locale = store.getters.language
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  messages
})

export default i18n