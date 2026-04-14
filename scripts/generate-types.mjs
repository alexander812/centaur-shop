import 'dotenv/config'
import { writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const DIRECTUS_URL = process.env.DIRECTUS_URL ?? 'http://localhost:8055'
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN

if (!DIRECTUS_TOKEN) {
  console.error('Ошибка: DIRECTUS_TOKEN не задан в .env')
  process.exit(1)
}

const SPEC_FILE = resolve(ROOT, 'directus-spec.json')
const OUT_FILE = resolve(ROOT, 'src/lib/directus-types.ts')

console.log(`Загружаем схему с ${DIRECTUS_URL}...`)

const response = await fetch(`${DIRECTUS_URL}/server/specs/oas`, {
  headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
})

if (!response.ok) {
  console.error(`Ошибка запроса: ${response.status} ${response.statusText}`)
  process.exit(1)
}

const spec = await response.json()
writeFileSync(SPEC_FILE, JSON.stringify(spec, null, 2))
console.log(`Схема сохранена в ${SPEC_FILE}`)

console.log('Генерируем TypeScript типы...')
execSync(`npx openapi-typescript ${SPEC_FILE} -o ${OUT_FILE}`, { stdio: 'inherit' })
console.log(`Типы сохранены в ${OUT_FILE}`)
