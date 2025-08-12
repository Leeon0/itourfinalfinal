# iTour

## Descrição
A nossa aplicação permite a turistas entrar em contacto com guias turísticas da Região Autónoma da Madeira, que dispõem de diversas tours pela ilha. Os guias turísticos podem criar as suas rotas e publicitá-las através da aplicação.

## Requirimentos
Para a aplicação funcionar na máquina local, e preciso seguir estes passos:
- fazer "npm install" na diretoria root e na diretoria frontend/
- fazer "npm start server.js" num terminal aberto na diretoria root
- fazer "npm run dev" num outro terminal aberto na diretoria frontend/

## Tecnologias Utilizadas
- Vite
- Leaflet
- Tailwind.css
- Node.js
- Express.js
- MySQL

## Grupo
- António Duarte
- Daniela Alves
- Fábio Gonçalves
- Leonardo Agrela
  
## Overview do Repositório

├── README.md

├── frontend

│   ├── FIREBASE_SETUP.md

│   ├── README.md
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── MarcadorRoute.png
│   │   ├── itour.png
│   │   ├── marcador.png
│   │   └── robots.txt
│   ├── services
│   │   └── api.js
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── App.test.js
│   │   ├── components
│   │   │   ├── AuthForm.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── GuideRequests.jsx
│   │   │   ├── GuideRoutes.jsx
│   │   │   ├── GuidesList.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── LocationSearch.jsx
│   │   │   ├── MainMenu.jsx
│   │   │   ├── MapComponent.jsx
│   │   │   ├── MyReservations.jsx
│   │   │   ├── MyRoutesList.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Reservation.jsx
│   │   │   ├── RouteForm.jsx
│   │   │   ├── RoutesList.jsx
│   │   │   ├── TourGuide.jsx
│   │   │   └── UserProfile.jsx
│   │   ├── config
│   │   │   └── firebase.js
│   │   ├── context
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ReservationsContext.jsx
│   │   │   └── RoutesContext.jsx
│   │   ├── index.css
│   │   ├── logo.svg
│   │   ├── main.jsx
│   │   ├── reportWebVitals.js
│   │   ├── services
│   │   │   └── api.js
│   │   ├── setupTests.js
│   │   ├── styles
│   │   │   └── StyledComponents.js
│   │   └── utils
│   │       ├── constants.js
│   │       ├── imageUtils.js
│   │       └── mapUtils.js
│   ├── vercel.json
│   └── vite.config.js
├── itourdb.sql
├── package-lock.json
├── package.json
├── server.js
└── uploads
    ├── 1754316707563-man.jpg
    ├── 1754555679381-lex.jpeg
    ├── 1754574841260-woman2.jpg
    ├── 1754574955595-woman.jpg
    ├── 1754649217784-vasco.jpg
    ├── 1754649510219-camoes.jpg
    ├── 1754866565228-travelman.jpg
    ├── 1754897027349-travelwoman.jpg
    ├── 1754986174626-madeira.jpg
    ├── 1754996796205-luigi.jpg
    ├── calheta.jpg
    ├── canical.jpg
    ├── funchal.jpg
    ├── garajau.jpg
    ├── gardens.jpg
    ├── mario.jpg
    ├── mountains.jpg
    ├── oeste.jpeg
    ├── paul_serra.jpg
    ├── ponta_delgada.jpg
    ├── porto_moniz.jpg
    ├── santana.jpg
    ├── sao_vicente.jpg
    └── woman.jpg
