import { Container, Title, SimpleGrid, Card, Image, Text } from '@mantine/core'
import { useGoods } from './hooks/useGoods'

function App() {
  const { goods, loading, error } = useGoods();
  console.log(['goods', goods]);

  if (loading) return <Text p="xl">Загрузка...</Text>
  if (error) return <Text p="xl" c="red">Ошибка: {error}</Text>

  return (
    <Container py="xl">
      <Title mb="xl">Товары</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
        {goods.map((good) => (
          <Card key={good.id} shadow="sm" radius="md" withBorder>
            <Card.Section>
              <Image
                src={`http://localhost:8055/assets/${good.main_image}`}
                height={200}
                alt={String(good.title ?? '')}
              />
            </Card.Section>
            <Text fw={500} mt="md">{String(good.title ?? '')}</Text>
            <Text size="xl" fw={700} c="blue">{String(good.price_rub ?? '')} ₽</Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default App
