import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia'
import 'uno.css'
import { defineConfig, presetUno, presetAttributify } from 'unocss'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Antd)
app.mount('#app')

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
  ],
  rules: [
    ['text-primary', { color: '#1890ff' }],
    ['bg-primary', { 'background-color': '#1890ff' }],
  ]
})
