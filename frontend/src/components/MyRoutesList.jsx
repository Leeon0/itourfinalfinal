import React , {useState} from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton,
  Chip,
  Stack,
  CircularProgress,
  Avatar,
  Card,
  CardContent,
  Grid,
  Divider,
  Slide
} from '@mui/material';
import {  
  Delete as DeleteIcon,
  Route as RouteIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import { SidePanel } from '../styles/StyledComponents';
import { useRoutes } from '../context/RoutesContext';
import { useAuth } from '../context/AuthContext';

const MyRoutesList = ({ onClose, onCreateRoute }) => {
  const { routes, activeRoute, selectRoute, deleteRoute, clearActiveRoute, loading, fetchRoutes } = useRoutes();
  const { user } = useAuth();
  const [showPanel, setShowPanel] = useState(true);

  // Mostrar apenas rotas criadas pelo guia autenticado e cujo id > 12
  const myRoutes = routes.filter(route => route.id > 12 && route.created_by === user?.id);

  const handleRouteClick = (route) => {
    if (activeRoute?.id === route.id) {
      clearActiveRoute();
    } else {
      selectRoute(route);
    }
  };

  const handleCancel = () => {
  setShowPanel(false); // dispara saída do Slide
  };

  const handleDeleteRoute = async (e, routeId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        await deleteRoute(routeId);
      } catch (error) {
        alert('Error deleting route: ' + error.message);
      }
    }
  };

  return (
    <Slide in={showPanel} direction="down" timeout={700} mountOnEnter unmountOnExit onExited={onClose}>
    <SidePanel 
      elevation={2}
      sx={{
        height: '90vh',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4
      }}
    >
  {/* Conteúdo com scroll */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        paddingBottom: '60px',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
  {/* Cabeçalho */}
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5">
            My Routes
          </Typography>
        </Box>

  {/* Botão Criar Rota */}
        <Box sx={{ px: 2, mb: 3 }}>
          <Button
            onClick={onCreateRoute}
            variant="contained"
            fullWidth
            startIcon={<RouteIcon />}
            sx={{
              backgroundColor: '#FFC107',
              color: '#000',
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#F5C842'
              }
            }}
          >
            Add New Route
          </Button>
        </Box>

  {/* Lista de rotas */}
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress sx={{ color: '#FFC107' }}/>
          </Box>
        ) : myRoutes.length === 0 ? (
          <Box textAlign="center" py={4}>
            <RouteIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary" fontWeight="medium">
              No routes created yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click "Add New Route" to create your first route.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ px: 2 }}>
            <Typography variant="body1" fontWeight="medium" sx={{ mb: 1, borderBottom:'1px solid #FFC107', pb: 1 }}>
              {myRoutes.length} route{myRoutes.length !== 1 ? 's' : ''} created:
            </Typography>
            
            <Grid container direction="column" alignItems="center">
              {myRoutes.map((route) => (
                <Grid item key={route.id}>
                  <Card
  elevation={0}
  sx={{
    width: '350px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    borderRadius: 3,
    backgroundColor: activeRoute?.id === route.id ? '#FFC107' : 'transparent',
    border: activeRoute?.id === route.id ? '2px solid #FFC107' : 'none',
    boxShadow: activeRoute?.id === route.id ? '0 8px 25px rgba(250, 213, 64, 0.3)' : 'none',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      opacity: 0.9,
    }
  }}
  onClick={() => handleRouteClick(route)}
>
  <CardContent sx={{ flexGrow: 1 }}>
    <Stack direction="column" spacing={1}>
  {/* Título da Rota */}
      <Typography
        variant="h6"
        sx={{
          mb: 0.5,
          fontSize: '1.1rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {route.name}
      </Typography>

  {/* Imagem */}
      <Box sx={{ mb: 1 }}>
        {route.routeImageBase64 ? (
          <Avatar
            src={route.routeImageBase64}
            sx={{ width: 300, height: 150, borderRadius: 2, boxShadow: 1 }}
            variant="rounded"
          />
        ) : (
          <Avatar
            sx={{ width: 300, height: 150, borderRadius: 2, bgcolor: 'grey.200', boxShadow: 1 }}
            variant="rounded"
          >
            <ImageIcon color="disabled" />
          </Avatar>
        )}
      </Box>

  {/* Descrição */}
      {route.description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            fontSize: '0.85rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {route.description}
        </Typography>
      )}

  {/* Chips */}
      <Stack direction="row" gap={1} flexWrap="wrap">
        <Chip
          label={`${(activeRoute?.id === route.id ? activeRoute.locations?.length : route.locations?.length) || 0} locations`}
          size="small"
          sx={{
            backgroundColor: activeRoute?.id === route.id ? '#333' : '#FFC107',
            color: activeRoute?.id === route.id ? 'white' : '#333',
          }}
        />
        {route.duration && (
          <Chip
            label={route.duration}
            size="small"
            variant="outlined"
          />
        )}
        <Chip
          label={activeRoute?.id === route.id ? "On map" : "View on map"}
          size="small"
          color={activeRoute?.id === route.id ? "success" : "default"}
          variant={activeRoute?.id === route.id ? "filled" : "outlined"}
        />
      </Stack>

  {/* Pré-visualização dos locais */}
      {(activeRoute?.id === route.id ? activeRoute.locations?.length : route.locations?.length) > 0 && (
        <Box sx={{ maxHeight: '120px', overflow: 'auto', mt: 1 }}>
          {(activeRoute?.id === route.id ? activeRoute.locations : route.locations).map((location, index) => (
            <Box key={index} display="flex" alignItems="center">
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: activeRoute?.id === route.id ? '#333' : '#FFC107',
                  mr: 0.8,
                  flexShrink: 0
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {location.name || `Location ${index + 1}`}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

  {/* Data de criação + Eliminar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.80rem' }}>
          Created on {route.created_at_formatted ? route.created_at_formatted : (route.createdAt ? new Date(route.createdAt).toLocaleDateString('en-GB') : 'Date not available')}
        </Typography>
        <IconButton
          onClick={(e) => handleDeleteRoute(e, route.id)}
          size="small"
          sx={{
            color: '#f44336',
            '&:hover': {
              backgroundColor: 'rgba(244, 67, 54, 0.1)'
            }
          }}
        >
          <DeleteIcon sx={{fontSize:'2rem'}}/>
        </IconButton>
      </Box>
    </Stack>
  </CardContent>
</Card>

                  <Divider sx={{ my: 2, borderColor: '#FFC107' }} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

  {/* Botão Fechar fixo */}
      <Button 
        onClick={handleCancel}
        fullWidth
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          backdropFilter: 'blur(5px)',
          borderTop: '1px solid #FFC107',
          p: 2,
          color: '#f44336',
          fontWeight: 600,
          borderRadius: 0,
          '&:hover': {
            backgroundColor: '#f44336',
            color: 'white',
          }
        }}
      >
        Close
      </Button>
    </SidePanel>
    </Slide>
  );
};

export default MyRoutesList;