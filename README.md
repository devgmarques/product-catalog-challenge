# Documentação do Catálogo de Produtos

## Sumário
1. [Introdução](#1-introdução)
2. [Arquitetura do Projeto](#2-arquitetura-do-projeto)
   - [Princípios Seguidos](#21-princípios-seguidos)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Design do Código](#4-design-do-código)
   - [Use Cases](#41-use-cases)
   - [Testes Unitários](#42-testes-unitários)
5. [Como Executar o Projeto](#5-como-executar-o-projeto)
   - [Pré-requisitos](#51-pré-requisitos)
   - [Instalação](#52-instalação)
   - [Execução de Testes](#53-execução-de-testes)
6. [Rotas da API](#6-rotas-da-api)
7. [Estrutura de Banco de Dados](#7-estrutura-de-banco-de-dados)
   - [Usuário](#71-usuário)
   - [Catálogo](#72-catálogo)
   - [Produto](#73-produto)
8. [Melhorias e Ideias para Implementação](#8-melhorias-e-ideias-para-implementação)
9. [Considerações Finais](#9-considerações-finais)

## 1. **Introdução**
Este projeto é uma API para um desafio sobre, catálogos de produtos. Com funcionalidades de CRUD e autenticação de usuários. A seguir, detalho as decisões técnicas, tecnologias utilizadas e o processo de desenvolvimento, destacando como as práticas de engenharia de software e padrões arquiteturais foram seguidos.

## 2. **Arquitetura do Projeto**
A estrutura do projeto segue a **Clean Architecture**, separando claramente as camadas de domínio, aplicação, infraestrutura e interfaces externas.

### 2.1 **Princípios Seguidos**
- **SOLID**: Aplicamos os cinco princípios para garantir a escalabilidade e manutenção do código.
- **KISS**: Mantivemos o código simples e fácil de entender.
- **DRY**: Evitamos repetição de lógica e código.
- **Clean Code**: Foco em legibilidade e simplicidade de compreensão.

## 3. **Tecnologias Utilizadas**
O projeto back-end foi desenvolvido utilizando as seguintes tecnologias:
- **Node.js**: Ambiente de execução JavaScript para o back-end.
- **TypeScript**: Adotamos TypeScript para garantir tipagem estática e maior segurança durante o desenvolvimento.
- **Prisma**: Usado para a manipulação de banco de dados e mapeamento objeto-relacional (ORM).
- **MongoDB**: Banco de dados NoSQL para armazenar informações dos produtos e usuários.
- **Vitest**: Framework de testes utilizado para testes unitários.
- **Fastify**: Framework para criar a API RESTful.

## 4. **Design do Código**
### 4.1 **Use Cases**
Implementamos os **casos de uso** seguindo os princípios da Clean Architecture. Os casos de uso são independentes de detalhes de infraestrutura, facilitando o teste e a manutenção. Cada caso de uso é testado com **testes unitários**, onde utilizamos **repositórios em memória** para simular interações com o banco de dados.

### 4.2 **Testes Unitários**
- Os testes unitários foram implementados utilizando **Vitest**. O padrão de testes **spy** foi usado para monitorar interações e garantir o funcionamento correto dos casos de uso.
- Os repositórios em memória permitiram que os testes fossem executados de forma independente do banco de dados, aumentando a velocidade e confiabilidade dos testes.

## 5. **Como Executar o Projeto**

### 5.1 **Pré-requisitos**
Certifique-se de ter instalado:
- Node.js

### 5.2 **Instalação**

1. Clone o repositório:
   ```bash
   git clone https://github.com/devgmarques/product-catalog-challenge.git
   cd product-catalog-challenge
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Configure o arquivo de ambiente:
   - Crie um arquivo `.env` com base no `.env.example` e preencha os valores necessários, como a URL do banco de dados e outras variáveis de configuração.

4. Inicie a aplicação:
   ```bash
   npm run start:dev
   ```

### 5.3 **Execução de Testes**
Para rodar os testes unitários:
```bash
npm run test:watch
```

## 6. **Rotas da API**

A aplicação foi construída utilizando **Fastify** para gerenciar as rotas da API. Todas as rotas seguem o padrão RESTful, com endpoints organizados por recursos. A seguir, apresento o link para documentação com o Postman:

[Link para documentação](https://documenter.getpostman.com/view/33097794/2sAY52dexT)


## 7. **Estrutura de Banco de Dados**

A estrutura de dados é gerida no MongoDB, utilizando o Prisma como ORM. Abaixo está a descrição das principais coleções e seus campos.

### 7.1 **Usuário**

| Campo      | Tipo       | Descrição                               |
|------------|------------|-----------------------------------------|
| `userId`   | String     | Identificador único do usuário.         |
| `name`     | String     | Nome do usuário.                        |
| `email`    | String     | E-mail do usuário.                      |
| `password` | String     | Senha do usuário.                       |
| `catalogs` | Relation[] | Relação com os catálogos do usuário.    |
| `createdAt`| DateTime   | Data de criação do usuário.             |

### 7.2 **Catálogo**

| Campo       | Tipo       | Descrição                                |
|-------------|------------|------------------------------------------|
| `catalogId` | String     | Identificador único do catálogo.         |
| `title`     | String     | Título do catálogo.                      |
| `description` | String   | Descrição do catálogo.                   |
| `userId`    | String     | ID do usuário proprietário do catálogo.  |
| `user`      | Relation   | Relação com o usuário.                   |
| `productIds`| String[]   | IDs dos produtos associados ao catálogo. |
| `products`  | Relation[] | Relação com produtos no catálogo.        |
| `createdAt` | DateTime   | Data de criação do catálogo.             |

### 7.3 **Produto**

| Campo         | Tipo       | Descrição                                   |
|---------------|------------|---------------------------------------------|
| `productId`   | String     | Identificador único do produto.             |
| `name`        | String     | Nome do produto.                            |
| `description` | String     | Descrição do produto.                       |
| `price`       | Int        | Preço do produto.                           |
| `amountStock` | Int        | Quantidade em estoque do produto.           |
| `catalogIds`  | String[]   | IDs dos catálogos que contêm este produto.  |
| `catalogs`    | Relation[] | Relação com catálogos associados.           |

## 8. **Melhorias e Ideias para Implementação**
- **Taxonomia e Categorização de Produtos**: Adicionar um sistema de categorias e tags para que os produtos sejam facilmente classificados, melhorando a organização e a navegação.

- **Uploads de Imagens para Produtos**: Implementar upload de imagens para cada produto, armazenando-os em uma solução de armazenamento (como AWS S3 ou Cloudinary) e associando as URLs aos produtos.

- **Sistema de Avaliações e Comentários**: Permitir que os usuários avaliem e comentem os produtos, com um sistema de classificação baseado em estrelas, o que ajudaria a enriquecer o catálogo e gerar engajamento.

- **Teste de Integração e Cobertura Completa de Testes**: Expandir a cobertura de testes unitários e adicionar testes de integração, garantindo que todas as funcionalidades da API estejam completamente testadas e funcionando conforme esperado.

## 9. **Considerações Finais**

O projeto foi desenvolvido seguindo os bons padrões de arquitetura e design de código, garantindo escalabilidade, facilidade de manutenção e testes robustos.

Feito por Guilherme Henrique Marques.