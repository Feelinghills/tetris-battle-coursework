# Архитектура курсового проекта «TetrisBattle»

Документ описывает архитектуру веб-приложения **TetrisBattle** (многопользовательский Тетрис, вариант 28): структуру проектов, используемые библиотеки с версиями, состав компонентов, структуру маршрутизации и способ подключения библиотеки общих компонентов.

---

## 1. Общее описание и структура репозитория

Курсовой проект состоит из **двух самостоятельных TypeScript-проектов**:

1. **`ui-library`** (`@tetris-battle/ui-library`) — переиспользуемая библиотека общих UI-компонентов (в том числе специализированных компонентов Тетриса — стакана `TetrisWell` и превью следующей фигуры `NextTetromino`).
2. **`frontend`** (`tetris-battle-frontend`) — основное клиентское веб-приложение на React + TypeScript + Vite с клиентской маршрутизацией.

Такое разделение позволяет развивать и тестировать визуальные компоненты независимо от бизнес-логики приложения, изолировать стили через CSS Modules и переиспользовать компоненты на всех страницах.

```text
tetris-battle-coursework/
├── .gitignore
├── README.md                                  # Описание проекта, запуск и скриншоты
├── architecture.md                            # Архитектурные требования (этот файл)
├── mvp.md                                     # Функциональные требования и границы MVP
├── docs/
│   └── screenshots/                           # Скриншоты работы приложения
├── ui-library/                                # Проект 1: библиотека общих UI-компонентов
│   ├── .gitignore
│   ├── eslint.config.js                       # Конфигурация ESLint
│   ├── jest.config.ts                         # Конфигурация Jest + покрытие кода
│   ├── package.json                           # Манифест пакета @tetris-battle/ui-library
│   ├── package-lock.json
│   ├── tsconfig.json                          # Настройки TypeScript (strict + .d.ts)
│   ├── vite.config.ts                         # Сборка библиотеки (ES-модуль + vite-plugin-dts)
│   └── src/
│       ├── index.ts                           # Публичный экспорт компонентов и типов
│       ├── types.ts                           # Общие типы (Tetromino, GridCoord, ColorPalette и др.)
│       ├── setupTests.ts                      # Подключение матчеров @testing-library/jest-dom
│       ├── Button/                            # Button.tsx, Button.module.css, Button.test.tsx
│       ├── Card/                              # Card.tsx, Card.module.css, Card.test.tsx
│       ├── EmptyState/                        # EmptyState.tsx, EmptyState.module.css, EmptyState.test.tsx
│       ├── NextTetromino/                     # NextTetromino.tsx, NextTetromino.module.css, NextTetromino.test.tsx
│       ├── PageHeader/                        # PageHeader.tsx, PageHeader.module.css, PageHeader.test.tsx
│       ├── StatCard/                          # StatCard.tsx, StatCard.module.css, StatCard.test.tsx
│       ├── StatusBadge/                       # StatusBadge.tsx, StatusBadge.module.css, StatusBadge.test.tsx
│       └── TetrisWell/                        # TetrisWell.tsx, TetrisWell.module.css, TetrisWell.test.tsx
└── frontend/                                  # Проект 2: основное веб-приложение
    ├── .gitignore
    ├── eslint.config.js                       # Конфигурация ESLint
    ├── index.html                             # HTML-точка входа и favicon
    ├── jest.config.ts                         # Конфигурация Jest (jsdom + moduleNameMapper)
    ├── package.json                           # Манифест приложения, зависимость от @tetris-battle/ui-library
    ├── package-lock.json
    ├── tsconfig.json                          # Корневой tsconfig (references)
    ├── tsconfig.app.json                      # Настройки TS для исходного кода приложения
    ├── tsconfig.node.json                     # Настройки TS для vite.config.ts
    ├── vite.config.ts                         # Конфигурация Vite
    ├── public/
    │   ├── favicon.ico                        # Иконка вкладки браузера (ICO)
    │   └── favicon.svg                        # Векторная иконка вкладки браузера (SVG)
    └── src/
        ├── main.tsx                           # Точка входа React + подключение стилей библиотеки
        ├── index.css                          # Базовые глобальные стили
        ├── App.tsx                            # Корневой компонент (AuthProvider + BrowserRouter + AppRoutes)
        ├── App.test.tsx                       # Интеграционные тесты маршрутизации и защищённых страниц
        ├── setupTests.ts                      # Настройка jest-dom и полифилл TextEncoder/TextDecoder
        ├── auth/                              # Контекст клиентской сессии игрока
        │   ├── AuthContext.ts                 # Контекст авторизации
        │   ├── AuthProvider.tsx               # Провайдер сессии в sessionStorage
        │   └── useAuth.ts                     # Хук доступа к сессии игрока
        ├── router/
        │   └── AppRoutes.tsx                  # Конфигурация всех маршрутов приложения
        ├── data/
        │   ├── types.ts                       # Доменные типы (GameRoom, LeaderboardEntry, PlayerProfile и др.)
        │   └── mockData.ts                    # Демонстрационные данные (7 тетрамино, комнаты, лидеры, правила)
        ├── components/                        # Прикладные компоненты frontend
        │   ├── AppLayout/                     # AppLayout.tsx, AppLayout.module.css
        │   ├── LeaderboardTable/              # LeaderboardTable.tsx, LeaderboardTable.module.css
        │   ├── Navbar/                        # Navbar.tsx, Navbar.module.css
        │   ├── RequireAuth/                   # RequireAuth.tsx
        │   └── RoomCard/                      # RoomCard.tsx, RoomCard.module.css
        └── pages/                             # Страницы приложения
            ├── HomePage/                      # HomePage.tsx, HomePage.module.css
            ├── SoloGamePage/                  # SoloGamePage.tsx, SoloGamePage.module.css
            ├── RoomsPage/                     # RoomsPage.tsx, RoomsPage.module.css
            ├── RoomBattlePage/                # RoomBattlePage.tsx, RoomBattlePage.module.css
            ├── LeaderboardPage/               # LeaderboardPage.tsx, LeaderboardPage.module.css
            ├── PlayerProfilePage/             # PlayerProfilePage.tsx, PlayerProfilePage.module.css
            ├── RulesPage/                     # RulesPage.tsx, RulesPage.module.css
            ├── LoginPage/                     # LoginPage.tsx, LoginPage.module.css
            ├── ProfileSettingsPage/           # ProfileSettingsPage.tsx, ProfileSettingsPage.module.css
            └── NotFoundPage/                  # NotFoundPage.tsx, NotFoundPage.module.css
```

