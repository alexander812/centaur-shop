import { readItems } from '@directus/sdk'
import client from '../lib/directus'
import type { Good } from '../lib/types'

export async function fetchGoods(): Promise<Good[]> {
  const data = await client.request(
    readItems('goods', { filter: { status: { _eq: 'published' } } })
  )
  return data as Good[]
}
