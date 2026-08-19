import { createStore, createEvent, sample } from 'effector'
import { logoutFx } from '../../../features/auth/store'
import { debounce } from '../../../lib/utils'

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
export const $snakbar = createStore<Snakbar | null>(null).reset(logoutFx.done)
export const clearMessage = createEvent()

sample({
  clock: clearMessage,
  fn: () => null,
  target: $snakbar,
})

const debouncedClear = debounce(() => {
  clearMessage()
}, 3000)

$snakbar.watch((value) => {
  if (value !== null) {
    debouncedClear()
  }
})
