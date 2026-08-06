import 'utils/theme.css'
import '@/assets/css/tailwind.css'
import '@/assets/css/main.less'
import { createApp, vaporInteropPlugin } from 'vue';
import { createPinia } from 'pinia';
import VueKonva from 'vue-konva';
import App from './App.vue';
import router from './router';

const app = createApp(App)
app.use(vaporInteropPlugin)
app.use(createPinia())
app.use(router)
app.use(VueKonva)
app.mount('#app');



