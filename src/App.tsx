import { useGoods } from './hooks/useGoods'

function App() {
  const { goods, loading, error } = useGoods()

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>Ошибка: {error}</p>

  return (
    <div>
      <h1>Товары</h1>
      <ul>
        {goods.map((good) => (
          <li key={good.id}>
            {good.main_image && (
              <img
                src={`http://localhost:8055/assets/${good.main_image}`}
                alt={String(good.name ?? '')}
                width={200}
              />
            )}
            {JSON.stringify(good)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