---

## 2. Назначение проектов

### 2.1. `ui-library` (`@tetris-battle/ui-library`)

- **Назначение:** предоставление унифицированных и изолированных по стилям UI-компонентов для всех экранов TetrisBattle.
- **Сборка:** компилируется в ES-модуль (`dist/index.js`), общий файл стилей (`dist/index.css`) и декларации типов TypeScript (`dist/index.d.ts`) командой `tsc && vite build`.
- **Изоляция:** `react` и `react-dom` объявлены в `peerDependencies` и `rollupOptions.external`, чтобы в итоговом приложении использовался единый экземпляр React.

### 2.2. `frontend` (`tetris-battle-frontend`)

- **Назначение:** клиентское SPA-приложение многопользовательского Тетриса с навигацией между главной страницей, одиночным режимом, комнатами дуэлей, таблицей лидеров, профилями игроков, правилами и личным кабинетом.
- **Состояние на этапе ЛР5:** реализован полный каркас приложения, все маршруты и страницы, клиентская сессия в `sessionStorage`, демонстрационные данные и интеграция с `@tetris-battle/ui-library`. Полноценная игровая механика одиночной партии и сохранение рекордов реализуются на этапе MVP (ЛР6).

---

## 3. Используемые библиотеки и версии

Все версии библиотек соответствуют или превосходят версии из примера лабораторной работы 4 (`lab4-react/tasks/example`).

