# Receitinhas da Vovó 👵🍰

Este é um site de receitas desenvolvido com Next.js que oferece visualização pública de receitas e gerenciamento protegido por autenticação. Um local para armazenar e compartilhar receitas tradicionais, transmitidas de geração em geração.

## Estrutura do Projeto

O projeto segue uma estrutura onde:
- **Rotas públicas**: Visualização de receitas (GET)
- **Rotas protegidas**: Operações de criação, edição e exclusão de receitas (POST, PUT, DELETE)

### Principais Funcionalidades

- **Página Inicial (`/`)**: Exibe todas as receitas disponíveis para visualização pública
- **Página de Detalhes (`/recipes/[id]`)**: Exibe detalhes de uma receita específica
- **Dashboard (`/dashboard`)**: Área administrativa protegida por autenticação
- **CRUD de Receitas**: Interface para criar, visualizar, editar e excluir receitas (requer autenticação)

## Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19
- **Estilização**: CSS Modules
- **Autenticação**: JWT (armazenado em cookies)
- **API**: Conexão com backend em http://localhost:4000

## Instalação e Configuração

### Requisitos
- Node.js 18.0 ou superior
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Vinirocha388/RdV-Front-End.git
cd RdV-Front-End
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env.local` na raiz do projeto com:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_USE_MOCK_DATA=true
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

> **Nota**: O modo `NEXT_PUBLIC_USE_MOCK_DATA=true` permite usar o aplicativo mesmo sem o backend funcionando, utilizando dados mockados.

## Estrutura de Arquivos

```
src/
  ├── app/
  │   ├── dashboard/         # Área protegida para gerenciamento de receitas
  │   │   └── recipes/       # CRUD de receitas (protegido)
  │   ├── recipes/           # Visualização pública de receitas
  │   │   └── [id]/          # Detalhes da receita (público)
  │   ├── services/
  │   │   ├── authService.js # Serviços de autenticação
  │   │   └── recipeService.js # Serviços para operações com receitas
  │   └── context/
  │       └── AuthContext.jsx # Contexto de autenticação
  ├── components/            # Componentes reutilizáveis
  └── middleware.js          # Middleware para controle de rotas protegidas
```

# Guia Passo a Passo: Receitinhas da Vovó 🍲

Este guia vai ajudar você a navegar e utilizar todas as funcionalidades do site Receitinhas da Vovó.

## 📱 Navegação pelo Site (Para Visitantes)

### Página Inicial
1. Ao entrar no site, você verá a página inicial com as receitas mais recentes
2. Use a barra de navegação superior para acessar diferentes seções
3. Role para baixo para ver todas as receitas disponíveis
4. Clique em qualquer receita para ver seus detalhes completos

### Busca de Receitas
1. Localize a barra de busca no cabeçalho do site
2. Digite o nome da receita ou ingrediente desejado
3. Pressione Enter ou clique na lupa para buscar
4. Os resultados aparecerão ordenados por relevância

### Visualização de Receitas
1. Ao clicar em uma receita, você verá:
   - Imagem da receita
   - Lista de ingredientes
   - Modo de preparo passo a passo
   - Tempo de preparo e dificuldade
   - Categoria da receita
2. Use os botões de compartilhamento para enviar a receita para amigos

### Criação de Conta
1. Clique em "Login" no canto superior direito
2. Na tela de login, selecione a aba "Registrar"
3. Preencha todos os campos obrigatórios:
   - Nome completo
   - Email
   - Senha (mínimo 6 caracteres)
4. Clique em "Criar Conta"
5. Verifique seu email para confirmar o cadastro (quando aplicável)

## 👩‍🍳 Área do Usuário (Após Login)

### Login no Sistema
1. Clique em "Login" no canto superior direito
2. Digite seu email e senha
3. Clique em "Entrar"
4. Se esquecer sua senha, clique em "Esqueceu a senha?" e siga as instruções

### Dashboard do Usuário
1. Após fazer login, você será redirecionado para o Dashboard
2. No Dashboard você encontrará:
   - Suas receitas salvas
   - Opção para criar novas receitas
   - Gerenciamento do seu perfil

### Criação de Receitas
1. No Dashboard, clique em "Criar Nova Receita"
2. Preencha todos os campos do formulário:
   - Título da receita
   - Descrição
   - Categoria
   - Tempo de preparo
   - Nível de dificuldade
   - Lista de ingredientes (clique em + para adicionar mais)
   - Modo de preparo (clique em + para adicionar mais passos)
   - Imagem da receita (opcional)
3. Clique em "Salvar Receita"

### Edição de Receitas
1. No Dashboard, localize a receita que deseja editar
2. Clique no ícone de lápis (editar)
3. Faça as alterações necessárias no formulário
4. Clique em "Atualizar Receita"

### Exclusão de Receitas
1. No Dashboard, localize a receita que deseja excluir
2. Clique no ícone de lixeira (excluir)
3. Confirme a exclusão na janela de confirmação

### Perfil do Usuário
1. Clique no seu nome/foto no canto superior direito
2. Selecione "Meu Perfil"
3. Aqui você pode:
   - Atualizar seus dados pessoais
   - Alterar sua senha
   - Gerenciar preferências

## 🛠️ Solução de Problemas

### Erro ao fazer Login
1. Verifique se o email e senha estão corretos
2. Tente redefinir sua senha clicando em "Esqueceu a senha?"
3. Verifique se seu email foi confirmado

### Problemas ao Criar/Editar Receitas
1. Certifique-se de preencher todos os campos obrigatórios
2. Se houver erro ao enviar a imagem, verifique se está no formato correto (JPG, PNG)
3. O tamanho máximo para imagens é de 5MB

### Recuperação de Senha
1. Na tela de login, clique em "Esqueceu a senha?"
2. Digite seu email de cadastro
3. Siga as instruções enviadas ao seu email

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
