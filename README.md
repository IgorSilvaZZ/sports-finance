# ⚽ Sports Finances - Projeto Aplicado ⚽

Sports Finances é uma plataforma para organização financeira de eventos esportivos privados. A plataforma permite que um responsável cadastre eventos, gerencie transações financeiras, controle status de pagamentos e gerencie participantes, tudo de forma intuitiva e eficiente.

> **Projeto Aplicado!** Este projeto foi desenvolvido como parte do Trabalho de Conclusão do MBA em Desenvolvimento FullStack na **XP Educação**..

## 🎯 Funcionalidades

- **Listagem e pesquisa de transações com filtros** 🔍
- **Visualização de informações importantes do evento (Data de pagamento, Valor da Mensalidade, Saldo e etc..)** 💹
- **Adicionar novas transações** ➕
- **Gerenciar status de pagamentos de transações** 💸
- **Realizar ou defazer pagamentos** 🏷️
- **Visualizar pagamentos realizados** 💵
- **Visualizar, criar e editar participantes** ⛹️‍♀️

## 🧑‍💻 Tecnlogias Utilizadas

- **[TypeScript](https://www.typescriptlang.org/)**
- **[NestJS](https://nestjs.com/)**
- **[React 18](https://react.dev/)**
- **[React Query](https://tanstack.com/query/latest)**
- **[Redux Toolkit](https://redux-toolkit.js.org/)**
- **[Zod](https://zod.dev/)**
- **[Prisma](https://www.prisma.io/)**
- **[Jest](https://jestjs.io/)**

## 📃 Pré Requisitos

- Ter o **NodeJS** instalado na máquina (versão 20 ou superior).
- Instalar as dependências para os dois projetos (**web** e **server**).

## 🛠️ Instalação e Configuração

O primeiro passo é clonar o repositorio e instalar as dependencias de cada projeto.

### Passo 1: Clonar o repositório e instalar dependências

```bash
git clone https://github.com/IgorSilvaZZ/sports-finance.git
cd sports-finance

cd server
npm install

cd..

cd web
npm install
```

### ⚙️ Step 2: Configurar Variaveis de ambiente

O proximo passo é configurar as variaveis de ambiente do projeto. Atualmente existe apenas um arquivo que precisa ser criado que é .env, dentro da pasta server.

```bash
cd server
touch .env.production
```

**Exemplo de configuração**

DATABASE_URL="file:./sport-finances.db"

### 🪂 Step 3: Rodar projetos

O ultimo passo, logo após tudo configurado é rodar o projeto.

```bash
cd server
npm start

cd..

cd web
npm run start:dev
```

Acesse o projeto em http://localhost:5173.

## 🔗 Links

- **XP Educação**: [XP Educação](https://www.xpeducacao.com.br/)
- **Documentação Oficial NestJS**: [NestJS](https://nestjs.com/)
- **Documentação Ofical ReactJS**: [ReactJS](https://react.dev/)
- **Documentação Ofical Vite**: [Vite](https://vite.dev/)

## 🏞️ Imagens

Para ver algumas imagens do projeto, vá até a pasta **images**, que algumas images do projeto estarão disponiveis.

## 🧪 Testes

O projeto inclui testes automatizados para validar as funcionalidades implementadas até o momento.

Para rodar os testes, utilize o comando:

```bash
cd server
npm run test
```

## 🙏 Agradecimentos

Gostaria de expressar minha gratidão à minha família e amigos, que sempre me apoiaram nesta jornada. Um agradecimento especial à instituição **XP Educação**, que me proporcionou todo o suporte, aprendizado e liberdade necessários para o desenvolvimento deste projeto.

Gostaria também de reconhecer a contribuição da orientadora [**Fernanda Fleck**](https://www.linkedin.com/in/fernanda-fleck-487852212), que esteve presente em todas as etapas do desenvolvimento, oferecendo suporte técnico e motivação.

Muito obrigado a todos que contribuíram direta ou indiretamente para este projeto!

Fica aqui meu agradecimentos a todos que me ajudaram a desenvolver esse projeto. Muito Obrigado!
