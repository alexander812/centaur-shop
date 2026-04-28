import type { ReactNode } from 'react'
import { useUnit } from 'effector-react'
import { AppShell, Group, Button, Text, Container } from '@mantine/core'
import { $user, logoutFx } from '../features/auth/store'

interface MainLayoutProps {
  children: ReactNode
  nav?: ReactNode
}

export function MainLayout({ children, nav }: MainLayoutProps) {
  const user = useUnit($user)

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%">
            <Group>
              <Text fw={700} size="lg">Centaur</Text>
              {nav}
            </Group>
            {user && (
              <Group>
                <Text size="sm" c="dimmed">{user.email}</Text>
                <Button variant="subtle" size="sm" onClick={() => logoutFx()}>
                  Выйти
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
