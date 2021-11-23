import { createApp } from 'vue'
import App from './App.vue'


createApp(App).mount('#app')

// // 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
// if (process.env.NODE_ENV === 'development') {
//     Vue.config.devtools = true;
// } else {
//     Vue.config.devtools = false;
// }

