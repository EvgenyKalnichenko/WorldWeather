import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { vfmPlugin } from 'vue-final-modal'
import useVuelidate from '@vuelidate/core'

createApp(App)
  .use(store)
  .use(router)
  .use(useVuelidate)
  .use(vfmPlugin({
    key: '$vfm',
    componentName: 'VueFinalModal',
    dynamicContainerName: 'ModalsContainer'
  }))
  .mount('#app')
