import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  Stack,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Grid,
  Rating,
  Divider,
  Slide,
  Select,
  MenuItem
} from '@mui/material';
import {
  Person as PersonIcon,
  DirectionsCar as CarIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { SidePanel } from '../styles/StyledComponents';
import GuideRoutes from './GuideRoutes';
import axios from 'axios';

const GuidesList = ({ onClose, onReserve }) => {
  const [guidesWithRoutes, setGuidesWithRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPanel, setShowPanel] = useState(true);
  const [sortType, setSortType] = useState('name');
  const [selectedGuide, setSelectedGuide] = useState(null);

  useEffect(() => {
    fetchGuidesAndRoutes();
  }, [sortType]);

  const fetchGuidesAndRoutes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/guides');
      console.log(response.data)
      let guides = response.data.results || [];

      // Filtrar solo guías que tengan al menos una ruta
      /*guides = guides
        .map((guide) => ({
          ...guide,
          routesCount: guide.routesCount || 0
        }))
        .filter((guide) => guide.routesCount > 0);*/

      // Ordenar por nombre o por rating
      const sortedGuides = guides.sort((a, b) => {
        if (sortType === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortType === 'rating') {
          return (b.averageRatings || 0) - (a.averageRatings || 0);
        }
        return 0;
      });

      setGuidesWithRoutes(sortedGuides);
    } catch (err) {
      console.error('Erro ao buscar guias:', err);
      setError('Erro ao carregar guias. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactGuide = (e, guide) => {
    e.stopPropagation();
    if (guide.email) {
      window.open(`mailto:${guide.email}`, '_blank');
    }
  };

  const handleCancel = () => setShowPanel(false);

  const handleViewGuideRoutes = (guide) => setSelectedGuide(guide);

  const handleBackToGuides = () => setSelectedGuide(null);

  if (selectedGuide) {
    return (
      <GuideRoutes
        guide={selectedGuide}
        onBack={handleBackToGuides}
        onReserve={onReserve}
      />
    );
  }

  return (
    <Slide in={showPanel} direction="down" timeout={700} mountOnEnter unmountOnExit onExited={onClose}>
      <SidePanel
        elevation={3}
        sx={{
          height: '90vh',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            paddingBottom: '60px',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h5">Tour Guides</Typography>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress sx={{ color: '#FFC107' }} />
            </Box>
          ) : error ? (
            <Box textAlign="center" py={4}>
              <Typography variant="body2" color="error">{error}</Typography>
              <Button onClick={fetchGuidesAndRoutes} sx={{ mt: 2 }}>Try Again</Button>
            </Box>
          ) : guidesWithRoutes.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="body2" color="text.secondary">
                No guides available right now.
              </Typography>
            </Box>
          ) : (
            <Box>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
                borderBottom: '1px solid #FFC107',
                pb: 1,
                px: 2
              }}>
                <Typography variant="body1" fontWeight="medium">
                  {guidesWithRoutes.length} guide{guidesWithRoutes.length !== 1 ? 's' : ''} available:
                </Typography>
                <Select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  size="small"
                  sx={{
                    minWidth: 160,
                    fontSize: '0.85rem',
                    borderRadius: 2,
                    '& .MuiSelect-select': {
                      paddingY: 0.8
                    }
                  }}
                >
                  <MenuItem value="name">Sort by Name</MenuItem>
                  <MenuItem value="rating">Sort by Rating</MenuItem>
                </Select>
              </Box>

              <Grid container direction="column" alignItems="center">
                {guidesWithRoutes.map((guide) => (
                  <Grid item key={guide.id}>
                    <Card
                      elevation={0}
                      sx={{
                        width: '350px',
                        minHeight: '240px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        backgroundColor: 'transparent',
                        transition: 'transform 0.2s ease, opacity 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          opacity: 0.9
                        }
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box display="flex" alignItems="flex-start" sx={{ mb: 2 }}>
                          <Box sx={{ mr: 2, flexShrink: 0 }}>
                            <Avatar
                              src= {`http://localhost:8000/${guide.profile_image}`}
                              sx={{
                                width: 64,
                                height: 64,
                                boxShadow: 1,
                                objectFit: 'cover',
                                bgcolor: guide.profile_image ? 'transparent' : 'primary.main'
                              }}
                            >
                              {!guide.profile_image && <PersonIcon sx={{ fontSize: 32 }} />}
                            </Avatar>
                          </Box>

                          <Box flex={1}>
                            <Typography variant="h6" fontWeight="bold" sx={{
                              mb: 0.5, fontSize: '1.1rem',
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                            }}>
                              {guide.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{
                              mb: 1, fontSize: '0.85rem',
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                            }}>
                              {guide.email}
                            </Typography>

                            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                              <Rating
                                value={guide.averageRatings || 0}
                                precision={0.1}
                                size="small"
                                readOnly
                              />
                              <Typography variant="caption" color="text.secondary" sx={{ ml: 1, fontSize: '0.80rem' }}>
                                ({Number(guide.averageRatings)?.toFixed(1) || '0.0'}) • {guide.totalRatings || 0} review{(guide.totalRatings || 0) !== 1 ? 's' : ''} • {guide.routesCount} route{guide.routesCount !== 1 ? 's' : ''}
                              </Typography>
                            </Box>

                            {guide.registration && (
                              <Box sx={{ mb: 1 }}>
                                <Box display="flex" alignItems="center" sx={{ mb: 0.5 }}>
                                  <CarIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                  <Typography variant="body2" fontWeight="medium">
                                    {guide.brand} {guide.model}
                                  </Typography>
                                </Box>
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                  <Chip label={`${guide.seatingCapacity} lugares`} size="small" variant="outlined" />
                                  <Chip label={guide.color} size="small" variant="outlined" />
                                  {guide.registration && (
                                    <Chip label={guide.registration} size="small" variant="outlined" />
                                  )}
                                </Stack>
                                {guide.additionalInfo && (
                                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                    {guide.additionalInfo}
                                  </Typography>
                                )}
                              </Box>
                            )}

                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.80rem' }}>
                              Member since {guide.created_at ? new Date(guide.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>

                      <CardActions sx={{ pt: 0, gap: 1, mt: 'auto' }}>
                        <Button
                          onClick={() => handleViewGuideRoutes(guide)}
                          variant="contained"
                          size="small"
                          fullWidth
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            bgcolor: '#FFC107',
                            color: '#333',
                            '&:hover': { bgcolor: '#FFB300' }
                          }}
                        >
                          View Routes
                        </Button>

                        <Button
                          onClick={(e) => handleContactGuide(e, guide)}
                          variant="outlined"
                          size="small"
                          fullWidth
                          startIcon={<EmailIcon />}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            border: '2px solid #FFC107',
                            color: '#333',
                            '&:hover': {
                              bgcolor: '#ffe9b6ff',
                              color: 'black'
                            }
                          }}
                        >
                          Contact
                        </Button>
                      </CardActions>
                    </Card>
                    <Divider sx={{ my: 2, borderColor: '#FFC107' }} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>

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
              color: 'white'
            }
          }}
        >
          Close
        </Button>
      </SidePanel>
    </Slide>
  );
};

export default GuidesList;
