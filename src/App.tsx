import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { Button, Group } from '@mantine/core'
import { $user, $authLoading, checkAuthFx } from './features/auth/store'
import { MainLayout } from './layouts/MainLayout'
import { AuthPage } from './pages/AuthPage'
import { GoodsPage } from './pages/GoodsPage'
import { BasketPage } from './pages/BasketPage'
import { OrderPage } from './pages/OrderPage'

type Page = 'goods' | 'basket' | 'orders'

function App() {
  const user = useUnit($user)
  const authLoading = useUnit($authLoading)
  const [page, setPage] = useState<Page>('goods')

  useEffect(() => {
    checkAuthFx()
  }, [])

  if (authLoading) return null
  if (!user) return <AuthPage />

  const nav = (
    <Group gap="xs">
      <Button variant={page === 'goods' ? 'filled' : 'subtle'} size="sm" onClick={() => setPage('goods')}>
        Товары
      </Button>
      <Button variant={page === 'basket' ? 'filled' : 'subtle'} size="sm" onClick={() => setPage('basket')}>
        Корзина
      </Button>
      <Button variant={page === 'orders' ? 'filled' : 'subtle'} size="sm" onClick={() => setPage('orders')}>
        Заказы
      </Button>
    </Group>
  )

  return (
    <MainLayout nav={nav}>
      {page === 'goods' && <GoodsPage />}
      {page === 'basket' && <BasketPage />}
      {page === 'orders' && <OrderPage />}
    </MainLayout>
  )
}

export default App
