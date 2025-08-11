// src/components/GuideRequests.jsx

import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Chip, Button, CircularProgress, Avatar, Card, CardContent, Grid, Slide,
  IconButton, Divider, Alert, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Cancel as CancelIcon,
  Event as EventIcon, Schedule as ScheduleIcon, Person as PersonIcon,
  Image as ImageIcon, Route as RouteIcon
} from '@mui/icons-material';
import { SidePanel } from '../styles/StyledComponents';
import { useReservations } from '../context/ReservationsContext';
import { useAuth } from '../context/AuthContext';
import { useRoutes } from '../context/RoutesContext';
import axios from '../services/api';

// 🧠 Função auxiliar para formatar data
const formatDate = (date) => {
  if (!date) return 'Date not available';
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return 'Invalid date';
    return dateObj.toLocaleDateString('en-GB');
  } catch {
    return 'Date not available';
  }
};

// 🧠 Função auxiliar para comparar datas (YYYY-MM-DD)
const formatDateForComparison = (date) => {
  return date.toISOString().slice(0, 10);
};

// 🧠 Função auxiliar para formatar hora
const formatTimeSlot = (selectedHours, totalHours) => {
  if (!selectedHours || selectedHours.length === 0) return 'Time not specified';
  const startTime = selectedHours[0];
  return `${startTime} (${totalHours}h)`;
};

