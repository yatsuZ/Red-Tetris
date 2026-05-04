import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: parseInt(env.CORS_PORT || '5173')
    },
    test: {
      coverage: {
        provider: 'v8',
        include: ['src/server/**/*.ts'],
        thresholds: {
          statements: 70, // 70% des instructions exécutées par les tests
          functions: 70,  // 70% des fonctions appelées
          lines: 70,      // 70% des lignes couvertes
          branches: 50    // 50% des chemins if/else, ternaires, etc.
        }
      }
    }
  }
})