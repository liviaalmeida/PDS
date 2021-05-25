# PDS
Repositório para o trabalho de Prática em Desenvolvimento de Software.

## Equipe

Pretendemos organizar o trabalho de forma que todos os membros participem pelo menos um pouco de todas as partes do desenvolvimento e consigam ter experiencia de trabalhar com tudo. Porém achamos que seria interessante definir responsáveis por cada área também, para facilitar a gestão.

- Bruna Melo (Front-end)

- Philipe Atela (Back-end/Devops)

- Gabriel Chaves (Back-end/Devops)

- Lívia Almeida (UI/UX, Front-end, DBA)

## Projeto

O **Puncto** é uma aplicação de apontamento de horas voltada para profissionais autônomos. Além de fazer o controle de horas, permite também geração de invoices.

Features:
- Autenticacao
- Lancamento de horas
- Geracao automatizada de invoices
- Cadastro de clientes

## Stack

- **Cross**

  - [TypeScript](https://www.typescriptlang.org/)

  - [ESLint](https://eslint.org/)

  - [Jest](https://jestjs.io/)

  - [New Relic](https://newrelic.com/)

- **Front**

  - [Vue.js](https://vuejs.org/)

  - [SCSS](https://sass-lang.com/)

  - [Figma](https://www.figma.com/)

  - Analytics (A definir)

  - Teste de interface (A definir)

- **Back**

  - [Express](https://expressjs.com/)

  - [MongoDB](https://www.mongodb.com/1)

  - [SuperTest](https://github.com/visionmedia/supertest)

- **Ops**

  - Cloud Provider (A definir)
  - [Github Actions](https://github.com/features/actions)

## User Stories
 - **Autenticacao**: como usuario, sou capaz de criar uma conta, fazer log in e salvar as coisas.
 - **Cadastro de dados pessoais:** como usuario, consigo cadastrar os dados do meu cliente na plataforma, para nao precisar preencher todo mes
 - **Cadastro de clientes:** como usuario, consigo cadastrar os dados do meu cliente na plataforma, para nao precisar preencher todo mes
 - **Lancamento de horas:** como usuario, consigo especificar quantas horas trabalhei no dia (interface no estilo "play/pause" ou uma tabela/input pedindo horas de inicio e termino?) e salvar essa informacao. Consigo tambem visualizar isso de forma consolidada facilmente
 - **Geracao automatizada de invoices:** como usuario, consigo facilmente juntar as informacoes de lancamento de hora do mes, com as de um cliente cadastrado e mais algumas informacoes adicionais e gerar um invoice automatico.

## SPRINT 1
  - Fazer setup backend [Gabriel] [Inception]
  - Fazer setup frontend [Livia] [Inception]
  - Fazer prototipo visual [Livia] [Autenticacao]
  - Fazer diagrama da arquitetura do projeto [Philipe]
  - Criar api de login [Philipe] [Autenticacao]
  - Criar tela de login [Bruna] [Autenticacao]
  - Criar api de cadastro de dados pessoais [Gabriel] [Cadastro de dados pessoais]
  - Criar tela de cadastro de dados pessoais [Bruna] [Cadastro de dados pessoais]

## SPRINT 2
  - Criar api de cadastro de clientes
  - Criar tela de cadastro de clientes
  - Criar api de gerenciamento de ponto
  - Criar tela de gerenciamento de ponto

## SPRINT 3
  - Criar api de invoices
  - Criar tela de invoices
  - Criar tela de ajuda
  - Criar tela de estatistica


