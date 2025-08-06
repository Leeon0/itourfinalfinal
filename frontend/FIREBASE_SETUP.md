# Configuração do Firebase

## Passos para configurar o Firebase no projeto:

### 1. Instalar o Firebase
```bash
npm install firebase
```

### 2. Criar projeto no Firebase Console
1. Acesse https://console.firebase.google.com/
2. Clique em "Criar projeto"
3. Siga os passos para criar o projeto

### 3. Configurar Authentication
1. No painel do Firebase, vá para "Authentication"
2. Clique na aba "Sign-in method"
3. Ative o provedor "Email/Password"

### 4. Configurar Firestore Database
1. No painel do Firebase, vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Começar no modo de teste" (para desenvolvimento)
4. Escolha uma localização próxima (ex: europe-west1)

### 5. Configurar regras do Firestore
No Firestore, vá para "Regras" e substitua o conteúdo por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /routes/{routeId} {
      allow read: if request.auth != null && resource.data.isPublic == true;
      
      allow create: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'guia'
        && request.auth.uid == request.resource.data.createdBy;
      
      allow update, delete: if request.auth != null 
        && request.auth.uid == resource.data.createdBy;
    }
  }
}
```

### 6. Obter configuração do projeto
1. No painel do Firebase, vá para "Configurações do projeto" (ícone de engrenagem)
2. Na aba "Geral", role para baixo até "Seus apps"
3. Clique no ícone da web (</>) para adicionar um app web
4. Registre o app com um nome
5. Copie a configuração que aparece

### 7. Atualizar o arquivo de configuração
Substitua o conteúdo do arquivo `src/config/firebase.js` com suas credenciais:

```javascript
const firebaseConfig = {
  apiKey: "sua-api-key-aqui",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
};
```

### 8. Estrutura dos dados no Firestore

#### Coleção `users`:
```javascript
{
  uid: "user-id",
  email: "user@email.com",
  name: "Nome do Usuário",
  userType: "guia" | "turista",
  createdAt: "2025-01-01T00:00:00.000Z"
}
```

#### Coleção `routes`:
```javascript
{
  name: "Nome da Rota",
  description: "Descrição da rota",
  locations: [
    {
      id: 123456789,
      name: "Nome do Local",
      position: [32.6669, -16.9241]
    }
  ],
  color: "#ff0000",
  createdBy: "user-id",
  createdByName: "Nome do Guia",
  createdAt: "2025-01-01T00:00:00.000Z",
  isPublic: true
}
```

### 9. Testar a aplicação
Após configurar tudo, você pode:
1. Criar contas de guia e turista
2. Como guia: criar, editar e excluir rotas
3. Como turista: visualizar rotas criadas pelos guias
4. Ambos: selecionar rotas para visualizar no mapa

### 10. Tipos de utilizador:
- **Guia**: Pode criar, editar e excluir suas próprias rotas
- **Turista**: Pode apenas visualizar rotas públicas criadas pelos guias

### Segurança:
- Todas as operações requerem autenticação
- Guias só podem modificar suas próprias rotas
- Turistas têm acesso apenas de leitura
- As regras do Firestore garantem a segurança dos dados
