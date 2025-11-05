# DigitalOcean App Platform Deployment Guide

## Огляд

Цей файл конфігурації налаштовує деплой проєкту Bookshelf на DigitalOcean App Platform з двома компонентами:

- **Backend** - Node.js API сервер
- **Frontend** - Статичний React застосунок

**Примітка**: База даних MongoDB використовується через MongoDB Atlas (окремо від DigitalOcean).

## Передумови

1. Аккаунт на DigitalOcean
2. GitHub репозиторій з вашим кодом
3. Auth0 налаштування (Domain, Client ID, Audience)

## Кроки деплою

### 1. Підготовка репозиторію

1. Переконайтеся, що ваш код знаходиться в GitHub репозиторії
2. Оновіть значення в `.do/app.yaml`:
   - `repo: your-username/bookshelf` - замініть на ваш репозиторій
   - `branch: main` - замініть на вашу гілку (якщо потрібно)
   - `region: nyc` - виберіть найближчий регіон

### 2. Налаштування змінних середовища

У файлі `.do/app.yaml` оновіть значення:

**MongoDB Atlas:**

- `DB_URI` - ваш MongoDB Atlas connection string

**Auth0:**

- `AUTH0_DOMAIN` - ваш домен Auth0 (наприклад, `your-app.auth0.com`)
- `AUTH0_AUDIENCE` - ваш API identifier з Auth0
- `VITE_AUTH0_CLIENT_ID` - ваш Client ID з Auth0

**Важливо**: Після першого деплою змініть типи цих змінних на `SECRET` через веб-інтерфейс DigitalOcean для безпеки.

### 3. Деплой через веб-інтерфейс

1. Увійдіть в [DigitalOcean Control Panel](https://cloud.digitalocean.com/)
2. Перейдіть до **Apps** → **Create App**
3. Оберіть **GitHub** як джерело
4. Підключіть ваш репозиторій та оберіть гілку
5. DigitalOcean автоматично виявить файл `.do/app.yaml`
6. Перевірте конфігурацію компонентів
7. Налаштуйте змінні середовища (особливо Auth0 credentials)
8. Запустіть деплой

### 4. Альтернативний деплой через CLI

```bash
# Встановіть DigitalOcean CLI
doctl auth init

# Створіть застосунок з конфігураційного файлу
doctl apps create --spec .do/app.yaml
```

### 5. Після деплою

1. Отримайте URL вашого застосунку з DigitalOcean dashboard
2. Оновіть налаштування Auth0:
   - Додайте URL вашого frontend в **Allowed Callback URLs**
   - Додайте URL вашого frontend в **Allowed Logout URLs**
   - Додайте URL вашого backend в **Allowed Origins (CORS)**
3. Оновіть змінні середовища `VITE_API_URL` в frontend компоненті, якщо потрібно

## Структура компонентів

### Backend Component

- **Type**: Web Service (Node.js)
- **Source Directory**: `backend/`
- **Build Command**: `npm ci && npm run build`
- **Run Command**: `npm start`
- **Port**: 8080
- **Health Check**: `/books` endpoint

### Frontend Component

- **Type**: Static Site
- **Source Directory**: `frontend/`
- **Build Command**: `npm ci && npm run build`
- **Output Directory**: `dist/`
- **SPA Routing**: enabled через `catchall_document`

### MongoDB Atlas Setup

База даних використовується через MongoDB Atlas (окремо від DigitalOcean):

1. Створіть безкоштовний кластер на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Налаштуйте Network Access - додайте IP адреси DigitalOcean або `0.0.0.0/0` для розробки
3. Створіть користувача бази даних
4. Отримайте connection string та встановіть його як `DB_URI` в змінних середовища backend компонента

## Змінні середовища

### Backend (RUN_TIME)

- `NODE_ENV` - production
- `DB_URI` - MongoDB Atlas connection string (встановіть вручну)
- `PORT` - 8080
- `HOST` - 0.0.0.0
- `FRONTEND_URL` - автоматично з `frontend.PUBLIC_URL`
- `AUTH0_DOMAIN` - ваш Auth0 domain
- `AUTH0_AUDIENCE` - ваш API identifier

### Frontend (BUILD_TIME)

- `VITE_API_URL` - автоматично з `backend.PUBLIC_URL`
- `VITE_AUTH0_DOMAIN` - ваш Auth0 domain
- `VITE_AUTH0_CLIENT_ID` - ваш Auth0 Client ID
- `VITE_AUTH0_AUDIENCE` - ваш API identifier

## Масштабування

Для production оновіть:

- `instance_count` - кількість інстансів backend
- `instance_size_slug` - розмір інстансу (basic-xxs, basic-xs, basic-s, тощо)

## Troubleshooting

1. **Build fails**: Перевірте логи build в DigitalOcean dashboard
2. **Database connection fails**:
   - Перевірте `DB_URI` в змінних середовища
   - Перевірте MongoDB Atlas Network Access settings
   - Переконайтеся, що connection string правильний
3. **Auth0 не працює**: Перевірте змінні середовища та налаштування Auth0
4. **Frontend не може достукатися до backend**: Перевірте `VITE_API_URL` та CORS налаштування

## Додаткові ресурси

- [DigitalOcean App Platform Documentation](https://docs.digitalocean.com/products/app-platform/)
- [App Spec Reference](https://docs.digitalocean.com/products/app-platform/reference/app-spec/)
