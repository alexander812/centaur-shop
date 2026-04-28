import { readItems, createItem, updateItem, deleteItem } from '@directus/sdk'
import client from '../lib/directus'
import type { BasketItem } from '../lib/types'

export type { BasketItem }

export async function fetchBasket(): Promise<BasketItem[]> {
  const data = await client.request(
    readItems('basket' as 'goods', {
      fields: ['id', 'good_id.*', 'quantity'] as never[],
      filter: { user_created: { _eq: '$CURRENT_USER' } } as never,
    })
  )
  return data as unknown as BasketItem[]
}

export async function addToBasket(goodId: number, quantity = 1): Promise<BasketItem> {
  const item = await client.request(
    createItem('basket' as 'goods', { good_id: goodId, quantity } as never)
  )
  return item as unknown as BasketItem
}

export async function updateBasketItem(id: number, quantity: number): Promise<BasketItem> {
  const item = await client.request(
    updateItem('basket' as 'goods', id, { quantity } as never)
  )
  return item as unknown as BasketItem
}

export async function removeFromBasket(id: number): Promise<void> {
  await client.request(deleteItem('basket' as 'goods', id))
}
