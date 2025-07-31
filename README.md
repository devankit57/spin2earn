

## 1. start the compose

```javascript
docker-compose up
```

## 2. update .env

DATABASE_URL= "postgresql://postgres:mysecretpassword@localhost:5432/postgres"


## 3. migrate the database
```javascript
npm run migrate:db
```

## 4. generate prisma client
```javascript
npm run client:db
```