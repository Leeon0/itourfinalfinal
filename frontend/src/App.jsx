import React, { useState } from "react";
import 'leaflet/dist/leaflet.css';
import { CircularProgress, Box } from '@mui/material';

import { AuthProvider, useAuth } from './context/AuthContext';
import { RoutesProvider } from './context/RoutesContext';
import { ReservationsProvider } from './context/ReservationsContext';
import MapComponent from './components/MapComponent';
import RouteForm from './components/RouteForm';
import RoutesList from './components/RoutesList';
import MyRoutesList from './components/MyRoutesList'; 
import GuidesList from './components/GuidesList';
import UserProfile from './components/UserProfile';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import { AppContainer, MapWrapper } from './styles/StyledComponents';
import Reservation from './components/Reservation';
import MyReservations from './components/MyReservations';
import GuideRequests from './components/GuideRequests';

const MainApp = () => {
  const { user, loading } = useAuth();
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [showRoutesList, setShowRoutesList] = useState(false);
  const [showMyRoutes, setShowMyRoutes] = useState(false); 
  const [showGuidesList, setShowGuidesList] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [showMyReservations, setShowMyReservations] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showGuideRequests, setShowGuideRequests] = useState(false);

  const handleCreateRoute = () => {
    closeAllPanels();
    setShowRouteForm(true);
  };

  const closeAllPanels = () => {
    setShowRouteForm(false);
    setShowRoutesList(false);
    setShowMyRoutes(false); 
    setShowGuidesList(false);
    setShowUserProfile(false);
    setShowReservation(false);
    setShowMyReservations(false);
    setShowGuideRequests(false);
  };

  const handleShowRoutes = () => {
    closeAllPanels();
    setShowRoutesList(true);
  };

  const handleShowMyRoutes = () => { 
    closeAllPanels();
    setShowMyRoutes(true);
  };

  const handleShowGuides = () => {
    closeAllPanels();
    setShowGuidesList(true);
  };

  const handleShowProfile = () => {
    closeAllPanels();
    setShowUserProfile(true);
  };

  const handleShowReservation = () => {
    closeAllPanels();
    setShowReservation(true);
  };

  const handleShowMyReservations = () => {
    closeAllPanels();
    setShowMyReservations(true);
  };

  const handleShowGuideRequests = () => {
    closeAllPanels();
    setShowGuideRequests(true);
  };

  // ✅ ADICIONAR ESTA FUNÇÃO QUE ESTAVA FALTANDO
  const handleReservation = (route) => {
    setSelectedRoute(route);
    closeAllPanels();
    setShowReservation(true);
  };

  // ✅ NOVA FUNÇÃO para abrir lista de rotas a partir do mapa
  const handleOpenRoutesListFromMap = () => {
    closeAllPanels();
    setShowRoutesList(true);
  };

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="background.default"
      >
        <CircularProgress 
          size={60} 
          sx={{ color: '#FFC107' }}
        />
      </Box>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <RoutesProvider>
      <ReservationsProvider>
        <AppContainer>
          <MapWrapper>
            <MapComponent 
              onOpenRoutesList={handleOpenRoutesListFromMap} // ✅ Passar função para o mapa
            />
          </MapWrapper>
          
          {/* Navbar com controlos baseados no tipo de utilizador */}
          <Navbar 
            onCreateRoute={handleCreateRoute}
            onShowRoutes={handleShowRoutes}
            onShowMyRoutes={handleShowMyRoutes} 
            onShowGuides={handleShowGuides}
            onShowProfile={handleShowProfile}
            onShowReservation={handleShowMyReservations}
            onShowGuideRequests={handleShowGuideRequests}
          />

          {/* Formulário de criação de rota (apenas para guias) */}
          {showRouteForm && (
            <RouteForm onClose={closeAllPanels} />
          )}

          {/* Lista de rotas */}
          {showRoutesList && (
            <RoutesList 
              onClose={closeAllPanels} 
              onCreateRoute={handleCreateRoute}
              onReserve={handleReservation} // ✅ Usar a função correta
            />
          )}

          {/* Lista das minhas rotas (apenas para guias) */}
          {showMyRoutes && (
            <MyRoutesList 
              onClose={closeAllPanels} 
              onCreateRoute={handleCreateRoute}
            />
          )}

          {/* Lista de guias */}
          {showGuidesList && (
            <GuidesList 
              onClose={closeAllPanels}
              onReserve={handleReservation} // ✅ Usar a função correta
            />
          )}

          {/* Perfil do utilizador */}
          {showUserProfile && (
            <UserProfile onClose={closeAllPanels} />
          )}

          {/* Componente de reserva */}
          {showReservation && selectedRoute && (
            <Reservation 
              route={selectedRoute} 
              onClose={closeAllPanels} 
              onReservationComplete={() => {
                closeAllPanels();
                // Opcional: mostrar mensagem de sucesso
              }}
            />
          )}

          {/* My Reservations (apenas para turistas) */}
          {showMyReservations && (
            <MyReservations onClose={closeAllPanels} />
          )}

          {showGuideRequests && (
            <GuideRequests onClose={closeAllPanels} />
          )}
        </AppContainer>
      </ReservationsProvider>
    </RoutesProvider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ReservationsProvider>
        <MainApp />
      </ReservationsProvider>
    </AuthProvider>
  );
}
