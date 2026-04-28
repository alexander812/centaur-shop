import { readItems, createItem } from '@directus/sdk'
import client from '../lib/directus'
import type { Order } from '../lib/types'

export type { Order }

export async function fetchOrders(): Promise<Order[]> {
  const data = await client.request(
    readItems('order' as 'goods', {
      filter: { user_created: { _eq: '$CURRENT_USER' } } as never,
      sort: ['-date_created'] as never,
    })
  )
  return data as unknown as Order[]
}

export async function createOrder(): Promise<Order> {
  const item = await client.request(
    createItem('order' as 'goods', { status: 'new' } as never)
  )
  return item as unknown as Order
}