### 3.1. Общие runtime-зависимости (`frontend` / `peerDependencies` в `ui-library`)

| Библиотека | Версия | Назначение |
|---|---|---|
| `react` | `^19.3.0` | Базовая библиотека построения пользовательского интерфейса |
| `react-dom` | `^19.3.0` | Рендеринг React-компонентов в DOM |
| `react-router-dom` | `^7.18.6` | Клиентская маршрутизация, вложенные layout-маршруты, параметры URL и защищённые маршруты |
| `@tetris-battle/ui-library` | `file:../ui-library` | Локальная библиотека общих UI-компонентов проекта |

### 3.2. Инструменты сборки, типизации, линтинга и тестирования (`devDependencies`)

| Библиотека | Версия | Проект | Назначение |
|---|---|---|---|
| `typescript` | `~5.9.3` | оба | Статическая типизация (`strict: true`, без `any`) |
| `vite` | `^7.1.11` | оба | Сборщик и dev-сервер |
| `@vitejs/plugin-react` | `^5.0.4` | оба | Поддержка React Fast Refresh и JSX в Vite |
| `vite-plugin-dts` | `^5.1.2` | `ui-library` | Генерация деклараций `.d.ts` для библиотеки |
| `eslint` | `^9.36.0` | оба | Статический анализ и контроль стиля кода |
| `@eslint/js` | `^9.36.0` | оба | Базовые рекомендованные правила ESLint |
| `typescript-eslint` | `^8.45.0` | оба | Правила ESLint для TypeScript |
| `eslint-plugin-import` | `^2.32.0` | оба | Контроль порядка и группировки импортов |
| `eslint-plugin-react` | `^7.37.5` | оба | Правила ESLint для React |
| `eslint-plugin-react-hooks` | `^7.1.1` | оба | Контроль правил использования React-хуков |
| `eslint-plugin-react-refresh` | `^0.5.7` | оба | Контроль совместимости с Vite Fast Refresh |
| `globals` | `^17.13.0` | оба | Определения глобальных переменных среды браузера |
| `jest` | `^30.2.0` | оба | Тестовый раннер и сбор покрытия кода |
| `jest-environment-jsdom` | `^30.2.0` | оба | Эмуляция браузерного DOM в тестах |
| `ts-jest` | `^29.4.5` | оба | Транспиляция TypeScript в Jest |
| `@testing-library/react` | `^16.3.0` | оба | Тестирование React-компонентов |
| `@testing-library/jest-dom` | `~6.9.1` | оба | Дополнительные DOM-матчеры (`toBeInTheDocument`, `toHaveStyle` и др.) |
| `@testing-library/user-event` | `^14.6.1` | оба | Эмуляция действий пользователя (клики, ввод текста) |
| `identity-obj-proxy` | `^3.0.0` | оба | Подмена импортов CSS Modules в Jest |
| `@types/jest` | `^30.0.0` | оба | Типы TypeScript для Jest |
| `@types/node` | `^26.6.4` | оба | Типы Node.js для конфигов и тестов |
| `@types/react` | `^19.3.0` | оба | Типы TypeScript для React |
| `@types/react-dom` | `^19.3.0` | оба | Типы TypeScript для ReactDOM |

---

## 4. Список разрабатываемых компонентов

### 4.1. Компоненты библиотеки `ui-library`

