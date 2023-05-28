# Instapets

## Wymagania

NodeJs 20.x.x

## Uruchomienie

Zainstaluj NodeJs
```
nvm install 20
```

Utwórz plik `.env` w głównym katalogu
```
#AWS
AWS_SES_REGION=""
AWS_SES_SENDER_EMAIL_ADDRESS=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
# PRISMA
DATABASE_URL="file:./instapets.db"
```

Zainstaluj yarn
```
npm install --global yarn
```

Wykonaj migracje 
```
$ prisma migrate reset
```

Uruchom aplikacje w trybie dev
```
npx nodemon src/backend/index.ts
```

## Przydatne komendy

### Wykonanie migracji PRISMA

Create a migration from changes in Prisma schema, apply it to the database, trigger generators (e.g. Prisma Client)
```
$ prisma migrate dev
```

Apply pending migrations to the database in production/staging
```
$ prisma migrate deploy 
```

Reset your database and apply all migrations
```
$ prisma migrate reset
```