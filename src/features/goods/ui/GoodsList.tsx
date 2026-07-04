import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { SimpleGrid, Card, Image, Text, Button } from '@mantine/core'
import { DIRECTUS_URL } from '../../../lib/directus'
import { $goods, $goodsLoading, $goodsError, fetchGoodsFx } from '../store'
import { addToBasketFx } from '../../basket/store'
import { UserGuard } from '../../auth/ui/UserGuard'

export function GoodsList() {
  const goods = useUnit($goods)
  const loading = useUnit($goodsLoading)
  const error = useUnit($goodsError)

  useEffect(() => {
    fetchGoodsFx()
  }, [])

  if (loading) return <Text p="xl">Загрузка товаров...</Text>
  if (error) return <Text p="xl" c="red">Ошибка: {error}</Text>

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
      {goods.map((good) => (
        <Card key={good.id} shadow="sm" radius="md" withBorder>
          <Card.Section>
            <Image
              src={`${DIRECTUS_URL}/assets/${good.main_image}`}
              height={200}
              alt={String(good.title ?? '')}
            />
          </Card.Section>
          <Text fw={500} mt="md">{String(good.title ?? '')}</Text>
          <Text size="xl" fw={700} c="blue">{String(good.price_rub ?? '')} &#8381;</Text>
          <UserGuard>
            <Button
              mt="sm"
              fullWidth
              variant="light"
              onClick={() => addToBasketFx({ goodId: Number(good.id), quantity: 1 })}
            >
              В корзину
            </Button>
          </UserGuard>
        </Card>
      ))}
    </SimpleGrid>
  )
}
