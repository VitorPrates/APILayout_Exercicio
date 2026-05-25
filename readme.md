
# Kiphomy

Um projeto que visa de forma rápida e direta demonstrar como fazer as mais diversas receitas culinárias do mundo. O projeto visa exibir apenas o que é interessante ao usuário na hora de criar sua refeição, dividindo em telas suas opções de visualização.


## API Reference

#### Buscar Receitas por ID

```http
  GET /api/recipes/${id}
```

| Parameter | Type     | 
| :-------- | :------- | 
| `id da receita` | `int` |

#### Buscar Receitas por Palavra Chave

```http
  GET /api/recipes/search?q=${pesquisa}
```

| Parameter | Type     | 
| :-------- | :------- | 
| `Palavra chave` | `String` |

#### Traduzir textos

```http
  GET /api//exec?text=${texto}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `texto`      | `string` | Pega o texto em inglês da api de receitas e devolve em PT-BR |

#### testarTraducao(texto)
Recebe o texto em inglês e o devolve em Português.

#### pesquisar_receita(pesquisa)
Recebe o termo de pesquisa e faz a requisição da api de receitas, podendo a pesquisa ser por ID ou Palavra Chave.

#### navegar_receitas(indice)
Funciona quando a pesquisa feita pelo usuário é por Palavra Chave, servindo para navegar apenas pelos resultados encontrados.


## Authors

- [@Vitor Prates](https://github.com/VitorPrates)

