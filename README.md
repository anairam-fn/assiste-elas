<h2 align="center">
  <p align="center">Assiste Elas :soccer:<p>
</h2>

---
<p align = "center">
<a align href =(#-Sobre)>Sobre</a> │
<a align href =(#-Contexto)>Contexto</a> │
<a align href =(#-Regras)>Regras</a> │
<a align href =(#-Documentação)>Documentação</a> │
<a align href =(#-Tecnologias-e-Pacotes)>Tecnologias e Pacotes</a> │
<a align href =(#-Contribuição)>Contribuição</a> │
</p>

---

### Sobre

Projeto de conclusão do Bootcamp de Back-end da [{reprograma}](https://reprograma.com.br/). O projeto objetiva realizar a propagação do futebol feminino através da reunião de informações sobre times e partidas que irão acontecer.

### Contexto

<img src="img/player.png" alt="jogadora de futebol" width ="400" align="left" padding="250"/>

  Durante muito tempo o preconceito e a falta de interesse fez com que o futebol feminino passasse anos invisível para a sociedade, com pouca torcida, sem patrocínios e com escassos registros.
  Contudo, com a projeção da internet, conseguimos perceber a ascensão da modalidade que conseguiu dinamizar os meios de comunicação e diminuir a dependência dos grandes veículos.
  Atualmente, todas as partidas do Campeonato Brasileiro das séries A1, A2 e A3 são transmitidas, por canais de TV aberta e fechada, ou pela internet. Aumentando, assim, o alcance do futebol feminino para o público brasileiro. No entanto, ainda observamos certa dificuldade para a divulgação dessas partidas.
  Nesse sentido, o projeto **Assiste Elas** foi criado para propagar o futebol feminino através de uma aplicação que permite a usuária a visualização de partidas a serem realizadas (onde acontecerão e onde poderão ser assistidas), ou, se desejar, pesquisar pelas partidas de seu time preferido de uma forma simples. Assim, o objetivo é aumentar dos índices de visualizações para que, futuramente, possamos equiparar as condições do futebol feminino com as do futebol masculino.

  Para mais conteúdos sobre o futebol feminino:
  * [Dibradoras](https://dibradoras.com.br)
  * [Joga-pra-Elas](https://www.instagram.com/jogapraelas/)


### Regras

<p>As demandas do negócio são:

- [x] Somente pessoas com login e senha podem **criar**, **atualizar** ou **excluir** informações sobre times e partidas;

- [x] Qualquer pessoa pode **visualizar** as informações sobre times e partidas;
</p>

#### Informações

No projeto, são armazenados dois tipos de informações: time e partidas.

Como exemplo de estrutura de um time, sugere-se:

```json
{
  "name": "Palmeiras",
  "country": "Brazil",
  "type": "Club"
}
```

Como estrutura de uma partida, sugere-se:

```json
{
"team1": "idTeam1",
"team2": "idTeam2",
"local": "São Paulo",
"date": 2022-07-27,
"time": "16h",
"type": "Campeonato Brasileiro A1",
"streaming": "SporTV"
}
```

### Rotas

A documentação pode ser acessada através do [Swagger](https://app-assiste-elas.herokuapp.com/documentation/).

- #### Início

  | Feature | Autenticação | Método | Rota |
  | ------- | ------------ | ------ | ---- |
  | Default | :x:          | GET    | `/`  |

- #### Times

  | Feature                                      | Autenticação       | Método | Rota          |
  | -------------------------------------------- | ------------------ | ------ | ------------- |
  | Criar time                                   | :heavy_check_mark: | POST   | `/team`       |
  | Visualizar todos os times                    | :x:                | GET    | `/teams`      |
  | Visualizar times por tipo (clube ou seleção) | :x:                | GET    | `/teams/type` |
  | Visualizar time por nome                     | :x:                | GET    | `/team/name`  |
  | Atualizar informações de um time             | :heavy_check_mark: | PATCH  | `/team/{:id}` |
  | Deletar time                                 | :heavy_check_mark: | DELETE | `/team/{:id}` |

- #### Partidas

  | Feature                                   | Autenticação       | Método | Rota               |
  | ----------------------------------------- | ------------------ | ------ | ------------------ |
  | Criar partida                             | :heavy_check_mark: | POST   | `/match`           |
  | Visualizar todas as partidas              | :x:                | GET    | `/matches`         |
  | Visualizar partidas de um time específico | :x:                | GET    | `/matches/team`    |
  | Visualizar partidas de um dia específico  | :x:                | GET    | `/matches/day`     |
  | Atualizar dados de um partida             | :heavy_check_mark: | PATCH  | `/match/:id`       |
  | Deletar uma partida                       | :heavy_check_mark: | DELETE | `/culinaria/{:id}` |

- #### Administradoras
  | Feature                               | Autenticação       | Método | Rota           |
  | ------------------------------------- | ------------------ | ------ | -------------- |
  | Cria usuária                          | :heavy_check_mark: | POST   | `/admin`       |
  | Fazer login                           | :x:                | POST   | `/admin/login` |
  | Atualizar dados de uma administradora | :heavy_check_mark: | PATCH  | `/admin/:id`   |
  | Deletar uma administradora            | :heavy_check_mark: | DELETE | `/admin/:id`   |

### Tecnologias e Pacotes

- Git;
- Mongo Atlas
- Heroku
- Node.js;
- MongoDB;
- express (4.18.1);
- nodemon (2.0.19);
- dotenv-safe (8.2.0);
- mongoose (6.4.3);
- bcrypt (5.0.1);
- jsonwebtoken (8.5.1);
- cors (2.8.5);
- swagger-autogen (2.21.5);
- swagger-ui-express (4.5.0);
- eslint (8.20.0);
- jest (28.1.0);
- supertest (6.2.4);

### Contribuição

- Primeiramente, para contribuir, faça um `fork` do projeto;

- Copie a url do _fork_ realizado e, no _prompt de comando_ da sua máquina, realize o clone do projeto através do `git clone <link_do_fork_do_repositorio>`;

- Crie uma _branch_ para realizar suas contribuições `git checkout -b feature/<sua_branch>`;

- Instale as dependências necessárias à execução da API através do comando `npm install`;

- No raiz do projeto, renomeie `.env.example` para `.env` e adicione os valores das variáveis `PORT` (porta sugerida `3000`), `DATABASE_URI` (string de conexão com o banco de dados) e `SECRET` (chave RSA). Essas variáveis de ambiente serão necessárias para a execução da API em sua máquina;

- Para executar a API, utilize o comando `npm start` no seu terminal;

- Após suas contribuições no projeto, realize o _commit_ com o comando `git commit -m 'sua mensagem'`;

- Para subir o projeto no seu GitHub, basta executar o comando `git push origin feature/<sua_branch>`;

- E finalize criando um novo _Pull Request_ com as contribuições para o projeto original. :heart:

<h5 align="center">
<p align="center">Projeto desenvolvido por <a href="https://www.linkedin.com/in/mariana-nunes98/">Mariana Nunes</a>.</p>
</h5>
