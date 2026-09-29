# Recipe Finder Frontend

A responsive recipe discovery interface built with React and TypeScript.

The application allows users to search for recipes by name or ingredient, explore recipe results and view detailed information about each recipe.

This repository contains the frontend of the Recipe Finder project. The application communicates with a separate FastAPI backend responsible for consuming and normalizing data from TheMealDB API.

## Features

- Search recipes by name
- Search recipes by ingredient
- Toggle between search modes
- Display recipe results in reusable cards
- View detailed recipe information
- Display ingredients and measurements
- Display cooking instructions
- Display recipe tags when available
- Link to recipe videos on YouTube when available
- Random recipe suggestion
- Loading and error states
- Empty search result handling
- Responsive layout for desktop and mobile
- Custom visual identity inspired by food editorial interfaces

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- Fetch API
- Vitest
- React Testing Library

## Backend

The frontend depends on the Recipe Finder backend built with FastAPI.

The backend is responsible for communicating with TheMealDB and exposing normalized endpoints to the frontend.

Main endpoints currently used:

```text
GET /recipes/random
GET /recipes/search?name={name}
GET /recipes/by-ingredient?ingredient={ingredient}
GET /recipes/{id}
```

By default, the frontend expects the backend to be running at:

```text
http://localhost:8000
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Recipe Finder backend running locally

### Installation

Clone the repository:

```bash
git clone https://github.com/TheoIshibashi/recipe-finder-frontend.git
```

Enter the project directory:

```bash
cd recipe-finder-frontend
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will start the application locally, usually at:

```text
http://localhost:5173
```

The FastAPI backend must also be running for recipe searches and recipe details to work.

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
```

You can use `.env.example` as a reference.

The `VITE_API_URL` variable defines the base URL used by the frontend to communicate with the FastAPI backend.

## Tests

The frontend uses Vitest and React Testing Library for component and integration tests.

Run tests in watch mode:

```bash
npm test
```

Run all tests once: 

```bash
npm run test:run
```

Current tests cover:

- Recipe card rendering
- Recipe selection interaction
- Random recipe loading
- Recipe search by name
- Recipe search by ingredient
- Recipe detail selection
- No-result search state
- Empty search validation

## Project Structure

```text
src/
├── assets/
│   └── images/
├── components/
│   ├── RecipeCard.tsx
│   └── RecipeCard.test.tsx
├── types/
│   └── recipe.ts
├── App.tsx
├── App.test.tsx
├── App.css
├── index.css
├── setupTests.ts
└── main.tsx
```

### Main responsibilities

- `App.tsx`: application state, API requests and page composition
- `RecipeCard.tsx`: reusable recipe preview card
- `recipe.ts`: TypeScript types used by recipe data
- `App.css`: page layout and application-specific styles
- `index.css`: global styles, colors and typography
- `App.test.tsx`: tests the main application flows
- `RecipeCard.test.tsx`: tests recipe card rendering and interaction
- `setupTests.ts`: configures the frontend test environment

## Design

The interface uses a warm food-oriented visual identity with:

- Fraunces for display typography
- Outfit for interface and body typography
- Terracotta as the primary color
- Warm neutral backgrounds
- Responsive recipe cards
- Hero section with integrated search

The interface is still being refined as the project evolves.

## Current Status

The main frontend workflow is functional:

```text
Search
  ↓
Recipe results
  ↓
Select recipe
  ↓
