import { useUnit } from 'effector-react'
import { Alert } from '@mantine/core'
import { $snakbar } from '../store'

export function Snakbar() {
  const snakbar = useUnit($snakbar)

  console.log(['snakbar', snakbar])

  return snakbar ? (
    <Alert
      variant="light"
      color={snakbar.status === 'fail' ? 'red' : 'green'}
      title={snakbar.message}
    ></Alert>
  ) : (
    <div>!!!!!</div>
  )
}
