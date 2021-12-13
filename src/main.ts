import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import router from './router'
import axios from '@/axios/index'
import store from "@/store";
// import Vant from 'vant';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app: any = createApp(App);
// app.use(Vant);
app.use(ElementPlus);
app.use(store);
// 全局ctx(this) 上挂载 $axios
app.config.globalProperties.$api = axios;
app.use(router).mount('#app');
