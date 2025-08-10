import React, { useState } from 'react';
import {
  Box,
  Chip,
  IconButton,
  Fab
} from '@mui/material';
import { 
  Add as AddIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import MainMenu from './MainMenu';

const Navbar = ({ onCreateRoute, onShowRoutes, onShowGuides,onShowMyRoutes, onShowProfile , onShowReservation , onShowGuideRequests }) => {
  const { isGuide } = useAuth();
  const [showMainMenu, setShowMainMenu] = useState(false);

  const getUserTypeColor = () => {
    return isGuide() ? 'primary' : 'secondary';
  };

  const getUserTypeLabel = () => {
    return isGuide() ? 'Guide' : 'Tourist';
  };

  const handleMenuToggle = () => {
    setShowMainMenu(!showMainMenu);
  };

  const handleMenuClose = () => {
    setShowMainMenu(false);
  };

  return (
    <>
      {/* Chip do tipo de utilizador - Maior */}
      <Box
  sx={{
    position: 'absolute',
    top: { xs: '4rem', md: '1rem' },
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000
  }}
>
  <Chip
    label={getUserTypeLabel()}
    color={getUserTypeColor()}
    size="medium" 
    sx={{
      backgroundColor: '#FFC107',
      color: getUserTypeColor() === 'primary' ? 'black' : 'black',
      fontWeight: 'bold',
      fontSize: '0.85rem', 
      padding: '0.5rem 0.75rem', 
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)'
    }}
  />
</Box>

      {/* Botão de menu hambúrguer */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '5rem', md: '2rem' },
          right: '2rem',
          zIndex: 1000
          
        }}
      >
        <IconButton
          onClick={handleMenuToggle}
          sx={{
            backgroundColor: '#FFC107',
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
            height: 60,
            width: 60,
            color: 'black',
            '&:hover': {
              backgroundColor: '#FFB300',
              transform: 'scale(1.1)',
            },
            '&:active': {
              transform: 'scale(0.95)'
            },
            transition: 'all 0.2s ease-in-out'
          }
          }
        >
          <MenuIcon sx={{ fontSize: 40, fontWeight: 'bold' }}/>
        </IconButton>
      </Box>
        

      {/* Botão FAB para criar rota (apenas para guias) - No canto inferior direito */}
      {isGuide() && (
        <Fab
          onClick={onCreateRoute}
          sx={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            backgroundColor: '#FFC107',
            color: '#000',
            width: 64,
            height: 64,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            '&:hover': {
              backgroundColor: '#FFB300',
              transform: 'scale(1.1)',
              boxShadow: '0 6px 25px rgba(0, 0, 0, 0.4)'
            },
            '&:active': {
              transform: 'scale(0.95)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
          title="Criar Nova Rota"
        >
          <AddIcon sx={{ fontSize: 35, fontWeight: 'bold'}} />
        </Fab>
      )}

      {/* Menu principal */}
      {showMainMenu && (
        <MainMenu
          onClose={handleMenuClose}
          onShowRoutes={() => {
            handleMenuClose();
            onShowRoutes();
          }}
          onShowGuides={() => {
            handleMenuClose();
            onShowGuides();
          }}
          onShowProfile={() => {
            handleMenuClose();
            onShowProfile();
          }}
          onShowMyRoutes={() => {
            handleMenuClose();
            onShowMyRoutes();
          }}
          onShowReservation={() => {
            handleMenuClose();
            onShowReservation();
          }}
          onShowGuideRequests={() => {
            handleMenuClose();
            onShowGuideRequests();
          }}
        />
      )}
    </>
  );
};

export default Navbar;
