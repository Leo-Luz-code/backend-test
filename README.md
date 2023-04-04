# Be mobile - Teste de Back-end
Para implemetar o projeto, optou-se por utilizar Node.js, mais especificamente o framework AdonisJS utilizando o método de desenvolvimento TDD.

## Funcionalidades
- Sistema de autenticação e autorização com token Opaco e Bounce (ler Dificuldades). 
- Envio de token de redefinição de senha para o email do usuário.
- CRUD de clientes, produtos, telefones, vendas e usuários

## Endpoints implementados 
# Route.get 
`/clientes`, `/clientes/:id`
`/produtos`, `/produtos/:id`
`/telefones`, `/telefones/:id`

# Route.post
`/usuarios`
`/forgot-password`
`/reset-password`
`/clientes`
`/enderecos`
`/telefones`
`/produtos`
`/vendas`
`/sessions` 

# Route.delete
`/sessions` 
`/clientes/:id`
`/produtos/:id`
`/telefones/:id`

# Route.put
`/clientes/:id`
`/produtos/:id`
`/usuarios/:id`
`/enderecos/:id`
`/telefones/:id`

## Iniciando a API 
# Execute os comandos na ordem:
- CREATE USER user WITH PASSWORD 123456;
- CREATE DATABASE backend;
- use backend;
- ALTER USER 'user'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

Agora na pasta raiz do projeto, execute:
- node ace migration:run
- node ace serve --watch

## Dificuldades
Ainda não foi possível implementar com sucesso o sistema de autenticação e autorização. A versão do AdonisJS utilizada não suporta JWT então optou-se por utilizar Opaco, mas está ocorrendo um bug ao enviar as migrations da sessão para o banco de dados, impedindo a API de funcionar devidamente. 
Dito isso, está sendo enviada uma versão sem essa feature, mas que consegue passar pelas etapas de iniciar a API.