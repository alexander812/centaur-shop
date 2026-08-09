import { createStore, createEffect, sample } from 'effector'
import * as basketApi from '../../../transport/basket'
import type { BasketItem } from '../../../lib/types'
import { logoutFx } from '../../auth/store'

// --- Effects ---

export const fetchBasketFx = createEffect(() => basketApi.fetchBasket())

export const addToBasketFx = createEffect(
  ({ goodId, quantity }: { goodId: number; quantity?: number }) =>
    basketApi.addToBasket2(goodId, quantity)
)

export const updateBasketItemFx = createEffect(
  ({ id, quantity }: { id: number; quantity: number }) => basketApi.updateBasketItem(id, quantity)
)

export const removeFromBasketFx = createEffect((id: number) => basketApi.removeFromBasket(id))

// --- Stores ---

export const $basket = createStore<BasketItem[]>([])
  .on(fetchBasketFx.doneData, (_, items) => items)
  .reset(logoutFx.done)

export const $basketLoading = createStore(false)
  .on(fetchBasketFx, () => true)
  .on(fetchBasketFx.finally, () => false)

// После добавления/обновления/удаления — перезагружаем корзину
sample({ clock: addToBasketFx.done, target: fetchBasketFx })
sample({ clock: updateBasketItemFx.done, target: fetchBasketFx })
sample({ clock: removeFromBasketFx.done, target: fetchBasketFx })
