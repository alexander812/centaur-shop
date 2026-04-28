import { readMe, registerUser } from '@directus/sdk'
import client from '../lib/directus'

export interface UserPayload {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
}

export async function login(email: string, password: string): Promise<UserPayload> {
  await client.login({ email, password })
  const me = await client.request(readMe())
  return me as UserPayload
}

export async function register(email: string, password: string, firstName: string): Promise<void> {
  await client.request(registerUser(email, password, { first_name: firstName }))
}

export async function logout(): Promise<void> {
  await client.logout()
  localStorage.removeItem('auth')
}

export async function getMe(): Promise<UserPayload | null> {
  const auth = localStorage.getItem('auth')
  if (!auth) return null
  const me = await client.request(readMe())
  return me as UserPayload
}
