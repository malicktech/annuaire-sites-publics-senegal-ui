import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Assurez-vous de remplacer `<NOM_DU_REPO>` par le nom de votre dépôt GitHub
const repoName = process.env.NODE_ENV === 'production' ? '/annuaire-sites-publics-senegal-ui/' : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: repoName,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
