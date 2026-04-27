import { Container, Title, SimpleGrid, Card, Image, Text, Button, Group } from '@mantine/core'
import { useGoods } from './hooks/useGoods'
import { useAuth } from './context/AuthContext'
import { LoginPage } from './pages/LoginPage'

function App() {
  const { user, loading: authLoading, logout } = useAuth()
  const { goods, loading, error } = useGoods()

  if (authLoading) return <Text p="xl">Загрузка...</Text>
  if (!user) return <LoginPage onLogin={() => {}} />

  if (loading) return <Text p="xl">Загрузка товаров...</Text>
  if (error) return <Text p="xl" c="red">Ошибка: {error}</Text>

  return (
    <Container py="xl">
      <Group justify="space-between" mb="xl">
        <Title>Товары</Title>
        <Group>
          <Text size="sm" c="dimmed">{user.email}</Text>
          <Button variant="subtle" size="sm" onClick={logout}>Выйти</Button>
        </Group>
      </Group>
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