| Компонент | Файл | Назначение |
|---|---|---|
| `Button` | `src/Button/Button.tsx` | Кнопка с вариантами (`primary`, `secondary`, `danger`), размерами (`small`, `medium`, `large`) и поддержкой `disabled` / `type` |
| `Card` | `src/Card/Card.tsx` | Универсальный контейнер-карточка с опциональными `title`, `subtitle` и слотом `actions` |
| `NextTetromino` | `src/NextTetromino/NextTetromino.tsx` | Отображение следующего тетрамино по объекту `Tetromino` (координаты в сетке, `defaultColor`, `gridSize`, опциональный `customColor`) |
| `TetrisWell` | `src/TetrisWell/TetrisWell.tsx` | Отображение стакана Тетриса заданной размерности (`rows`, `cols`) по двумерному массиву чисел `grid` с цветовой палитрой `colorMap`, счётчиком занятых клеток и номерами столбцов |
| `StatCard` | `src/StatCard/StatCard.tsx` | Карточка числовой метрики (счёт, очищенные линии, победы, активные комнаты) с подписью и подсказкой |
| `StatusBadge` | `src/StatusBadge/StatusBadge.tsx` | Индикатор статуса комнаты или игрока (`waiting`, `playing`, `finished`, `online`, `offline`) |
| `PageHeader` | `src/PageHeader/PageHeader.tsx` | Заголовок страницы с описанием и слотом кнопок действий |
| `EmptyState` | `src/EmptyState/EmptyState.tsx` | Унифицированная заглушка для пустых списков и ненайденных сущностей (комната/игрок/404) |

### 4.2. Компоненты приложения `frontend`

| Компонент | Файл | Назначение |
|---|---|---|
| `AppLayout` | `src/components/AppLayout/AppLayout.tsx` | Общий каркас страниц: верхняя панель `Navbar`, контейнер `<Outlet />` и подвал |
| `Navbar` | `src/components/Navbar/Navbar.tsx` | Основная навигация по разделам, отображение статуса текущей сессии игрока и кнопки «Войти» / «Выйти» |
| `RequireAuth` | `src/components/RequireAuth/RequireAuth.tsx` | Защитная обёртка маршрута: перенаправляет неавторизованного пользователя на `/login` с сохранением исходного пути в `location.state.from` |
| `RoomCard` | `src/components/RoomCard/RoomCard.tsx` | Карточка многопользовательской комнаты (игроки, скорость, `StatusBadge`, переход в `/rooms/:roomId`) |
| `LeaderboardTable` | `src/components/LeaderboardTable/LeaderboardTable.tsx` | Таблица лидеров с рейтингом, рекордами, статусом и ссылками на профили `/players/:playerId` |

### 4.3. Страницы приложения `frontend`

| Страница | Файл | Назначение |
|---|---|---|
| `HomePage` | `src/pages/HomePage/HomePage.tsx` | Главный экран: сводка показателей, переход в режимы игры и превью компонентов `TetrisWell` и `NextTetromino` |
| `SoloGamePage` | `src/pages/SoloGamePage/SoloGamePage.tsx` | Экран одиночной партии 10x20 с превью следующей фигуры, счётчиками и панелью управления (заглушка игрового цикла для MVP) |
| `RoomsPage` | `src/pages/RoomsPage/RoomsPage.tsx` | Список комнат дуэлей с фильтрацией по статусу (`all`, `waiting`, `playing`, `finished`) |
| `RoomBattlePage` | `src/pages/RoomBattlePage/RoomBattlePage.tsx` | Экран конкретной комнаты (`/rooms/:roomId`) со стаканами двух игроков и обработкой несуществующего ID |
| `LeaderboardPage` | `src/pages/LeaderboardPage/LeaderboardPage.tsx` | Общий рейтинг игроков с переходом к профилям |
| `PlayerProfilePage` | `src/pages/PlayerProfilePage/PlayerProfilePage.tsx` | Карточка профиля игрока (`/players/:playerId`): статистика, история матчей и обработка несуществующего ID |
| `RulesPage` | `src/pages/RulesPage/RulesPage.tsx` | Правила начисления очков (Single/Double/Triple/Tetris) и визуальный каталог всех 7 классических фигур |
| `LoginPage` | `src/pages/LoginPage/LoginPage.tsx` | Страница входа игрока по никнейму (валидация 2–20 символов, сохранение в `sessionStorage`, возврат на защищённый маршрут) |
| `ProfileSettingsPage` | `src/pages/ProfileSettingsPage/ProfileSettingsPage.tsx` | Защищённый личный кабинет (`/profile`): настройка скорости, проекции фигуры (Ghost Piece) и выход из сессии |
| `NotFoundPage` | `src/pages/NotFoundPage/NotFoundPage.tsx` | Страница 404 для неизвестных маршрутов со ссылкой возврата на главную |

