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
  const { routes, activeRoute, selectRoute, deleteRoute, clearActiveRoute, loading } = useRoutes();
  const { isGuide, userProfile } = useAuth();
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

    const routesCopy = [...routes];

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
  }, [routes, sortType]);

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
          ) : routes.length === 0 ? (
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                  borderBottom: '1px solid #FFC107',
                  pb: 1,
                }}
              >
                <Typography variant="body1" fontWeight="medium">
                  {routes.length} route{routes.length !== 1 ? 's' : ''} {isGuide() ? 'created' : 'available'}:
                </Typography>

                <Select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  size="small"
                  sx={{
                minWidth: 160,
                fontSize: '0.85rem',
                borderRadius: 2,
                border: '2px solid #FFC107',
                '& .MuiSelect-select': {
                  paddingY: 0.8
                },
                  '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none' // ✅ Remove borda padrão
                },
                
              }}
               MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 2, // ✅ Menu arredondado
                    border: '1px solid #FFC107',
                  
                    '& .MuiMenuItem-root': {
                      fontSize: '0.85rem',
                      color: '#333',
                      '&.Mui-selected': {
                        backgroundColor: '#ffdc75ff', // ✅ Selecionado amarelo
                        color: '#000',
                      }
                    }
                  }
                }
              }}

                >
                  <MenuItem value="date">Sort by Date Created</MenuItem>
                  <MenuItem value="name">Sort by Name</MenuItem>
                </Select>
              </Box>

              <Grid container direction="column" alignItems="center" spacing={2}>
                {sortedRoutes.map((route) => (
                  <Grid 
                    item 
                    key={route.id} 
                    sx={{ width: '350px' }}
                    ref={el => cardRefs.current[route.id] = el} 
                  >
                    <Card
                      elevation={0}
                      sx={{
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
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
                        <Stack direction="column" spacing={1} alignItems="fle">
                          {/* Route name */}
                          <Typography
                            variant="h6"
                            fontWeight=""
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
                          

                          {/* Route image or placeholder */}
                          <Box sx={{ flexShrink: 0, mb: 1 }}>
                            {route.tour_image ? (
                              <Avatar
                                src= {`http://localhost:8000/${route.tour_image}`}
                                sx={{ width: 300, height: 150, borderRadius: 2, boxShadow: 1 }}
                                variant="rounded"
                              />
                            ) : (
                              <Avatar
                                sx={{ width: 100, height: 150, borderRadius: 2, bgcolor: 'grey.200', boxShadow: 1 }}
                                variant="rounded"
                              >
                                <ImageIcon color="disabled" />
                              </Avatar>
                            )}
                          </Box>

                          {/* Created by (moved below image, aligned left) */}
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ width: '100%', mb: 3 }}
                          >
                            {/* Left side: Created by */}
                            {route.createdByName && (
                              <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                  Created by:
                                </Typography>
                                {route.createdByProfileImage ? (
                                  <Avatar src={route.createdByProfileImage} sx={{ width: 19, height: 19 }} />
                                ) : (
                                  <PersonIcon fontSize="small" color="action" />
                                )}
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                  {route.createdBy === userProfile?.uid ? 'me' : route.createdByName}
                                </Typography>
                              </Box>
                            )}

                            {/* Right side: Duration */}
                            {route.duration && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: 'text.secondary',
                                  fontSize: '0.80rem',
                                  fontWeight: 500,
                                  whiteSpace: 'nowrap',
                                  flexShrink: 0,
                                  mr:3
                                }}
                              >
                                ⏱ {route.duration}
                              </Typography>
                            )}
                          </Box>

                          {/* Chips: locations, duration, status */}
                          <Box sx={{mb:4}}>
                            <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 1 }}>
                              <Chip
                                label={`${route.locations?.length || 0} locations`}
                                size="small"
                                sx={{
                                  backgroundColor: activeRoute?.id === route.id ? '#333' : '#FFC107',
                                  color: activeRoute?.id === route.id ? 'white' : '#333',
                                }}
                              />
                              
                              <Chip
                                label={activeRoute?.id === route.id ? "On map" : "View on map"}
                                size="small"
                                color={activeRoute?.id === route.id ? "success" : "default"}
                                variant={activeRoute?.id === route.id ? "filled" : "outlined"}
                              />
                            </Stack>
                          </Box>

                          {/* Layout with locations on left and Reserve button on right */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
                            <Stack direction="column" spacing={0.5}>
                              {/* Locations list */}
                              {route.locations?.length > 0 && (
                                <Box sx={{ mb: 1, maxHeight: '60px', overflow: 'hidden' }}>
                                  {route.locations.slice(0, 4).map((location, index) => (
                                    <Box key={index} display="flex" alignItems="center" sx={{ mb: 0.3 }}>
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
                                        sx={{ fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                      >
                                        {location.name || `Location ${index + 1}`}
                                      </Typography>
                                    </Box>
                                  ))}
                                  {route.locations.length > 4 && (
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{ fontSize: '0.70rem', fontStyle: 'italic' }}
                                    >
                                      +{route.locations.length - 4} more locations...
                                    </Typography>
                                  )}
                                </Box>
                              )}
                            </Stack>
                          </Box>
                          <Box>
                          {/* Created date */}
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.80rem' , mr: 10 }}>
                                Created on {route.created_at ? new Date(route.created_at).toLocaleDateString('en-GB') : 'Date not available'}
                              </Typography>
                          {/* Reserve button on the right (smaller size) */}
                            {!isGuide() && (
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onClose();
                                  onReserve(route);
                                }}
                                sx={{
                                  borderRadius: '12px',
                                  textTransform: 'none',
                                  bgcolor: '#FFC107',
                                  color: '#333',
                                  fontSize: '0.80rem', // Smaller font size
                                  padding: '6px 8px',  // Smaller padding
                                  minWidth: '80px',    // Smaller minimum width
                                  '&:hover': { bgcolor: '#FFB300' }
                                }}
                              >
                                Reserve
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

              {/* User Reservations List */}
              {!isGuide() && reservations.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Your Reservations
                  </Typography>
                  {reservations.map((res, index) => (
                    <Card key={index} sx={{ mb: 1, p: 2, backgroundColor: '#f5f5f5' }}>
                      <Typography variant="body1" fontWeight="medium">
                        {res.routeName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        📅 {res.date} • ⏰ {res.startTime} - {res.endTime}
                      </Typography>
                    </Card>
                  ))}
                </Box>
              )}
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
