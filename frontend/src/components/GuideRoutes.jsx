// src/components/GuideRoutes.jsx

import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Button, Avatar, Chip, Stack, CircularProgress,
  Card, CardContent, Divider, Grid, Slide, Rating
} from '@mui/material';
import {
  Person as PersonIcon, DirectionsCar as CarIcon, Image as ImageIcon,
  Route as RouteIcon, Email as EmailIcon
} from '@mui/icons-material';
import { SidePanel } from '../styles/StyledComponents';
import { useRoutes } from '../context/RoutesContext';
import { useAuth } from '../context/AuthContext';
import axios from '../services/api';

const GuideRoutes = ({ guide, onBack, onReserve }) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  //const [guideRating, setGuideRating] = useState({ averageRating: 0, totalRatings: 0 });

  const { selectRoute, activeRoute, clearActiveRoute } = useRoutes();
  const { isGuide } = useAuth();
  const cardRefs = useRef({});

  // Buscar rotas e rating do guia ao montar
  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        setLoading(true);
        setError('');

        // Buscar rotas do guia
        const res = await axios.get(`http://localhost:8000/routes/guide/${guide.id}`);
        setRoutes(res.data.results || []);

        // Buscar rating médio do guia
        /*const ratingRes = await axios.get(`/ratings/guide/${guide.id}`);
        setGuideRating(ratingRes.data || { averageRating: 0, totalRatings: 0 });*/

      } catch (err) {
        console.error('Erro ao buscar dados do guia:', err);
        setError('Erro ao carregar dados do guia.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuideData();
  }, [guide.id]);

  const handleRouteClick = (route) => {
    if (activeRoute?.id === route.id) {
      clearActiveRoute();
    } else {
      selectRoute(route);
    }
  };

  return (
    <Slide in={true} direction="right" timeout={700} mountOnEnter unmountOnExit>
      <SidePanel elevation={2} sx={{ height: '90vh', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Conteúdo com scroll */}
        <Box sx={{
          flex: 1, overflow: 'auto', paddingBottom: '60px',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none', 'scrollbar-width': 'none'
        }}>
          {/* Título */}
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 3, mt: 3 }}>
            <Typography variant="h5" fontWeight="bold">Perfil do Guia</Typography>
          </Box>

          {/* Perfil do guia */}
          <Card elevation={0} sx={{ mb: 2, backgroundColor: 'transparent' }}>
            <CardContent>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Avatar 
                  src= {`http://localhost:8000/${guide.profile_image}`} 
                  sx={{ width: 80, height: 80, mr: 2 }}>
                  {!guide.profileImage && <PersonIcon sx={{ fontSize: 40 }} />}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">{guide.name}</Typography>
                  <Box display="flex" alignItems="center">
                    <EmailIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">{guide.email}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" sx={{ mt: 0.5, mb: 0.5 }}>
                    <Rating value={guideRating.averageRating} precision={0.1} size="small" readOnly />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      ({guideRating.averageRating.toFixed(1)}) • {guideRating.totalRatings} avaliação{guideRating.totalRatings !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Membro desde {guide.created_at ? new Date(guide.created_at).toLocaleDateString('pt-PT') : 'N/D'}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip label="Guia" size="small" sx={{ backgroundColor: '#FFC107', color: '#000' }} />
                  </Box>
                </Box>
              </Box>

              {/* Veículo */}
              {guide.registration && (
                <>
                  <Divider sx={{ my: 2, borderColor: '#FFC107' }} />
                  <Box sx={{
                    border: '1px solid rgba(250, 213, 64, 0.4)',
                    borderRadius: 2,
                    p: 2,
                    backgroundColor: 'rgba(250, 213, 64, 0.05)'
                  }}>
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                      <CarIcon sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        {guide.brand} {guide.model}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {guide.seatingCapacity && <Chip label={`${guide.seatingCapacity} lugares`} size="small" />}
                      {guide.color && <Chip label={guide.color} size="small" />}
                      {guide.registration && <Chip label={guide.registration} size="small" />}
                    </Stack>
                    {guide.additionalInfo && (
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                        "{guide.additionalInfo}"
                      </Typography>
                    )}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>

          {/* Seção das Rotas */}
          <Divider sx={{ my: 2, borderColor: '#FFC107' }} />
          <Box textAlign="center" mb={2}>
            <Typography variant="h6">Rotas do Guia</Typography>
          </Box>

          {/* Lista de Rotas */}
          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress sx={{ color: '#FFC107' }} />
            </Box>
          ) : error ? (
            <Box textAlign="center" py={4}>
              <Typography color="error">{error}</Typography>
              <Button onClick={() => window.location.reload()} sx={{ mt: 2, backgroundColor: '#FFC107' }}>
                Tentar Novamente
              </Button>
            </Box>
          ) : routes.length === 0 ? (
            <Box textAlign="center" py={4}>
              <RouteIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
              <Typography variant="body1" color="text.secondary" fontWeight="medium">
                Nenhuma rota encontrada
              </Typography>
            </Box>
          ) : (
            <Grid container direction="column" alignItems="center" spacing={2}>
              {routes.map((route) => (
                <Grid item key={route.id} sx={{ width: '350px' }}>
                  <Card
                    elevation={0}
                    ref={el => cardRefs.current[route.id] = el}
                    sx={{
                      minHeight: '200px',
                      borderRadius: 3,
                      backgroundColor: activeRoute?.id === route.id ? '#FFC107' : 'transparent',
                      border: activeRoute?.id === route.id ? '2px solid #FFC107' : 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': { transform: 'translateY(-4px)', opacity: 0.9 }
                    }}
                    onClick={() => handleRouteClick(route)}
                  >
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography variant="h6" sx={{
                          fontSize: '1.1rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {route.name}
                        </Typography>

                        {/* Imagem */}
                        <Box sx={{ mb: 1 }}>
                          {route.routeImageBase64 ? (
                            <Avatar src={route.routeImageBase64} variant="rounded"
                              sx={{ width: 300, height: 150, borderRadius: 2, boxShadow: 1 }} />
                          ) : (
                            <Avatar variant="rounded"
                              sx={{ width: 300, height: 150, borderRadius: 2, bgcolor: 'grey.200', boxShadow: 1 }}>
                              <ImageIcon color="disabled" />
                            </Avatar>
                          )}
                        </Box>

                        {/* Chips de info */}
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          <Chip
                            label={`${route.locations?.length || 0} locais`}
                            size="small"
                            sx={{
                              backgroundColor: activeRoute?.id === route.id ? '#333' : '#FFC107',
                              color: activeRoute?.id === route.id ? 'white' : '#333',
                            }}
                          />
                          <Chip
                            label={activeRoute?.id === route.id ? "No mapa" : "Ver no mapa"}
                            size="small"
                            color={activeRoute?.id === route.id ? "success" : "default"}
                            variant={activeRoute?.id === route.id ? "filled" : "outlined"}
                          />
                        </Stack>

                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" color="text.secondary">
                            Criada em {route.created_at ? new Date(route.created_at).toLocaleDateString('pt-PT') : 'Data indisponível'}
                          </Typography>

                          {!isGuide() && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                onReserve(route);
                              }}
                              sx={{
                                borderRadius: '12px',
                                textTransform: 'none',
                                bgcolor: '#FFC107',
                                color: '#333',
                                fontSize: '0.80rem',
                                padding: '6px 8px',
                                minWidth: '80px',
                                '&:hover': { bgcolor: '#FFB300' }
                              }}
                            >
                              Reservar
                            </Button>
                          )}
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                  <Divider sx={{ my: 2, borderColor: '#FFC107' }} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Botão Voltar */}
        <Button
          onClick={onBack}
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
          Voltar aos Guias
        </Button>
      </SidePanel>
    </Slide>
  );
};

export default GuideRoutes;
