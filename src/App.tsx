import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { $user, $authLoading, checkAuthFx } from './features/auth/store'
import { MainLayout } from './layouts/MainLayout'
import { AuthPage } from './pages/AuthPage'
import { GoodsPage } from './pages/GoodsPage'
import { BasketPage } from './pages/BasketPage'
import { OrderPage } from './pages/OrderPage'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useUnit($user)
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  const user = useUnit($user)
  const authLoading = useUnit($authLoading)

  useEffect(() => {
    checkAuthFx()
  }, [])

  if (authLoading) return null

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
      <Route
        path="/"
        element={
          <MainLayout>
            <GoodsPage />
          </MainLayout>
        }
      />
      <Route
        path="/basket"
        element={
          <PrivateRoute>
            <MainLayout>
              <BasketPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <MainLayout>
              <OrderPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
