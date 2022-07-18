### PROJETO FINAL

- Objetivo: Desenvolver uma API para realizar a propagação do futebol feminino através da reunião de informações sobre as partidas que acontecerão (times, local, data, horário, tipo de partida - amistoso, campeonato -, transmissão), sobre os times (nome, país) e sobre as seleções nacionais (nome).

**ROTAS/ENDPOINTS**

GET/teams -> lista todos os times
GET/team/name -> acessa um time pelo nome

GET/nationalteams -> lista todos as seleções
GET/nationalteam/name -> acessa uma seleção pelo nome

GET/matches -> lista todas as partidas
GET/matches/team -> lista partidas de um time específico
GET/matches/nationalteam -> lista partidas de uma seleção específica
GET/matches/day -> lista partidas do dia

POST/login -> autorização de acesso ao banco de dados (TODOS ABAIXO IRÃO PRECISAR)
POST/admin/create -> cria admin
PATCH/admin/:id -> atualiza admin
DELETE/admin/:id -> exclui admin

POST/team -> criar novo time
POST/nationalteam -> criar nova seleção
POST/match -> criar nova partida

PATCH/team/:id -> atualiza dados de um time
PATCH/nationalteam/:id -> atualiza dados de uma seleção
PATCH/match/:id -> atualiza dados de uma partida

DELETE/team/:id -> exclui time por id
DELETE/nationalteam/:id -> exclui seleção por id
DELETE/match/:id -> exclui partida por id (excluir partida por data? serase)