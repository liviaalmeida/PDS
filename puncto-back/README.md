# Backend

Informações úteis sobre o backend do projeto

## O que eu preciso pra rodar o projeto?

- Node js
- Yarn
- Docker

## Como rodar?

- Rode o comando "yarn run start", isso irá compilar o typescript, iniciar o docker com o mongo na porta 27017 e iniciar o servidor na porta 3000

## Como debugar?

- Para debugar, rode o comando "yarn run dev:debug" e depois inicie o debug no vscode com a configuração que esta no arquivo launch.json

## Como acessar o banco que está rodando local?

- Se você ja estiver com o container do docker rodando, você pode acessar a url "localhost:8081" pois nela esta rodando uma interface do mongo que te perite ver as collections, doccuments, etc.

## Como rodar os testes?

- Você pode rodar todos os testes com o comando "yarn run test", porém caso vc precise debugar ou rodar apenas um arquivo, recomendo que baixe a extensão "Jest Runner" no seu vscode

## MongoDB

- Caso você não tenha contato com NOSQL, de uma olhada em https://docs.mongodb.com/manual/introduction/
