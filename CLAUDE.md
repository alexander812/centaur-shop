# Проект Centaur — интернет-магазин + блог

## Стек

| Часть | Технология |
|---|---|
| Бэкенд + Admin UI | Directus v11 (Docker) |
| БД | PostgreSQL 16 |
| Фронтенд магазина | React 19 + Vite 8 + TypeScript 6 + Mantine v9 |
| State manager | Effector + effector-react |
| Роутинг | react-router-dom |
| API клиент | @directus/sdk v21 (authentication composable, JSON mode) |

## Локальный запуск

**Бэкенд** (`/Users/a.smirnov/p/centaur-back/`):
```bash
docker compose up
# Directus Admin: http://localhost:8055
# Логин: admin@example.com / admin123
```

**Фронтенд** (`/Users/a.smirnov/p/centaur-shop/`):
```bash
npm run dev
# http://localhost:5173
```

**Генерация TypeScript типов из Directus:**
```bash
npm run generate-types
# Требует DIRECTUS_URL и DIRECTUS_TOKEN в .env
```

## Архитектура фронтенда

Проект использует feature-based структуру:

```
src/
├── pages/              # Точки входа — тонкие обёртки над фичами
│   ├── AuthPage.tsx        # /login
│   ├── GoodsPage.tsx       # /
│   ├── BasketPage.tsx      # /basket
│   └── OrderPage.tsx       # /orders
├── layouts/
│   └── MainLayout.tsx      # AppShell: хедер с навигацией + слот children
├── features/           # Бизнес-логика, разбитая по фичам
│   ├── auth/
│   │   ├── store/index.ts      # Effector: loginFx, registerFx, logoutFx, checkAuthFx, $user, $authError
│   │   └── ui/
│   │       ├── LoginForm.tsx   # Форма входа/регистрации + VK OAuth
│   │       └── UserGuard.tsx   # Показывает children только авторизованным
│   ├── goods/
│   │   ├── store/index.ts      # Effector: fetchGoodsFx, $goods, $goodsLoading
│   │   └── ui/
│   │       └── GoodsList.tsx   # Грид карточек товаров + кнопка "В корзину" (обёрнута в UserGuard)
│   ├── basket/
│   │   ├── store/index.ts      # Effector: fetchBasketFx, addToBasketFx, updateBasketItemFx, removeFromBasketFx, $basket
│   │   └── ui/
│   │       └── BasketList.tsx  # Список товаров в корзине с количеством и удалением
│   └── order/
│       ├── store/index.ts      # Effector: fetchOrdersFx, createOrderFx, $orders
│       └── ui/
│           └── OrderList.tsx   # Список заказов со статусами
├── transport/          # API-слой — чистые async функции, возвращают Promise + payload
│   ├── auth.ts             # login, register, logout, getMe
│   ├── goods.ts            # fetchGoods
│   ├── basket.ts           # fetchBasket, addToBasket, updateBasketItem, removeFromBasket
│   └── order.ts            # fetchOrders, createOrder
├── lib/
│   ├── directus.ts         # Клиент Directus SDK с JSON auth, токены в localStorage
│   ├── types.ts            # Типы: Good, BasketItem, Order, Schema
│   └── directus-types.ts   # Авто-генерация из OpenAPI Directus
├── App.tsx                 # BrowserRouter + Routes + PrivateRoute
└── main.tsx                # MantineProvider + App (без AuthProvider — всё на Effector)
```

## Роутинг

| Путь | Страница | Доступ |
|---|---|---|
| `/login` | Авторизация | Публичный (если залогинен → редирект на `/`) |
| `/` | Каталог товаров | Публичный (кнопка "В корзину" только для авторизованных) |
| `/basket` | Корзина | Только авторизованные (PrivateRoute) |
| `/orders` | Заказы | Только авторизованные (PrivateRoute) |

## Коллекции Directus

- `goods` — товары: `id`, `title`, `price_rub`, `main_image`, `description`, `category`, `status`, `decsription_images`
- `categoties` — категории (опечатка в названии, не менять)
- `goods_files_1` — связь товаров с файлами (Many-to-Many)
- `basket` — корзина: `id`, `good_id` (M2O → goods), `quantity`, `user_created`
- `order` — заказы: `id`, `status`, `date_created`, `user_created`

## Авторизация

- Email/пароль: `client.login({ email, password })` → токен в localStorage['auth']
  - ВАЖНО: в SDK v21 метод принимает объект `{ email, password }`, НЕ два аргумента
- VK OAuth: кнопка → редирект на `http://localhost:8055/auth/oauth/vk?redirect=http://localhost:5173`
- Публичная регистрация включена в Directus, верификация email отключена
- После регистрации — автологин через `sample` в Effector

## Паттерны Effector

- **transport** → чистые async-функции (без Effector)
- **store** → `createEffect` оборачивает transport, `createStore` реагирует на `.doneData` / `.failData`
- **sample** используется для цепочек: регистрация → автологин, мутация корзины → рефетч
- **$basket** сбрасывается при `logoutFx.done`
- Компоненты читают сторы через `useUnit`

## Docker Compose настройки Directus

- `CORS_ORIGIN`: http://localhost:5173
- `PUBLIC_REGISTRATION`: true
- `PUBLIC_REGISTRATION_VERIFY_EMAIL`: false

## Известные особенности

- URL Directus захардкожен в `directus.ts` (`http://localhost:8055`), не берётся из `.env`
- Переменные `.env` не используют префикс `VITE_`, поэтому недоступны через `import.meta.env`
- В `transport/basket.ts` и `transport/order.ts` используются касты `as 'goods'` / `as never` / `as unknown` для обхода типов SDK, пока Schema неполная — после `npm run generate-types` с новыми коллекциями можно будет убрать
- `categoties` — опечатка в Directus, менять нельзя (ломает существующие данные)
