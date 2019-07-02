# Data Lovers

## Objetivo do projeto

Este projeto foi proposto pela Laboratoria durante o bootcamp de 2019. 

O objetivo do projeto é criar uma página Web, em JavaScript (ES6), HTML e CSS não sendo permitido o uso de nenhuma biblioteca ou framework, com base em um conjunto de dados pré-estabelecidos, onde seja possível visualizar os dados, filtrá-los, ordená-los e fazer algum cálculo estatístico de mínimo e máximo. Os dados que escolhemos para este trabalho foram do jogo online [League of Legends](play.br.leagueoflegends.com/pt_BR) e o resultado pode ser visto [aqui]( https://anacamargo.github.io/data-lovers/).

## Definição do produto
 
A interface foi pensada para que os usuários pudessem ver todos os campeões em formato de carta. A frente da carta mostra uma imagem do campeão, seu nome e seu tipo que pode ser: Assassin, Fighter, Mage, Marksman, Melee, Support e Tank. O verso da carta mostra as informações abaixo referentes aquele personagem.

* HP - Pontos de vida 
* HP Regeneration - Regeneração dos pontos de vida
* Attack Damage - Dano de ataque
* Attack Speed - Velocidade de ataque
* Speed - Velocidade 
* Armor - Armadura 
* Spell Resistance - Resistência a feitiços
* MP - Pontos de mana 
* MP Regeneration - Regeneração dos pontos de mana

As cartas especiais de mínimo e máximo mostram no seu verso os campeões que possuem as menores e maiores pontuações referente cada quesito e ao filtro selecionado. 

Como os campeões podem ter um ou dois tipos adicionamos os filtros AND e OR, que possibilita restringir ou abranger o filtro de pesquisa. Criamos também seletores de ordenação que mostra o nome dos campeões em ordem crescente e decrescente e ordenação pelo valor máximo de Ataque, Defesa e Magia.

## Definiçao do usuário

Acreditamos que o produto atenda tanto jogadores iniciantes de LOL, que não possuem experiência e tenham dúvidas sobre os tipos de personagens, como jogadores mais assíduos que usariam o produto para consultar os dados e comparar os campeões. 

Abaixo como exemplo temos a figura de duas possíveis personas: 

![Persona1](https://github.com/anacamargo/data-lovers/blob/master/src/image/persona.png)

## Desenho da interface de usuário e Protótipo

Fizemos um protótipo de baixa fidelidade no Marvel, que pode ser visto [aqui](https://marvelapp.com/875ij8d),  para nos ajudar a estruturar a ideia. Realizamos em cima dele pesquisas com usuários, e testes de usabilidade que nos apontaram alguns pontos a melhorar. 
Mudamos bastante a versão final e acreditamos que as mudanças atenderam às expectativas dos usuários. 
