Neste teste, vamos avaliar suas habilidades em desenvolvimento backend usando Node.js, banco de dados MongoDB e PayloadCMS, bem como capacidade de raciocinar, fazer perguntas e desenvoltura como programador. O objetivo é entender sua capacidade de estruturar e desenvolver uma aplicação funcional, além de sua habilidade para justificar as decisões técnicas tomadas e/ou questionar quando for preciso (Acredite sempre será!).

### Objetivo do Teste
Criar uma API para gerenciar um catálogo de produtos usando Node.js e MongoDB, com a administração dos dados sendo feita via PayloadCMS. A aplicação deve fornecer funcionalidades de CRUD (criação, leitura, atualização e exclusão) para os produtos e autenticação de usuários para proteger determinadas rotas.

OBS: Caso sinta mais confortável, pode usar apenas o Node.js, mas atente-se pois será necessário fazer o autenticação do zero (O payload já entrega pronto). Essa é uma escolha apenas de conforto pro teste técnico. Aqui dentro se usa o payload no monorepo.

### Requisitos Técnicos

1. **Node.js**: Desenvolva a API usando Node.js, estruturando as rotas, middleware e demais funcionalidades com a abordagem que preferir.
2. **MongoDB**: Use MongoDB para armazenar os dados dos produtos. Organize a estrutura do banco de dados de forma eficiente para consultas e operações de CRUD.
3. **PayloadCMS**(Opcional): Configure o PayloadCMS como painel administrativo para gerenciar os produtos e usuários. Permita que o CMS autentique e autorize usuários para acessar certas funcionalidades.
4. **Autenticação**:
    - Caso opte por criar o sistema de autenticação usando Node.js puro, implemente autenticação JWT para proteger rotas específicas da API, como criação, atualização e exclusão de produtos.
    - Se preferir utilizar PayloadCMS para a autenticação, configure e use o sistema de autenticação do PayloadCMS para proteger essas rotas.
5. **Documentação da API**: Documente os endpoints da API, incluindo parâmetros, métodos HTTP, respostas e códigos de status. Fique à vontade para usar ferramentas como Swagger, Postman, Hoppscotch, ApiDog ou até mesmo documentação manual em Markdown.

### Funcionalidades

- **API de Produtos**:
    - Criação, listagem, atualização e exclusão de produtos.
    - Cada produto deve conter as seguintes informações: nome, descrição, preço, quantidade em estoque e data de criação.
- **API de Catálogos**:
    - Criação, listagem, atualização e exclusão de catálogos.
    - Cada catálogo deve conter uma lista de produtos.
    - Ese catálogo pertencerá a um usuário
- **Autenticação**:
    - Implemente a autenticação JWT do zero ou use a autenticação do PayloadCMS, conforme sua escolha, para proteger as rotas de criação, atualização e exclusão.
    - Usuários autenticados devem poder acessar o PayloadCMS para gerenciar os produtos.
- **Painel Administrativo (PayloadCMS)**:
    - Configure o PayloadCMS para permitir que usuários administrativos gerenciem os produtos e vejam as informações de produtos cadastrados.

### Critérios de Avaliação

1. **Funcionalidade**: Todas as funcionalidades descritas foram implementadas e funcionam conforme esperado.
2. **Qualidade do Código**: Organização, clareza e práticas recomendadas de desenvolvimento.
3. **Estrutura do Banco de Dados**: Otimização e organização dos dados no MongoDB.
4. **Documentação da API**: Clareza e detalhamento dos endpoints da API.
5. **Boas práticas**: Implementação de boas práticas, especialmente em relação à autenticação e ao acesso ao PayloadCMS.

###  Pontos importantes

1. Caso não consiga desenvolver alguma parte, não se preocupe. Apenas tente anotar e entender qual foi a dificuldade para não conseguir
2. Implemente Apenas o que foi Descrito no teste, mas anote para a segunda etapa o que você acredita que seria interessante de regra de negócio para essa aplicação. Caso falte **contexto**, que perguntas você faria pra **entender** mais o **problema**, a aplicação e pra que ela estaria sendo usada

### Fundamentação das Decisões Técnicas

É importante que você descreva e justifique as decisões técnicas que tomou ao longo do desenvolvimento. Explique, por exemplo, o motivo da escolha do método de autenticação, estrutura de banco de dados, ou qualquer outro aspecto que considere relevante. Essas justificativas são essenciais para avaliarmos sua capacidade de pensar de forma crítica e fundamentada, um aspecto valioso para decisões futuras e escalabilidade do projeto.

### Instruções de Envio

- Submeta o código em um repositório público no GitHub, incluindo um README detalhado com as instruções de configuração e execução.
- Envie o link do repositório e, se possível, uma URL para testar a API.