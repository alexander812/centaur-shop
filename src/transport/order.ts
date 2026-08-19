import { readItems, customEndpoint } from '@directus/sdk'
import client from '../lib/directus'
import type { Order, Response } from '../lib/types'

type CreateOrderResponse = Response<{ id: number; basket_id: number }>

export type { Order }

export async function fetchOrders(): Promise<Order[]> {
  const data = await client.request(
    readItems('order' as 'goods', {
      sort: ['-date_created'] as never,
    })
  )
  return data as unknown as Order[]
}

export async function createOrder(basketId: number): Promise<CreateOrderResponse> {
  const response = await client.request(
    customEndpoint<CreateOrderResponse>({
      path: '/zeus/create-order',
      method: 'POST',
      body: JSON.stringify({ basket_id: basketId }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  )

  console.log(['createOrder response', response])
  return response
}
