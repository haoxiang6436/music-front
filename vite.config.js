import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    ElementPlus({
      useSource: true,
    }),
    AutoImport({ 
      resolvers: [ElementPlusResolver()] 
    }),
    Components({
      resolvers: [ElementPlusResolver()] 
    }),
  ],
  server:{
    port:80,
    host: '0.0.0.0'
  }
})
