import { createApp } from 'vue'
import i18n from '@/i18n/index.js'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

import "@/styles/base.scss"
import installIcons from '@/icons/index'
import '@/permission'
import installFilter from '@/filter'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
app.use(store).use(router).use(i18n).mount('#app')