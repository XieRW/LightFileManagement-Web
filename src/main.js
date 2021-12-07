import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
// import Vant from 'vant';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
// app.use(Vant);
app.use(ElementPlus);
app.use(router).mount('#app');
