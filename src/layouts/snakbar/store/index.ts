import { createStore } from 'effector'
import { addToBasketFx } from '../../../features/basket/store'
import { logoutFx } from '../../../features/auth/store'

type Snakbar =
  | {
      status: 'ok'
      message: string
    }
  | {
      status: 'fail'
      message: string
    }

// --- Stores ---
export const $snakbar = createStore<Snakbar | null>(null)
  .on(addToBasketFx.doneData, (_, data) => {
    console.log(['$snakbar', _, data])

    return data.status === 'ok'
      ? { status: data.status, message: 'Товар добавлен в корзину' }
      : { status: data.status, message: data.error ?? 'Ошибка добавления товара' }
  })
  .reset(logoutFx.done)
