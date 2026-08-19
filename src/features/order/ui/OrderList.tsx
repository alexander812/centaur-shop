import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { Stack, Card, Text, Badge, Group, Button } from '@mantine/core'
import { $orders, $ordersLoading, fetchOrdersFx, removeOrderFx } from '../store'

const STATUS_LABELS: Record<string, string> = {
  new: 'Новый',
  processing: 'В обработке',
  completed: 'Выполнен',
  cancelled: 'Отменён',
}

export function OrderList() {
  const orders = useUnit($orders)
  const loading = useUnit($ordersLoading)

  useEffect(() => {
    fetchOrdersFx()
  }, [])

  if (loading) return <Text p="xl">Загрузка заказов...</Text>
  if (orders.length === 0)
    return (
      <Text p="xl" c="dimmed">
        Заказов пока нет
      </Text>
    )

  return (
    <Stack>
      {orders.map((order) => (
        <Card key={order.id} withBorder radius="md" p="md">
          <Group justify="space-between">
            <Text fw={500}>Заказ #{order.id}</Text>
            <Badge>{STATUS_LABELS[order.status] ?? order.status}</Badge>
            <Button variant="subtle" color="red" size="sm" onClick={() => removeOrderFx(order.id)}>
              Удалить
            </Button>
          </Group>
          {order.date_created && (
            <Text size="sm" c="dimmed" mt="xs">
              {new Date(order.date_created).toLocaleDateString('ru-RU')}
            </Text>
          )}
        </Card>
      ))}
    </Stack>
  )
}
