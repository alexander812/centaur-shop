import { useEffect } from 'react'
import { Title } from '@mantine/core'
import { BasketList } from '../features/basket/ui/BasketList'
import { createOrderFx } from '../features/order/store'
import { useNavigate } from 'react-router-dom'

export function BasketPage() {
  const navigate = useNavigate()

  useEffect(() => {
    return createOrderFx.done.watch(() => {
      navigate(`/orders`)
    })
  }, [navigate])

  return (
    <>
      <Title mb="xl">Корзина</Title>
      <BasketList />
    </>
  )
}
