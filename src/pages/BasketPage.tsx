import { Title } from '@mantine/core'
import { BasketList } from '../features/basket/ui/BasketList'

export function BasketPage() {
  return (
    <>
      <Title mb="xl">Корзина</Title>
      <BasketList />
    </>
  )
}
