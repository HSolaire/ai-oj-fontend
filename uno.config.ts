import { defineConfig, presetUno, presetAttributify } from 'unocss'

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