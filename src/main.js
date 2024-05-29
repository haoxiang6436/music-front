import { createApp } from 'vue'
import './styles/style.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(autoAnimatePlugin)

app.mount('#app')