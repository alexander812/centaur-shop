import { Title } from '@mantine/core'
import { OrderList } from '../features/order/ui/OrderList'

export function OrderPage() {
  return (
    <>
      <Title mb="xl">Мои заказы</Title>
      <OrderList />
    </>
  )
}
