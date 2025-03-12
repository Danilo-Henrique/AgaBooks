# Backend de teste para o app trackpet

Tcc part 1 - App de rastreio de pets

## RFs (Requisitos funcionais)

- [x] Deve ser possível cadastrar um novo usuário
- [x] Deve ser possível realizar login tendo usuário e senha
- [ ] Deve ser possível editar os dados de um usuário

## RNs (Regras de negócio)

- 

## RNFs (Requisitos não funcionais)

- [x] criptografar a senha do usuário



---

# Para rodar o projeto no seu ambiente local

## Adicione as variaveis de ambiente corretamente no arquivo
- .env

## Rode o container do docker que contem o banco de dados postgresql
``` docker compose up -d ```

## Aplique as migrations no banco de dados
- 1 ``` npx prisma migrate generate```
- 2 ``` npx prisma migrate dev ```

## Para rodar o servidor e subir a api
``` npm run dev ```

### :tada: pronto!
