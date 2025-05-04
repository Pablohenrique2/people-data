
# People-Data &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)
> Projeto de cadastro de informações pessoais com funcionalidades de CRUD.

Este projeto é um formulário simples para cadastrar informações pessoais e permite editar e deletar os dados cadastrados.

## Installing / Getting started

Primeiramente, clone o repositório:

```shell
git clone https://github.com/Pablohenrique2/people-data.git
cd people-data/
```

Instale as dependências necessárias:

```shell
npm install
```

Após a instalação, inicie o servidor de desenvolvimento:

```shell
ng serve
```

Agora, o projeto estará rodando em `http://localhost:4200`.

## Estrutura do Projeto

O projeto segue a seguinte estrutura de pastas:

- **list**: Contém a lógica das ações que mostram os usuários cadastrados e possui funcionalidades de editar ou excluir o usuário.
- **register**: Contém a lógica e a interface para cadastro dos usuários, incluindo as validações dos campos de entrada.
- **nav**:  Contém a lógica e os elementos necessários para facilitar a navegação entre as seções da aplicação.
- **edit-modal-info**: Modal de edição das informações cadastradas, utilizado para modificar os dados do usuário.
- **service/user**: Contém os serviços responsáveis pelas chamadas da API para o backend, consumindo e manipulando os dados.
- **components/personal-form**: Componente reutilizável responsável por encapsular o formulário de cadastro/edição de usuários. Ele é utilizado tanto no cadastro de novos usuários quanto na edição das informações existentes, promovendo reutilização de código e consistência na interface.
- **service/local-storage/local-user.service.ts**: Serviço que lida com a manipulação dos dados de usuário no armazenamento local.
- **service/local-storage/local-registration.service.ts**: Serviço que lida com a manipulação dos registros de usuários no armazenamento local.
- **models/personal-form.model.ts**:  Modelo que define a estrutura de dados para o formulário pessoal.
- **models/registration.model.ts**: Modelo que define a estrutura de dados para o registro de usuários.
- **models/user.model.ts**: Modelo que define a estrutura de dados para o usuário.

## Armazenamento e Manipulação de Dados

O projeto utiliza o **LocalStorage** para o armazenamento e manipulação das informações cadastradas. Os dados dos usuários são salvos localmente no navegador, garantindo persistência durante a navegação na aplicação.

## Desenvolvendo

### Built With
- **Angular 19**
- **ngx-mask** (para mascarar campos de entrada)
- **sweetalert2** (para mostrar alertas interativos)

### Prerequisites

Antes de iniciar, certifique-se de ter o Node.js e o Angular CLI instalados:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Angular CLI](https://angular.io/cli) (versão 19 ou superior)

## Configuração

Você pode configurar os campos do formulário para aceitar apenas valores válidos de acordo com os requisitos do cadastro. A máscara de CPF e telefone pode ser configurada utilizando o `ngx-mask`.

## Testes

O projeto utiliza o framework de testes do Angular. Para rodar os testes:

```shell
ng test
```

Isso executará os testes configurados no projeto.

## Licenciamento

Este projeto é licenciado sob a licença MIT. Para mais detalhes, consulte o arquivo [LICENSE](https://github.com/your/people-data/blob/master/LICENSE).
