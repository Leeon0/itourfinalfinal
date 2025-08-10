import React, { useState, useEffect, useRef } from 'react';
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
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Route as RouteIcon,
  Person as PersonIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import { SidePanel } from '../styles/StyledComponents';
import { useRoutes } from '../context/RoutesContext';
import { useAuth } from '../context/AuthContext';
import { useReservations } from '../context/ReservationsContext';

const RoutesList = ({ onClose, onCreateRoute }) => {
  const { routes, activeRoute, selectRoute, deleteRoute, clearActiveRoute, loading, fetchRoutes } = useRoutes();
  const { isGuide, user } = useAuth();
  const { addReservation, reservations } = useReservations();

  const [sortType, setSortType] = useState('date');
  const [showPanel, setShowPanel] = useState(true);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reserveRoute, setReserveRoute] = useState(null);
  const [reserveDate, setReserveDate] = useState('');
  const [reserveStartTime, setReserveStartTime] = useState('');
  const [reserveEndTime, setReserveEndTime] = useState('');

  const cardRefs = useRef({});

  useEffect(() => {
    if (activeRoute && cardRefs.current[activeRoute.id]) {
      setTimeout(() => {
        cardRefs.current[activeRoute.id]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 500);
    }
  }, [activeRoute]);

  const sortedRoutes = React.useMemo(() => {
    if (!routes) return [];

    // Mostrar rutas predeterminadas (id <= 12) y públicas (id > 12)
    const defaultRoutes = routes.filter(route => route.id <= 12);
    const publicRoutes = routes.filter(route => route.id > 12);
    const routesCopy = [...defaultRoutes, ...publicRoutes];

    switch (sortType) {
      case 'name':
        return routesCopy.sort((a, b) => a.name.localeCompare(b.name));
      case 'date':
      default:
        return routesCopy.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateB - dateA;
        });
    }
  }, [routes, sortType, user]);

  const handleRouteClick = (route) => {
    if (activeRoute?.id === route.id) {
      clearActiveRoute();
    } else {
      selectRoute(route);
    }
  };

  const handleCancel = () => {
    setShowPanel(false);
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

  const openReserveDialog = (route) => {
    setReserveRoute(route);
    setReserveDate('');
    setReserveStartTime('');
    setReserveEndTime('');
    setReserveOpen(true);
  };

  const handleSaveReservation = async () => {
    if (!reserveDate || !reserveStartTime || !reserveEndTime) {
      alert('Please fill in all fields.');
      return;
    }

    if (reserveEndTime <= reserveStartTime) {
      alert('End time must be after start time.');
      return;
    }

    try {
      await addReservation(reserveRoute, reserveDate, { start: reserveStartTime, end: reserveEndTime });
      setReserveOpen(false);
    } catch (error) {
      alert('Error saving reservation: ' + error.message);
    }
  };

  return (
    <Slide in={showPanel} direction="down" timeout={700} mountOnEnter unmountOnExit onExited={onClose}>
      <SidePanel elevation={2} sx={{ height: '90vh', maxHeight: '90vh', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
        <Box sx={{ flex: 1, overflow: 'auto', paddingBottom: '60px' }}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h5">Available Routes</Typography>
          </Box>

          {isGuide() && (
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
                  '&:hover': { backgroundColor: '#F5C842' }
                }}
              >
                Add New Route
              </Button>
            </Box>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress sx={{ color: '#FFC107' }} />
            </Box>
          ) : sortedRoutes.length === 0 ? (
            <Box textAlign="center" py={4}>
              <RouteIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body1" color="text.secondary" fontWeight="medium">
                {isGuide() ? 'No route created' : 'No route available'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isGuide() && 'Click in "Add New Route" to get started.'}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ px: 2 }}>
              <Grid container direction="column" alignItems="center" spacing={2}>
                {sortedRoutes.map((route) => (
                  <Grid item key={route.id} sx={{ width: '350px' }} ref={el => cardRefs.current[route.id] = el}>
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
                          {/* Route title */}
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

                          {/* Image */}
                          <Box sx={{ mb: 1 }}>
                            {route.tour_image ? (
                              <Avatar
                                src={`http://localhost:8000/${route.tour_image}`}
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

                          {/* Description */}
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

                          {/* Locations preview */}
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

                          {/* Created Date */}
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.80rem', mt: 1 }}>
                            Created on {route.created_at_formatted ? route.created_at_formatted : (route.createdAt ? new Date(route.createdAt).toLocaleDateString('en-GB') : 'Date not available')}
                          </Typography>
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

        {/* Dialogo para reservas */}
        <Dialog open={reserveOpen} onClose={() => setReserveOpen(false)}>
          <DialogTitle>Make a Reservation</DialogTitle>
          <DialogContent>
            <TextField
              type="date"
              label="Date"
              fullWidth
              value={reserveDate}
              onChange={(e) => setReserveDate(e.target.value)}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="time"
              label="Start Time"
              fullWidth
              value={reserveStartTime}
              onChange={(e) => setReserveStartTime(e.target.value)}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="time"
              label="End Time"
              fullWidth
              value={reserveEndTime}
              onChange={(e) => setReserveEndTime(e.target.value)}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReserveOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveReservation} variant="contained" color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </SidePanel>
    </Slide>
  );
};

export default RoutesList;