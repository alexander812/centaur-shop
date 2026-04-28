import { useState } from 'react'
import { useUnit } from 'effector-react'
import { Container, Paper, Title, TextInput, PasswordInput, Button, Stack, Text, Divider, Anchor } from '@mantine/core'
import { loginFx, registerFx, $loginPending, $registerPending, $authError, resetAuthError } from '../store'

export function LoginForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')

  const loginPending = useUnit($loginPending)
  const registerPending = useUnit($registerPending)
  const authError = useUnit($authError)
  const pending = loginPending || registerPending

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (mode === 'login') {
      loginFx({ email, password })
    } else {
      registerFx({ email, password, firstName })
    }
  }

  function switchMode(next: 'login' | 'register') {
    setMode(next)
    resetAuthError()
  }

  return (
    <Container size={420} py={80}>
      <Title ta="center" mb="xl">
        {mode === 'login' ? 'Войти' : 'Регистрация'}
      </Title>
      <Paper withBorder shadow="sm" p="xl" radius="md">
        <Stack>
          <form onSubmit={handleSubmit}>
            <Stack>
              {mode === 'register' && (
                <TextInput
                  label="Имя"
                  placeholder="Ваше имя"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              )}
              <TextInput
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <PasswordInput
                label="Пароль"
                placeholder="Ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {authError && <Text c="red" size="sm">{authError}</Text>}
              <Button type="submit" loading={pending} fullWidth>
                {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </Button>
            </Stack>
          </form>

          <Text ta="center" size="sm">
            {mode === 'login' ? (
              <>Нет аккаунта?{' '}
                <Anchor onClick={() => switchMode('register')}>Зарегистрироваться</Anchor>
              </>
            ) : (
              <>Уже есть аккаунт?{' '}
                <Anchor onClick={() => switchMode('login')}>Войти</Anchor>
              </>
            )}
          </Text>

          <Divider label="или" labelPosition="center" />

          <Button
            fullWidth
            variant="outline"
            color="blue"
            onClick={() => {
              window.location.href = 'http://localhost:8055/auth/oauth/vk?redirect=http://localhost:5173'
            }}
          >
            Войти через ВКонтакте
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}
