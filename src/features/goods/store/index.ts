import { createStore, createEffect } from 'effector'
import * as goodsApi from '../../../transport/goods'
import type { Good } from '../../../lib/types'

// --- Effects ---

export const fetchGoodsFx = createEffect(() => goodsApi.fetchGoods())

// --- Stores ---

export const $goods = createStore<Good[]>([]).on(fetchGoodsFx.doneData, (_, goods) => goods)

export const $goodsLoading = createStore(false)
  .on(fetchGoodsFx, () => true)
  .on(fetchGoodsFx.finally, () => false)

export const $goodsError = createStore<string | null>(null)
  .on(fetchGoodsFx.failData, (_, err) => err.message)
  .reset(fetchGoodsFx)
