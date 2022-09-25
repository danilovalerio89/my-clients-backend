### <h1 align="center">my-clients-api</h1>

<p align="center">Pequena API para fins de estudos, demonstrando relacionamento entre tabelas, autenticação e autorização de usuário. 
API para criação de usuário e seus contatos.</p>

---

Para utilizar o my-clients-api você precisará:

## Clonar o repositorio

## Git clone

    git clone <link abaixo>

<a href="https://github.com/danilovalerio89/my-clients-api"> GIT HUB </a>

Após o clone do repositório sera necessario seguir os seguintes passos:

## Install

    yarn install

## Configuração .env

    Criar o arquivo .env e configurar como o .env.example

## Migration

    $ sudo yarn typeorm migration:generate src/migrations/client -d src/data-source.ts

## Migration Run

    $ sudo api yarn typeorm migration:run -d src/data-source.ts

## Startar aplicação

    $ sudo yarn dev

## Testes

    $ yarn test

## Rotas

    User:
    (GET)   -> /user/profile
    (POST)  -> /login/      -   ({email: string, password: string})

    (POST)  -> /user/       -   ({name: string, email: string, password: string})  - Authentication: Token
    (PATCH) -> /user/<uuid> -   ({name: string, email: string, password: string})  - Authentication: Token
    (DELETE)-> /user/<uuid> -                                                      - Authentication: Token

    Contacts:
    (GET)   -> /contacts/       -                                                     - Authentication: Token
    (GET)   -> /contacts/<uuid> -                                                     - Authentication: Token
    (POST)  -> /contacts/       -({firstName: string, lastName: string,
                                            email: string, phone:string})             - Authentication: Token
    (PATCH) -> /contacts/<uuid> -({firstName: string, lastName: string,
                                            email: string, phone:string})             - Authentication: Token
    (DELETE)->/contacts/<uuid>  -                                                     - Authentication: Token
