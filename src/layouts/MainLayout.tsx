import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { AppShell, Group, Button, Text, Container } from '@mantine/core'
import { $user, logoutFx } from '../features/auth/store'

export function MainLayout({ children }: { children: ReactNode }) {
  const user = useUnit($user)
  const navigate = useNavigate()

  console.log(['user', user])

  async function handleLogout() {
    await logoutFx()
    navigate('/login')
  }

  async function handleLogin() {
    navigate('/login')
  }

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%">
            <Group>
              <Text fw={700} size="lg">
                Centaur
              </Text>
              <Button component={NavLink} to="/" variant="subtle" size="sm">
                Товары
              </Button>
              <Button component={NavLink} to="/basket" variant="subtle" size="sm">
                Корзина
              </Button>
              <Button component={NavLink} to="/orders" variant="subtle" size="sm">
                Заказы
              </Button>
            </Group>
            {user ? (
              <Group>
                <Text size="sm" c="dimmed">
                  {user.email}
                </Text>
                <Button variant="subtle" size="sm" onClick={handleLogout}>
                  Выйти
                </Button>
              </Group>
            ) : (
              <Group>
                <Button variant="subtle" size="sm" onClick={handleLogin}>
                  Войти
                </Button>
              </Group>
            )}
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl" py="md">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
