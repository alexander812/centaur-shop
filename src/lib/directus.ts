import { createDirectus, rest, authentication } from '@directus/sdk'
import type { Schema } from './types'

export const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL ?? 'http://localhost:8055'

const client = createDirectus<Schema>(DIRECTUS_URL)
  .with(
    authentication('json', {
      storage: {
        get: () => {
          const raw = localStorage.getItem('auth')
          return raw ? JSON.parse(raw) : null
        },
        set: (value) => {
          if (value) {
            localStorage.setItem('auth', JSON.stringify(value))
          } else {
            localStorage.removeItem('auth')
          }
        },
      },
    })
  )
  .with(rest())

export default client
