import type { components } from './directus-types'

export type Good = components['schemas']['ItemsGoods']

export interface BasketItem {
  id: number
  good_id: number | Good
  quantity: number
  user_created?: string
}

export interface Order {
  id: number
  status: string
  date_created?: string
  user_created?: string
}

export interface Schema {
  goods: Good[]
  basket: BasketItem[]
  order: Order[]
}
