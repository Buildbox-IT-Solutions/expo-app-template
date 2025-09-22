# expo-app-template

Este é um projeto mobile criado utilizando [React.js](https://react.dev/), uma biblioteca para construção de interfaces de usuário, e [Expo@54](https://expo.dev/), um gerenciador de código nativo e bundler que simplifica o desenvolvimento de aplicações mobile para Android e iOS.

## Tecnologias Principais

* **React.js**: Biblioteca JavaScript para construção de interfaces de usuário.
* **Expo**: Plataforma para desenvolvimento de aplicativos móveis que fornece ferramentas e serviços para criar, compilar e implantar aplicativos nativos com rapidez e eficiência. Ele abstrai a complexidade do código nativo, facilitando o uso de APIs e a integração com funcionalidades específicas de dispositivos móveis.
* **i18next**: Biblioteca para internacionalização (i18n) e tradução, garantindo suporte a múltiplos idiomas de forma centralizada e eficiente.

## Requisitos

Antes de iniciar o desenvolvimento, certifique-se de ter as seguintes ferramentas instaladas:

* **Node.js** : v22.14.0
* **Pnpm** : Gerenciador de pacotes v10.13.1
* **Git** : Controle de versão (GitFlow)

Você pode verificar as versões instaladas executando os seguintes comandos no terminal:

```bash
node -v
pnpm -v
git --version
```

## Configurações de Desenvolvimento

### Extensões Recomendadas

O repositório contém uma pasta `.vscode` com arquivos de configuração importantes, incluindo `settings.json` e `extensions.json`. Essas configurações são essenciais para garantir que o ambiente de desenvolvimento esteja alinhado com as necessidades do projeto, facilitando a colaboração entre os desenvolvedores.

As extensões recomendadas garantem que todos os desenvolvedores utilizem as mesmas ferramentas e padrões, promovendo a integridade do código e facilitando a manutenção.

### Configurações do VSCode

Dentro do arquivo `settings.json`, estão incluídas configurações que trabalham em conjunto com as extensões recomendadas, garantindo que o código esteja sempre formatado corretamente. Isso ajuda a evitar problemas de formatação ou linting entre diferentes ambientes de desenvolvimento.

### Padronização do Código

Na raiz do projeto, você encontrará os seguintes arquivos responsáveis pela padronização do código:

* **.editorconfig**: Define regras básicas de estilo de código, como indentação, espaçamento, e final de linha.
* **biome.json**: Arquivo de configuração do Biome JS, uma ferramenta completa que combina linting, formatação e outros utilitários para manter o código consistente, livre de erros e alinhado às melhores práticas.

Esses arquivos, em conjunto com as configurações do VSCode, garantem que todos os desenvolvedores sigam as mesmas regras de estilo, evitando divergências no código e assegurando a integridade e legibilidade.

## Fluxo de Commits e Integração Contínua

Este projeto adota uma abordagem rigorosa para garantir a integridade dos commits e a consistência do código ao longo do desenvolvimento.

### Estrutura das Mensagens de Commit

Para garantir que as mensagens de commit sejam claras e sigam um padrão consistente, utilizamos o **Commitlint** para validar a estrutura de cada commit. O formato a ser seguido é o seguinte:

`<tipo>:<descrição breve>`

### Tipos de Commit Permitidos

A mensagem de commit deve começar com um dos seguintes tipos:

* **feat** : Usado para descrever a adição de uma nova funcionalidade.
* **fix** : Indica a correção de um bug.
* **chore** : Refere-se a tarefas que não alteram o código da aplicação (por exemplo, atualizações de dependências).
* **style** : Para mudanças relacionadas à formatação de código (sem alterar o comportamento), como ajustes de espaçamento ou indentação.
* **refactor** : Usado quando há uma refatoração no código sem mudanças em sua funcionalidade.
* **doc** : Refere-se a mudanças na documentação do projeto.
* **wip** : Para algo que ainda esta sendo trabalhado (Work in progress)

### Regras para a Descrição

* **A descrição** deve ser breve e objetiva, escrita em **letras minúsculas** e no  **imperativo** , explicando o que foi feito no commit. Exemplo: `feat: implement user login functionality`
* **Limitação de comprimento** : A linha de descrição não deve ultrapassar 72 caracteres para manter a legibilidade.

### Exemplo de Mensagem de Commit

Aqui estão exemplos de mensagens de commit seguindo o padrão do projeto:

* `feat: add user authentication`
* `fix: correct typo in login page`
* `chore: update dependencies`
* `style: fix indentation in App.js`
* `refactor: improve performance of data fetching`
* `doc: update README with installation instructions`

### Git Hooks e Linting de Commits

O [**Lefthook**](https://github.com/evilmartians/lefthook) está configurado para rodar scripts automaticamente antes dos commits e push. O **Commitlint** valida a estrutura da mensagem de commit, garantindo que todos os desenvolvedores sigam o padrão estabelecido.

---

### Scripts de Pré-push e Build

Antes de realizar um push, o script de **lint** é invocado automaticamente para garantir que o código não contenha erros. Junto a isso uma validação de tipos também e invocada para garantir que somente código em bom estado seja enviado ao repositório remoto.

---

## Arquitetura do Projeto

O projeto está organizado de maneira modular e escalável, facilitando a manutenção e a expansão ao longo do tempo. A seguir, é descrita a estrutura de diretórios dentro da pasta `src/` e o propósito de cada pasta:

```bash
src
├───app
├───assets
├───components
├───enums
├───hooks
├───i18n
│   └───languages
├───services
├───interfaces
├───stores
├───themes
├───types
└───utils
```

### Descrição das Pastas  

* **`app`**: Contém a configuração de rotas e as telas principais do aplicativo. É o ponto de entrada para a navegação e estrutura das páginas.  
* **`assets`**: Armazena arquivos estáticos como imagens, fontes e ícones utilizados no aplicativo.  
* **`components`**: Componentes reutilizáveis e desacoplados, como botões, cabeçalhos, inputs e outros elementos da interface de usuário.  
* **`enums`**: Define constantes organizadas como enums, permitindo maior legibilidade e evitando valores mágicos no código.  
* **`hooks`**: Contém hooks personalizados que encapsulam lógica reutilizável e abstraem funcionalidades específicas.  
* **`i18n`**: Diretório responsável pela internacionalização, contendo a configuração principal e os arquivos de tradução dentro da subpasta `languages`.  
* **`services`**: Camada de serviço, contem todas as chamadas a api externas
* **`interfaces`**: Declarações de tipos e interfaces do TypeScript para garantir tipagem e segurança no desenvolvimento.  
* **`stores`**: Implementação de estados globais ou locais, usando bibliotecas como Zustand, Context API ou outra solução de gerenciamento de estado.  
* **`themes`**: Define estilos globais, temas de cores e configurações de design para manter a consistência visual do aplicativo.  
* **`types`**: Tipos genéricos do TypeScript que não estão diretamente relacionados a interfaces específicas, mas são usados amplamente no projeto.  
* **`utils`**: Funções utilitárias e helpers reutilizáveis que encapsulam lógicas comuns ou complexas.  

## Fluxo de GitFlow

O projeto segue uma variação do GitFlow para garantir a integridade do código e a integração contínua. As branches principais e de integração contínua estão organizadas da seguinte maneira:

### Branches Principais

* **main** : É a branch principal do projeto, onde o código está sempre em estado pronto para produção.
* **dev** : Criada a partir da branch `main`, serve como o ambiente de desenvolvimento contínuo. Todas as novas features e correções são integradas aqui.

### Fluxo de Desenvolvimento

1. **Criação de Tasks** : Toda task começa com a criação de uma nova branch a partir da branch `dev`. Essas branches são nomeadas seguindo o padrão: `<tipo>/<descrição-da-task>`
   onde `<tipo>` pode ser:

* **feat** : Para novas funcionalidades
* **fix** : Para correção de bugs
* **hotfix** : Para correções críticas
* **refactor** : Para refatoração de código
* **doc** : Para alterações na documentação

   Exemplo de branch: `feat/login-screen`

### Pull Requests

Após o desenvolvimento de uma task, o código é integrado de volta na branch `dev` através de Pull Requests (PRs). As PRs garantem que o código seja revisado antes de ser integrado, mantendo a qualidade e consistência.

### Padrão para Nomeação de Branches

As branches seguem um padrão de nomenclatura semelhante aos commits, utilizando os seguintes tipos:

* **feat** : Para novas funcionalidades
* **fix** : Para correções de bugs
* **hotfix** : Para correções urgentes em produção
* **refactor** : Para mudanças de código que não alteram a funcionalidade
* **doc** : Para mudanças na documentação

O corpo da mensagem é sempre em minúsculas e as palavras são separadas por hifens (`-`), como no exemplo abaixo:

`feat/create-login-screen`  `fix/form-error`

---

Esse fluxo garante que o código seja constantemente validado e testado, evitando que mudanças problemáticas sejam introduzidas em produção.
