<h1 align="center">Desafio Colmeia</h1>

<p align="center">
    <img alt="Made by Richard Junio" src="https://img.shields.io/badge/made%20by-Richard_Junio-CD2E75">
</p>
<p align="center">
  <a href="#rodando-o-projeto-localmente">Rodando o projeto localmente</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias-utilizadas">Tecnologias</a>
</p>

Projeto desenvolvido para o desafio da Colmeia no qual utilizamos um banco de dados no Back4App para responder as seguintes perguntas:

* Qual o nome do primeiro filme lançado?
* Quais espécies vivem menos tempo em média?
* Existem quantos personagens de cada gênero?
* Qual a altura média dos personagens?
* Quais personagens falam a língua Gungan basic?
* Quantos personagens vivem no planeta mais populoso?


## Rodando o projeto localmente

## Pré requisitos

### Para executar o software localmente, são necessárias as seguintes ferramentas:

<li>
<a href="https://nodejs.org/en/download/">NodeJS (Preferencialmente a versão LTS)</a>
</li>

## Instalação

### 1 - Baixe o repositório

```bash
git clone https://github.com/richardjlv/desafio-colmeia.git
```

### 2 - Navegue para a pasta do projeto

```
cd desafio_colmeia
```

### 3 - Instale as dependências

Dentro da pasta, execute:

```
npm install
```

### 4 - Para gerar o documento .csv com as respostas

Dentro da pasta, execute:
```
npm run start
``` 
Com isso, será gerado um arquivo 'answer.csv' na raiz do projeto.

### 5 - Para executar o server

Dentro da pasta, execute:
```
npm run dev
```
Com isso, o servidor estará executando localmente em http://localhost:3333

### 6 - Para executar os testes

Dentro da pasta, execute:

```
npm run test
```

### 7 - Para gerar a build

Dentro da pasta, execute:

```
npm run build
```

## Tecnologias utilizadas

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Nodemon](https://nodemon.io/)
- [Parse](https://parseplatform.org/)
- [Jest](https://jestjs.io/)
- [Parse Mock](https://github.com/Hustle/parse-mockdb)
