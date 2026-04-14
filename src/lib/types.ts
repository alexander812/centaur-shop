import type { components } from './directus-types'

export type Good = components['schemas']['ItemsGoods']

export interface Schema {
  goods: Good[]
}
