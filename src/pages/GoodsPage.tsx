import { Title } from '@mantine/core'
import { GoodsList } from '../features/goods/ui/GoodsList'

export function GoodsPage() {
  return (
    <>
      <Title mb="xl">Товары</Title>
      <GoodsList />
    </>
  )
}
