# Firgun-backend

### Executar o projeto

```bash
$ git clone https://github.com/DenisMedeirosSDK/firgun-backend.git

$ cd firgun-backend
```

Crie um arquivo `.env` igual ao `.env.example` e configure com suas credenciais.

```bash
# Instalar as dependencias do projeto
$ npm install

# Criar banco de dados mysql com docker
$ docker run -it --rm -e MYSQL_ROOT_PASSWORD=dockerpass -e MYSQL_DATABASE=dockerdb --name mysqldb -p 3306:3306 mysql:5.7
# URL gerada: mysql://root:dockerpass@localhost:3306/dockerdb

# Gerar as migrations necessarias par ao banco de dados
$ npx prisma migrate dev

# Iniciar servidor
$ npm run dev
```