// 📅 Componente de calendário
const Calendar = ({ selectedDate, onDateSelect, reservationDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const calendarDays = [];

  for (let i = 0; i < startingDayOfWeek; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(new Date(year, month, day));

  const hasReservations = (date) => {
    if (!date) return false;
    return reservationDates.includes(formatDateForComparison(date));
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return formatDateForComparison(date) === formatDateForComparison(selectedDate);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <IconButton onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} size="small">
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Typography>
        <IconButton onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} size="small">
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} sx={{ mb: 1 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Box key={day} sx={{ textAlign: 'center', fontWeight: 'bold', color: 'text.secondary' }}>{day}</Box>
        ))}
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
        {calendarDays.map((date, idx) => {
          const isEmpty = !date;
          const hasBookings = hasReservations(date);
          const selected = isSelected(date);
          const disabled = isEmpty || !hasBookings;

          return (
            <Button
              key={idx}
              onClick={() => !disabled && onDateSelect(date)}
              disabled={disabled}
              sx={{
                height: 44, borderRadius: 1.5, fontSize: '1rem',
                border: '2px solid',
                borderColor: selected ? '#FFC107' : hasBookings ? 'rgba(255, 193, 7, 0.5)' : 'transparent',
                bgcolor: selected ? '#FFC107' : hasBookings ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                color: selected ? '#000' : disabled ? '#ccc' : '#333',
                fontWeight: selected ? 'bold' : 'normal',
                '&:hover': {
                  bgcolor: selected ? '#FFC107' : 'rgba(255, 193, 7, 0.2)',
                  borderColor: selected ? '#FFC107' : 'rgba(255, 193, 7, 0.7)'
                }
              }}
            >
              {date ? date.getDate() : ''}
              {hasBookings && !selected && (
                <Box sx={{ position: 'absolute', bottom: 4, right: 4, width: 6, height: 6, borderRadius: '50%', bgcolor: '#FFC107' }} />
              )}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

const GuideRequests = ({ onClose }) => {
  // Gereia a mudança de rota selecionada no filtro
  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
  setSelectedDate(null); // Reinicia a data selecionada ao mudar de rota
  };

  // Gereia a seleção de data no calendário
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  const { loading, getAllReservations } = useReservations();
  const { user, isGuide } = useAuth();
  const { routes } = useRoutes();

  const [showPanel, setShowPanel] = useState(true);
  const [actioningIds, setActioningIds] = useState(new Set());
  const [allGuideReservations, setAllGuideReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [myRoutes, setMyRoutes] = useState([]);

  useEffect(() => {
    const loadGuideReservations = async () => {
      if (!user?.id || !isGuide()) return;
      try {
        setLoadingReservations(true);
        const allReservations = await getAllReservations();

        const guideReservations = allReservations.filter(
          res => res.routeCreatedBy === user.id && res.status === 'confirmed'
        );

        setAllGuideReservations(guideReservations);
        setMyRoutes(routes.filter(route => route.createdBy === user.id));
      } catch (err) {
        alert('Erro ao carregar reservas: ' + err.message);
      } finally {
        setLoadingReservations(false);
      }
    };

    loadGuideReservations();
  }, [user, isGuide, getAllReservations, routes]);

  useEffect(() => {
    let filtered = [...allGuideReservations];
    if (selectedDate) {
      const dateStr = formatDateForComparison(selectedDate);
      filtered = filtered.filter(res => res.selectedDate === dateStr);
    }
    if (selectedRoute !== 'all') {
      filtered = filtered.filter(res => res.routeId === selectedRoute);
    }
    setFilteredReservations(filtered);
  }, [allGuideReservations, selectedDate, selectedRoute]);

  const getReservationDates = () => {
    let resList = [...allGuideReservations];
    if (selectedRoute !== 'all') {
      resList = resList.filter(res => res.routeId === selectedRoute);
    }
    return [...new Set(resList.map(res => res.selectedDate))];
  };

  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm('Are you sure you want to cancel this tour?')) return;

    setActioningIds(prev => new Set([...prev, reservationId]));
    try {
      await axios.put(`/reservations/${reservationId}/cancel`);
      const allReservations = await getAllReservations();
      const updatedGuideReservations = allReservations.filter(
        res => res.routeCreatedBy === user.id && res.status === 'confirmed'
      );
      setAllGuideReservations(updatedGuideReservations);
    } catch (err) {
      alert('Erro ao cancelar reserva: ' + err.message);
    } finally {
      setActioningIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(reservationId);
        return newSet;
      });
    }
  };

  if (!isGuide()) {
    return (
      <Slide in={showPanel} direction="down" timeout={700} mountOnEnter unmountOnExit onExited={onClose}>
        <SidePanel>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error">Access Denied</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Only guides can manage reservations.
            </Typography>
            <Button onClick={() => setShowPanel(false)} variant="contained" sx={{ backgroundColor: '#FFC107', color: '#333' }}>
              Close
            </Button>
          </Box>
        </SidePanel>
      </Slide>
    );
  }

  return (
    <Slide in={showPanel} direction="down" timeout={700} mountOnEnter unmountOnExit onExited={onClose}>
      <SidePanel elevation={2} sx={{ 
        height: '90vh', 
        maxHeight: '90vh', 
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: 4,
  width: 420 // ✅ NOVO: Mais largo para acomodar calendário
      }}>
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          paddingBottom: '60px',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}>
          
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 3, mt: 2 }}>
            <Typography variant="h5">
              My Tour Bookings
            </Typography>
          </Box>

          {loading || loadingReservations ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress sx={{ color: '#FFC107' }} />
            </Box>
          ) : (
            <Box sx={{ px: 2 }}>
              
              {/* ✅ NOVO: Filtro por rota */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Filter by Route</InputLabel>
                <Select
                  value={selectedRoute}
                  label="Filter by Route"
                  onChange={handleRouteChange}
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFC107',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFC107',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFC107',
                    }
                  }}
                >
                  <MenuItem value="all">All Routes ({allGuideReservations.length} bookings)</MenuItem>
                  {myRoutes.map((route) => {
                    const routeBookings = allGuideReservations.filter(res => res.routeId === route.id);
                    return (
                      <MenuItem key={route.id} value={route.id}>
                        {route.name} ({routeBookings.length} bookings)
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* ✅ NOVO: Calendário */}
              <Typography variant="subtitle1" gutterBottom>
                Select a date to view bookings:
              </Typography>
              
              <Calendar 
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                reservationDates={getReservationDates()}
              />

              {/* ✅ NOVO: Informação sobre seleção */}
              {selectedDate && (
                <Alert severity="info" sx={{ 
                    mt: 2, 
                    mb: 2,
                    backgroundColor: '#FFF8E1',
                    border: '1px solid #FFC107',
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      color: '#FF8F00'
                    },
                    '& .MuiAlert-message': {
                      color: '#333'
                    }
                  }}>
                  Showing bookings for {selectedDate.toLocaleDateString('en-GB')}
                  {selectedRoute !== 'all' && (
                    <span> on route "{myRoutes.find(r => r.id === selectedRoute)?.name}"</span>
                  )}
                  : {filteredReservations.length} booking{filteredReservations.length !== 1 ? 's' : ''} found
                </Alert>
              )}

              {!selectedDate && allGuideReservations.length > 0 && (
                <Alert severity="info" sx={{ 
                    mt: 2, 
                    mb: 2,
                    backgroundColor: '#FFF8E1',
                    border: '1px solid #FFC107',
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      color: '#FF8F00'
                    },
                    '& .MuiAlert-message': {
                      color: '#333'
                    }
                  }}>
                  You have {allGuideReservations.length} total booking{allGuideReservations.length !== 1 ? 's' : ''}. 
                  Select a date on the calendar to view specific bookings. 
                  Days with bookings are highlighted in yellow.
                </Alert>
              )}

              {/* ✅ NOVO: Lista de reservas filtradas */}
              {selectedDate && filteredReservations.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" fontWeight="medium">
                    No bookings on this date
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedRoute !== 'all' ? 'Try selecting a different route or date.' : 'Try selecting a different date.'}
                  </Typography>
                </Box>
              ) : selectedDate && filteredReservations.length > 0 ? (
                <Grid container direction="column" alignItems="center" spacing={2}>
                  {filteredReservations.map((reservation) => (
                    <Grid item key={reservation.id} sx={{ width: '100%' }}>
                      <Card 
                        elevation={0} 
                        sx={{ 
                          borderRadius: 3, 
                          border: '1px solid #e0e0e0', 
                          height:'100%' ,
                          backgroundColor:'#FFF8E1',
                          display: 'flex', 
                          flexDirection: 'column',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          }
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <Box display="flex" alignItems="flex-start">
                            
                            {/* Imagem da rota */}
                            <Box sx={{ mr: 2, flexShrink: 0 }}>
                              {reservation.routeImage ? (
                                <Avatar 
                                  src={reservation.routeImage} 
                                  variant="rounded" 
                                  sx={{ 
                                    width: 64, 
                                    height: 64, 
                                    borderRadius: 2, 
                                    boxShadow: 1 
                                  }} 
                                />
                              ) : (
                                <Avatar 
                                  variant="rounded" 
                                  sx={{ 
                                    width: 64, 
                                    height: 64, 
                                    borderRadius: 2, 
                                    bgcolor: 'grey.200', 
                                    boxShadow: 1 
                                  }}
                                >
                                  <ImageIcon color="disabled" />
                                </Avatar>
                              )}
                            </Box>

                            <Box flex={1}>
                              <Typography 
                                variant="h6" 
                                fontWeight="bold" 
                                sx={{ 
                                  fontSize: '1.1rem', 
                                  mb: 0.5,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {reservation.routeName}
                              </Typography>
                              
                              {/* Informação do turista */}
                              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                                <PersonIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary" 
                                  sx={{ fontSize: '0.85rem' }}
                                >
                                  Tourist: {reservation.userName || reservation.touristName || 'Unknown'}
                                </Typography>
                              </Box>

                              {/* Hora */}
                              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                                <ScheduleIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary" 
                                  sx={{ fontSize: '0.85rem' }}
                                >
                                  {formatTimeSlot(reservation.selectedHours, reservation.totalHours)}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                           <Box display="flex" justifyContent="space-between" alignItems="center"   sx={{ }}>
                                <Typography 
                                variant="caption" 
                                color="text.secondary" 
                                sx={{ 
                                  fontSize: '0.75rem', 
                                  display: 'block'
                                }}
                              >
                                Booked on {formatDate(reservation.createdAt)}
                              </Typography>

                                <Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() => handleCancelReservation(reservation.id)}
                                  disabled={actioningIds.has(reservation.id)}
                                  startIcon={actioningIds.has(reservation.id) ? 
                                    <CircularProgress size={16} color="inherit" /> : 
                                    <CancelIcon />
                                  }
                                  sx={{ textTransform: 'none', borderRadius: 2 }}
                                >
                                  Cancel Tour
                                </Button>
                              </Box>
                        </CardContent>
                      </Card>
                      <Divider sx={{ my: 2, borderColor: '#FFC107' }} />
                    </Grid>
                  ))}
                </Grid>
              ) : allGuideReservations.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary" fontWeight="medium">
                    No tour bookings yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tourist reservations will appear here automatically confirmed.
                  </Typography>
                </Box>
              ) : null}

              {/* Legenda */}
              {allGuideReservations.length > 0 && (
                <Box sx={{ display: 'flex', gap: 2, mb: 2, fontSize: '0.75rem', mt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, bgcolor: '#FFC107', borderRadius: 1, mr: 0.5 }} />
                    <Typography variant="caption">Days with bookings</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, bgcolor: 'transparent', border: '1px solid #ddd', borderRadius: 1, mr: 0.5 }} />
                    <Typography variant="caption">No bookings</Typography>
                  </Box>
                </Box>
              )}

              {/* Alerta final */}
              {selectedDate && filteredReservations.length > 0 && (
                <Alert 
                  severity="info" 
                  sx={{ 
                    mt: 3,
                    mx: 0,
                    backgroundColor: '#FFF8E1',
                    border: '1px solid #FFC107',
                    borderRadius: 2,
                    '& .MuiAlert-icon': { color: '#FF8F00' },
                    '& .MuiAlert-message': { color: '#333' }
                  }}
                >
                  All tourist reservations are automatically confirmed. Cancel only if you cannot provide the tour.
                </Alert>
              )}
            </Box>
          )}
        </Box>

  {/* Botão fechar */}
        <Button
          onClick={() => setShowPanel(false)}
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
            '&:hover': { backgroundColor: '#f44336', color: 'white' }
          }}
        >
          Close
        </Button>
      </SidePanel>
    </Slide>
  );
};

export default GuideRequests;