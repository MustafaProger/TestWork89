## AbeloHost Shop (тестовое задание) ✨

Приложение на Next.js (App Router), использующее публичный API DummyJSON для авторизации (JWT) и отображения списка товаров с индикацией загрузки и ошибок. Состояние — Zustand, запросы — TanStack Query, стили — SCSS-модули. 🛠️

### Возможности 🚀
- Вход по JWT на `https://dummyjson.com/auth/login` с валидацией (минимум 3 символа)
- Персистентная авторизация (Zustand + localStorage)
- Список товаров (12 шт.) с `https://dummyjson.com/products`
- Карточка товара: изображение, название, категория, цена; кнопка «Add to cart» только для авторизованных
- Header: Login или Имя Фамилия; Footer: текущий год и «Logged as {email}» при входе

### Технологии 🧰
- Next.js 15, React 19, TypeScript
- Zustand, TanStack React Query, Axios
- SCSS Modules
- ESLint, Prettier, Stylelint

### Требования 🔧
- Node.js 18+ (рекомендовано 20+)
- npm (или pnpm/yarn/bun)

### Быстрый старт 🏁
```bash
npm install
npm run dev
# откройте http://localhost:3000
```

### Скрипты 📜
```bash
# dev-сервер (Turbopack)
npm run dev

# продакшн-сборка и запуск
npm run build
npm start

# линтинг TypeScript/JS
npm run lint

# форматирование Prettier
npm run format

# линтинг стилей (SCSS/CSS)
npm run lint:styles
```

### Структура проекта 🗂️
```
src/
  app/                # App Router: страницы, layout, провайдеры
  components/         # Компоненты UI (Header, Footer, ProductCard и т.д.)
  hooks/              # Кастомные хуки
  services/           # axios-инстанс и вызовы API
  store/              # Zustand сторы (auth, product list)
  styles/             # глобальные переменные и миксины
  types/              # Типы TS для API
```

### API 📡
- База: `https://dummyjson.com`
- Авторизация: `POST /auth/login` c телом `{ username, password, expiresInMins? }`
- Товары: `GET /products?limit=12&select=id,title,category,price,thumbnail`

#### Демо-аккаунты DummyJSON 🔑
Можно использовать тестовые креды из документации DummyJSON, например:
```json
{
  "username": "emilys",
  "password": "emilyspass"
}
```

### Детали реализации 🧩
- Auth-store сохраняет `user`, `accessToken` и статус; есть защита от мигания UI при гидратации
- Токены сохраняются, но не подставляются в заголовки по умолчанию (эндпоинт товаров публичный)
- Используются только иконки MUI; UI-компоненты MUI не применяются

### Адаптивность и доступность 📱
- Адаптивная сетка для списка товаров
- Управление формой с клавиатуры; видимые состояния загрузки/блокировки