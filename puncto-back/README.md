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



## Endpoints

### /Ponto

--------

Consulte a pasta collections para achar exemplos das requisições ja prontas.

----------------------------------------
Endpoint: /ponto

Método: POST

Descrição: Endpoint utilizado para criar o registro inicial de um ponto.

Exemplo de body:
{
	"clienteId": "60f88ca02f14b87ad79fabaf",
	"timestampDateEntrada": 1626728432590,
	"descricaoAtividade": "dançando"
}

Exemplo da url: http://localhost:3000/ponto.

------
Endpoint: /ponto

Método: PUT

Descrição: Endpoint utilizado para atualizar o registro de um ponto que ja foi criado.

Exemplo de body:
{
	"id": "61205254d56dd04a76ef7e40",
	"timestampDateEntrada": 1626728432590,
	"timestampDateSaida": 1626728432592,
	"descricaoAtividade": "dançando muito",
	"clienteId": "60f88ca02f14b87ad79fabaf"
}

Exemplo da url: http://localhost:3000/ponto

Detalhes: O parâmetro id deve ser o id do ponto, que é retornado quando um ponto é criado. 

------
Endpoint: /ponto/:idDoPonto

Método: DELETE

Descrição: Endpoint utilizado para deletar o registro de um ponto que ja foi criado.

Exemplo de body: Não possui body.

Exemplo da url: http://localhost:3000/ponto/60fa2276ce7613cd8ca04277

Detalhes: O query parameter :idDoPonto deve ser trocado pelo id do ponto que você deseja excluir.

------
Endpoint: /ponto/:idDoPonto

Método: GET

Descrição: Endpoint utilizado para buscar o registro de um ponto específico que ja foi criado.

Exemplo de body: Não possui body.

Exemplo da url: http://localhost:3000/ponto/60fa2276ce7613cd8ca04277

Detalhes: O query parameter :idDoPonto deve ser trocado pelo id do ponto que você deseja buscar.

------
Endpoint: /ponto/mes/:numeroDoMes

Método: GET

Descrição: Endpoint utilizado para buscar todos os registros de pontos de um mês específico.

Exemplo de body: Não possui body.

Exemplo da url: http://localhost:3000/ponto/mes/7

Detalhes: O query parameter *:numeroDoMes* deve ser trocado pelo numero que representa o mês que você deseja (Janeiro=0, Fevereiro=1,Março=2....).

------