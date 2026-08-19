import type { ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useUnit } from 'effector-react'
import { AppShell, Group, Button, Text, Container, NavLink as MantineNavLink } from '@mantine/core'
import { $user, logoutFx } from '../features/auth/store'
import { Snakbar } from '../layouts/snakbar/ui'
export function MainLayout({ children }: { children: ReactNode }) {
  const user = useUnit($user)
  const navigate = useNavigate()

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

              <NavLink to="/" end style={{ textDecoration: 'none' }}>
                {({ isActive }) => <MantineNavLink label="Товары" active={isActive} />}
              </NavLink>
              <NavLink to="/basket" end style={{ textDecoration: 'none' }}>
                {({ isActive }) => <MantineNavLink label="Корзина" active={isActive} />}
              </NavLink>
              <NavLink to="/orders" end style={{ textDecoration: 'none' }}>
                {({ isActive }) => <MantineNavLink label="Заказы" active={isActive} />}
              </NavLink>
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
        <Snakbar />
        <Container size="xl" py="md">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
