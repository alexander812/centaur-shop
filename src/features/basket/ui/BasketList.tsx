import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { Stack, Group, Text, Button, Card, NumberInput } from '@mantine/core'
import { $basket, $basketLoading, fetchBasketFx, updateBasketItemFx, removeFromBasketFx } from '../store'

export function BasketList() {
  const basket = useUnit($basket)
  const loading = useUnit($basketLoading)

  useEffect(() => {
    fetchBasketFx()
  }, [])

  if (loading) return <Text p="xl">Загрузка корзины...</Text>
  if (basket.length === 0) return <Text p="xl" c="dimmed">Корзина пуста</Text>

  return (
    <Stack>
      {basket.map((item) => {
        const good = typeof item.good_id === 'object' ? item.good_id : null
        const title = good ? String((good as Record<string, unknown>).title ?? '') : `Товар #${item.good_id}`
        const price = good ? Number((good as Record<string, unknown>).price_rub ?? 0) : 0

        return (
          <Card key={item.id} withBorder radius="md" p="md">
            <Group justify="space-between">
              <div>
                <Text fw={500}>{title}</Text>
                <Text size="sm" c="dimmed">{price} &#8381; за шт.</Text>
              </div>
              <Group>
                <NumberInput
                  value={item.quantity}
                  min={1}
                  max={99}
                  w={80}
                  onChange={(val) => {
                    if (typeof val === 'number' && val >= 1) {
                      updateBasketItemFx({ id: item.id, quantity: val })
                    }
                  }}
                />
                <Button
                  variant="subtle"
                  color="red"
                  size="sm"
                  onClick={() => removeFromBasketFx(item.id)}
                >
                  Удалить
                </Button>
              </Group>
            </Group>
          </Card>
        )
      })}
    </Stack>
  )
}