---

## 5. Структура роутинга

Маршрутизация построена на `react-router-dom` v7 (`BrowserRouter` + вложенный `<Route path="/" element={<AppLayout />}>`). Все дочерние маршруты отображаются внутри `<Outlet />` компонента `AppLayout`.

| Маршрут | Вложенность | Страница | Параметры | Доступ | Описание |
|---|---|---|---|---|---|
| `/` | `AppLayout` (`index`) | `HomePage` | — | Публичный | Главная страница и обзор режимов |
| `/play/solo` | `AppLayout` → `play/solo` | `SoloGamePage` | — | Публичный | Одиночная игра (основной сценарий MVP) |
| `/rooms` | `AppLayout` → `rooms` | `RoomsPage` | — | Публичный | Лобби и список комнат дуэлей |
| `/rooms/:roomId` | `AppLayout` → `rooms/:roomId` | `RoomBattlePage` | `roomId` | Публичный | Экран конкретной комнаты; при неизвестном ID — `EmptyState` |
| `/leaderboard` | `AppLayout` → `leaderboard` | `LeaderboardPage` | — | Публичный | Таблица лидеров |
| `/players/:playerId` | `AppLayout` → `players/:playerId` | `PlayerProfilePage` | `playerId` | Публичный | Профиль игрока и история матчей; при неизвестном ID — `EmptyState` |
| `/rules` | `AppLayout` → `rules` | `RulesPage` | — | Публичный | Правила игры и 7 классических тетрамино |
| `/login` | `AppLayout` → `login` | `LoginPage` | — | Публичный | Вход в игровую сессию |
| `/profile` | `AppLayout` → `RequireAuth` → `profile` | `ProfileSettingsPage` | — | **Защищённый** | Личный кабинет и настройки (редирект на `/login` без сессии) |
| `*` | `AppLayout` → `*` | `NotFoundPage` | — | Публичный | Страница 404 |

---

## 6. Интеграция `frontend` с `ui-library`

1. **Подключение как пакета:** в `frontend/package.json` библиотека объявлена зависимостью `"@tetris-battle/ui-library": "file:../ui-library"`.
2. **Публичный API пакета:** в `ui-library/package.json` через поле `exports` открыты две точки входа:
   - `"."` → `./dist/index.js` и `./dist/index.d.ts` (компоненты и TypeScript-типы);
   - `"./style.css"` → `./dist/index.css` (собранные CSS Modules всех компонентов).
3. **Импорт по имени пакета:** в `frontend/src/main.tsx` подключаются стили `import '@tetris-battle/ui-library/style.css'`, а на страницах и в компонентах используются именованные импорты, например:
   ```ts
   import { Button, Card, NextTetromino, TetrisWell } from '@tetris-battle/ui-library'
   ```
   Относительные пути вида `../../ui-library/src/...` в исходном коде `frontend` не используются.
4. **Автоматическая пересборка:** скрипты `predev` и `prebuild` в `frontend/package.json` автоматически вызывают `npm --prefix ../ui-library run build`, гарантируя актуальность артефактов `ui-library/dist` перед запуском и сборкой приложения.
5. **Тестирование:** в `frontend/jest.config.ts` через `moduleNameMapper` пакет `@tetris-battle/ui-library` отображается на исходники `../ui-library/src/index.ts`, а стили — на `identity-obj-proxy`, что обеспечивает быструю и стабильную работу интеграционных тестов в `jsdom`.
