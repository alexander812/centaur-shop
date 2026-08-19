import { createStore, createEffect, sample } from 'effector'
import * as orderApi from '../../../transport/order'
import type { Order } from '../../../lib/types'
import { logoutFx } from '../../auth/store'

// --- Effects ---

export const fetchOrdersFx = createEffect(() => orderApi.fetchOrders())

export const removeOrderFx = createEffect((id: number) => orderApi.removeOrder(id))

export const createOrderFx = createEffect(({ basket_id }: { basket_id: number }) =>
  orderApi.createOrder(basket_id)
)

// --- Stores ---

export const $orders = createStore<Order[]>([])
  .on(fetchOrdersFx.doneData, (_, orders) => orders)
  .reset(logoutFx.done)

export const $ordersLoading = createStore(false)
  .on(fetchOrdersFx, () => true)
  .on(fetchOrdersFx.finally, () => false)

// После создания заказа — перезагрузить список
sample({ clock: createOrderFx.done, target: fetchOrdersFx })
sample({ clock: removeOrderFx.done, target: fetchOrdersFx })
