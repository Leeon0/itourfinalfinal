import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Slide,
} from '@mui/material';
import {
  Close as CloseIcon,
  Group as GroupIcon,
  Route as RouteIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  MyLocation as MyRoutesIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const MainMenu = ({
  onClose,
  onShowRoutes,
  onShowGuides,
  onShowProfile,
  onShowMyRoutes,
  onShowReservation,
  onShowGuideRequests,
}) => {
  const { user, signOut, isGuide } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [visible, setVisible] = React.useState(true);

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  const handleCloseWithSlide = () => {
    setVisible(false);
    setTimeout(() => {
  onClose(); // notificar o pai após o slide terminar
  }, 300); // corresponde à duração da transição do Slide do MUI
  };

  const Logo = ({ size = 60 }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
      <img
        src="/itour.png"
        alt="iTour"
        style={{
          width: size,
          height: 'auto',
          maxWidth: '100%',
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 600,
          color: '#374151',
          display: 'none',
          ml: 1,
        }}
      >
        iTour
      </Typography>
    </Box>
  );

  const panelStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: isMobile ? '100vw' : '400px',
    height: '100vh',
    background: 'linear-gradient(to top, #F4E6B0, #EEEEEE)',
    boxShadow: isMobile ? 'none' : '-4px 0 20px rgba(0, 0, 0, 0.15)',
    zIndex: 2000,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1999,
    display: isMobile ? 'none' : 'block',
  };

  const getUserTypeLabel = () => {
    return isGuide() ? 'Guide' : 'Tourist';
  };

  return (
    <>
  {/* Sobreposição para desktop */}
      <Box sx={overlayStyle} onClick={handleCloseWithSlide} />
      
  {/* Painel do menu */}
      <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
        <Box sx={panelStyle}>
          {/* Cabeçalho com logotipo centralizado e botão fechar à direita */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 3,
              backgroundColor: 'transparent',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '5%',
                width: '90%',
                height: '1px',
                backgroundColor: '#FFC107',
              },
            }}
          >
            <Box sx={{ width: 48 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Logo size={120} />
            </Box>
            <IconButton
              onClick={handleCloseWithSlide}
              color="inherit"
              sx={{
                color: '#666',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Informações do utilizador */}
          <Box sx={{ p: 2, borderBottom: '1px solid #FFC107', width: '80%', alignSelf: 'center' }}>
            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
              {user?.profile_image ? (
                <Avatar 
                  src= {`http://localhost:8000/${user.profile_image}`}  
                  sx= {{ width: 60, height: 60, mr: 2 }} />
              ) : (
                <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'grey.400' }}>
                  <PersonIcon sx={{ fontSize: 30 }} />
                </Avatar>
              )}
              <Box flex={1}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {user?.name || user?.displayName || 'Utilizador'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {user?.email}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , gap:2}}>
                  <Chip
                    label={getUserTypeLabel()}
                    size="small"
                    sx={{
                      backgroundColor: '#FFC107',
                      color: '#000',
                      fontWeight: 'medium',
                      '& .MuiChip-label': {
                        color: '#000',
                      },
                    }}
                  />
                  <IconButton
                    onClick={onShowProfile}
                    sx={{
                      backgroundColor: '#FFC107',
                      color: '#000',
                      width: 32,
                      height: 32,
                      '&:hover': {
                        backgroundColor: '#F5C842',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                    size="small"
                  >
                    <EditIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Lista de opções do menu */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <List sx={{ pt: 2 }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={onShowGuides}
                  sx={{
                    py: 2,
                    '&:hover': {
                      backgroundColor: '#FFC107',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      '& .MuiListItemText-primary': { color: 'white' },
                    },
                  }}
                >
                  <ListItemIcon>
                    <GroupIcon color="#FFC107" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Tour Guides"
                    secondary="Discover all the local guides"
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={onShowRoutes}
                  sx={{
                    py: 2,
                    '&:hover': {
                      backgroundColor: '#FFC107',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      '& .MuiListItemText-primary': { color: 'white' },
                    },
                  }}
                >
                  <ListItemIcon>
                    <RouteIcon color="#FFC107" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Routes"
                    secondary="Explore the routes that our guides have created especially for you"
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItemButton>
              </ListItem>

              {isGuide() && (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={onShowMyRoutes}
                    sx={{
                      py: 2,
                      '&:hover': {
                        backgroundColor: '#FFC107',
                        '& .MuiListItemIcon-root': { color: 'white' },
                        '& .MuiListItemText-primary': { color: 'white' },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <MyRoutesIcon color="#FFC107" />
                    </ListItemIcon>
                    <ListItemText
                      primary="My Routes"
                      secondary="Manage your created routes"
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                </ListItem>
              )}

              {!isGuide() && (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={onShowReservation}
                    sx={{
                      py: 2,
                      '&:hover': {
                        backgroundColor: '#FFC107',
                        '& .MuiListItemIcon-root': { color: 'white' },
                        '& .MuiListItemText-primary': { color: 'white' },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <MyRoutesIcon color="#FFC107" />
                    </ListItemIcon>
                    <ListItemText
                      primary="My Reservations"
                      secondary="View your booked routes"
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                </ListItem>
              )}

              {isGuide() && (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      onShowGuideRequests();
                      onClose();
                    }}
                    sx={{
                      py: 2,
                      '&:hover': {
                        backgroundColor: '#FFC107',
                        '& .MuiListItemIcon-root': { color: 'white' },
                        '& .MuiListItemIcon-root svg': { color: 'white !important' },
                        '& .MuiListItemText-primary': { color: 'white' },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <EditIcon sx={{ color: '#666' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Guide Requests"
                      secondary="Manage your requests"
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>

          {/* Rodapé com logout */}
          <Box sx={{ borderTop: '1px solid #FFC107', mt: 2 }}>
            <List sx={{ padding: 0 }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    py: 2,
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#f44336',
                      '& .MuiListItemIcon-root': { color: 'white' },
                      '& .MuiListItemIcon-root svg': { color: 'white !important' },
                      '& .MuiListItemText-primary': { color: 'white' },
                    },
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: '#f44336' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      fontWeight: 'medium',
                      color: '#f44336',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Slide>
    </>
  );
};

export default MainMenu;
