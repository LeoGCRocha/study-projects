# Prisma
## > Start prisma project
```
npx prisma init --datasource-provider sqlite
```
## Migrations 
### Create migrations from models
```
npx prisma migrate dev --name "init"
```
### See database
```
npx prisma studio
```