Recipe details
```

The project is currently focused on UI refinement, responsiveness and improving the overall user experience.

## Planned Improvements

- Improve the hero image and final visual polish
- Refine the header and results layout
- Improve accessibility and keyboard navigation
- Improve loading states
- Prepare the application for deployment
- Expand frontend test coverage

## Related Repository

The FastAPI backend is maintained in a separate repository.

Backend repository:

[Recipe Finder Backend](https://github.com/TheoIshibashi/recipe-finder-backend)


## Author

Developed as a study and portfolio project focused on React, TypeScript, API integration and frontend architecture.

---

# Recipe Finder Frontend — Português

Uma interface responsiva para descoberta de receitas desenvolvida com React e TypeScript.

A aplicação permite buscar receitas por nome ou ingrediente, visualizar os resultados da busca e acessar informações detalhadas de cada receita.

Este repositório contém o frontend do projeto Recipe Finder. A aplicação se comunica com um backend separado desenvolvido em FastAPI, responsável por consumir e normalizar os dados da API TheMealDB.

## Funcionalidades

- Busca de receitas por nome
- Busca de receitas por ingrediente
- Alternância entre modos de busca
- Exibição dos resultados em cards reutilizáveis
- Visualização dos detalhes da receita
- Exibição de ingredientes e medidas
- Exibição do modo de preparo
- Exibição de tags quando disponíveis
- Link para vídeo da receita no YouTube quando disponível
- Sugestão de receita aleatória
- Estados de carregamento e erro
- Tratamento de buscas sem resultado
- Layout responsivo para desktop e mobile
- Identidade visual customizada inspirada em interfaces editoriais de culinária

## Tecnologias

- React
- TypeScript
- Vite
- CSS
- Fetch API
- Vitest
- React Testing Library

## Backend

O frontend depende do backend do Recipe Finder desenvolvido com FastAPI.

O backend é responsável por se comunicar com a TheMealDB e disponibilizar endpoints normalizados para o frontend.

Principais endpoints utilizados:

```text
GET /recipes/random
GET /recipes/search?name={name}
GET /recipes/by-ingredient?ingredient={ingredient}
GET /recipes/{id}
```

Por padrão, o frontend espera que o backend esteja rodando em:

```text
http://localhost:8000
```

## Como executar o projeto

### Pré-requisitos

Certifique-se de ter instalado:

- Node.js
- npm
- Backend do Recipe Finder rodando localmente

### Instalação

Clone o repositório:

```bash
git clone https://github.com/TheoIshibashi/recipe-finder-frontend.git
```

Entre na pasta do projeto:

```bash
cd recipe-finder-frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite iniciará a aplicação localmente, normalmente em:

```text
http://localhost:5173
```

O backend FastAPI também precisa estar em execução para que as buscas e os detalhes das receitas funcionem.

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000
```

Você pode usar o arquivo `.env.example` como referência.

A variável `VITE_API_URL` define a URL base utilizada pelo frontend para se comunicar com o backend FastAPI.

## Testes

O frontend utiliza Vitest e React Testing Library para testes de componentes e integração.

Execute os testes em modo watch:

```bash
npm test
```

Execute todos os testes uma vez:

```bash
npm run test:run
```
Os testes atuais cobrem:

- Renderização do card de receita
- Interação de seleção da receita
- Carregamento da receita aleatória
- Busca de receitas por nome
- Busca de receitas por ingrediente
- Seleção e exibição dos detalhes da receita
- Estado de busca sem resultados
- Validação de busca vazia

## Estrutura do projeto

```text
src/
├── assets/
│   └── images/
├── components/
│   ├── RecipeCard.tsx
│   └── RecipeCard.test.tsx
├── types/
│   └── recipe.ts
├── App.tsx
├── App.test.tsx
├── App.css
├── index.css
├── setupTests.ts
└── main.tsx
```

### Responsabilidade dos principais arquivos

- `App.tsx`: estado da aplicação, requisições para a API e composição da página
- `RecipeCard.tsx`: card reutilizável de pré-visualização das receitas
- `recipe.ts`: tipos TypeScript utilizados pelos dados das receitas
- `App.css`: layout da página e estilos específicos da aplicação
- `index.css`: estilos globais, cores e tipografia
- `App.test.tsx`: testa os principais fluxos da aplicação
- `RecipeCard.test.tsx`: testa a renderização e interação do card de receita
- `setupTests.ts`: configura o ambiente de testes do frontend

## Design

A interface utiliza uma identidade visual com foco em culinária, incluindo:

- Fraunces para títulos e destaques
- Outfit para interface e textos
- Terracota como cor principal
- Fundos neutros e quentes
- Cards de receita responsivos
- Hero section com a busca integrada

A interface ainda está sendo refinada conforme o projeto evolui.

## Status atual

O principal fluxo do frontend está funcional:

```text
Busca
  ↓
Resultados
  ↓
Seleção da receita
  ↓
Detalhes da receita
```

No momento, o projeto está focado no refinamento da interface, responsividade e melhoria da experiência do usuário.

## Melhorias planejadas

- Melhorar a imagem do hero e o acabamento visual final
- Refinar o header e o layout dos resultados
- Melhorar acessibilidade e navegação por teclado
- Melhorar os estados de carregamento
- Preparar a aplicação para deploy
- Expandir a cobertura de testes do frontend

## Repositório relacionado

O backend em FastAPI é mantido em um repositório separado.

Repositório do backend:

[Recipe Finder Backend](https://github.com/TheoIshibashi/recipe-finder-backend)

## Autor

Desenvolvido como projeto de estudo e portfólio com foco em React, TypeScript, integração com APIs e arquitetura frontend.
