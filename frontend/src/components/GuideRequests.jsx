import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Chip, Button, CircularProgress, Avatar, Card, CardContent, Grid, Slide, IconButton, Divider, Alert, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Cancel as CancelIcon, Event as EventIcon, Schedule as ScheduleIcon, Person as PersonIcon, Image as ImageIcon
} from '@mui/icons-material';
import { SidePanel } from '../styles/StyledComponents';
import { useReservations } from '../context/ReservationsContext';
import { useAuth } from '../context/AuthContext';
import { useRoutes } from '../context/RoutesContext';

// Helper function to format dates
const formatDate = (date) => {
  if (!date) return 'Date not available';
  
  try {
    if (date.toDate && typeof date.toDate === 'function') {
      return date.toDate().toLocaleDateString('en-GB');
    }
    
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    return dateObj.toLocaleDateString('en-GB');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date not available';
  }
};

// Helper function to format date for comparison
function formatDateForComparison(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to format time slot
const formatTimeSlot = (selectedHours, totalHours) => {
  if (!selectedHours || selectedHours.length === 0) return 'Time not specified';
  
  const startHour = selectedHours.split(':')[0];
  const startMin = selectedHours.split(':')[1];
  const duration = parseInt(totalHours.split(':')[0]);
  return `${startHour}:${startMin} (${duration}h)`;
};

// Calendar Component
const Calendar = ({ selectedDate, onDateSelect, reservationDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const calendarDays = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    calendarDays.push(date);
  }
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };
  
  const hasReservations = (date) => {
    if (!date) return false;

    const formattedDate = formatDateForComparison(date);
    return reservationDates.some(resDate => {
      return formatDateForComparison(resDate) === formattedDate;
    });
    
    //return reservationDates.includes(formatDateForComparison(date));
  };
  
  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return formatDateForComparison(date) === formatDateForComparison(selectedDate);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <IconButton onClick={goToPreviousMonth} size="small">
          <ChevronLeftIcon />
        </IconButton>
        
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Typography>
        
        <IconButton onClick={goToNextMonth} size="small">
          <ChevronRightIcon />
        </IconButton>
      </Box>
      
      <Box 
        display="grid" 
        gridTemplateColumns="repeat(7, 1fr)" 
        gap={1} 
        sx={{ mb: 1 }}
      >
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Box
            key={day}
            sx={{
              textAlign: 'center',
              py: 0.1,
              fontSize: '1rem',
              fontWeight: 'bold',
              color: 'text.secondary'
            }}
          >
            {day}
          </Box>
        ))}
      </Box>
      
      <Box 
        display="grid" 
        gridTemplateColumns="repeat(7, 1fr)" 
        gap={1}
      >
        {calendarDays.map((date, index) => {
          const isEmpty = !date;
          const hasBookings = hasReservations(date);
          const selected = isSelected(date);
          const disabled = isEmpty || !hasBookings;
          return (
            <Button
              key={index}
              onClick={() => !disabled && onDateSelect(date)}
              disabled={disabled}
              sx={{
                width: '100%',
                height: 44,
                minWidth: 0,
                p: 0,
                borderRadius: 1.5,
                fontSize: '1rem',
                border: '2px solid',
                borderColor: selected ? '#FFC107' : hasBookings ? 'rgba(255, 193, 7, 0.5)' : 'transparent',
                bgcolor: selected ? '#FFC107' : hasBookings ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                color: selected ? '#000' : 
                       disabled ? '#ccc' : 
                       hasBookings ? '#333' : '#ccc',
                fontWeight: selected ? 'bold' : hasBookings ? 'medium' : 'normal',
                position: 'relative',
                '&:hover': {
                  bgcolor: selected ? '#FFC107' : 
                           disabled ? 'transparent' : 
                           'rgba(255, 193, 7, 0.2)',
                  borderColor: selected ? '#FFC107' : 
                              disabled ? 'transparent' : 
                              'rgba(255, 193, 7, 0.7)',
                },
                '&:disabled': {
                  color: '#ccc',
                  bgcolor: 'transparent',
                  borderColor: 'transparent',
                }
              }}
            >
              {date ? date.getDate() : ''}
              {hasBookings && !selected && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: '#FFC107'
                  }}
                />
              )}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

const GuideRequests = ({ onClose }) => {
  const { loading, getAllReservations, cancelReservation } = useReservations();
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
  const [confirmDialog, setConfirmDialog] = useState({ open: false, reservationId: null });
  const [errorDialog, setErrorDialog] = useState({ open: false, message: '' });

  useEffect(() => {
    const loadGuideReservations = async () => {
      if (!user?.id || !isGuide()) return;
      
      try {
        setLoadingReservations(true);
        const allReservations = await getAllReservations();
        
        const guideReservations = allReservations.filter(
          (res) => res.guideId === user.id && res.status === 'confirmed'
        );
        
        setAllGuideReservations(guideReservations);
        
        /*const userRoutes = routes.filter(route => route.guide_id === user.id);
        setMyRoutes(userRoutes);*/
      } catch (err) {
        console.error('Error loading guide reservations:', err);
        setErrorDialog({ open: true, message: `Error loading reservations: ${err.message}` });
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
      filtered = filtered.filter(res => formatDateForComparison(res.selectedDate) === dateStr);
    }
    
    if (selectedRoute !== 'all') {
      filtered = filtered.filter(res => res.routeId === selectedRoute);
    }
    
    setFilteredReservations(filtered);
  }, [allGuideReservations, selectedDate, selectedRoute]);
    console.log(filteredReservations)
  const getReservationDates = () => {
    let reservations = [...allGuideReservations];
    
    if (selectedRoute !== 'all') {
      reservations = reservations.filter(res => res.routeId === selectedRoute);
    }

    return [...new Set(reservations.map(res => res.selectedDate))];
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleRouteChange = (event) => {
    setSelectedRoute(event.target.value);
    setSelectedDate(null);
  };

  const handleOpenConfirmDialog = (reservationId) => {
    setConfirmDialog({ open: true, reservationId });
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog({ open: false, reservationId: null });
  };

  const handleCloseErrorDialog = () => {
    setErrorDialog({ open: false, message: '' });
  };

  const handleCancelReservation = async (reservationId) => {
    handleOpenConfirmDialog(reservationId);
  };

  const handleConfirmCancel = async () => {
    const { reservationId } = confirmDialog;
    setActioningIds(prev => new Set([...prev, reservationId]));
    try {
      await cancelReservation(reservationId);
      
      const allReservations = await getAllReservations();
      const updatedGuideReservations = allReservations.filter(
        (res) => res.guideId === user.id && res.status === 'confirmed'
      );
      setAllGuideReservations(updatedGuideReservations);
      
    } catch (err) {
      console.error('Error cancelling reservation:', err);
      setErrorDialog({ open: true, message: `Error cancelling reservation: ${err.message}` });
    } finally {
      setActioningIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(reservationId);
        return newSet;
      });
      handleCloseConfirmDialog();
    }
  };

  if (!isGuide()) {
    return (
      <Slide in={showPanel} direction="down" timeout={700} mountOnEnter unmountOnExit onExited={onClose}>
        <SidePanel elevation={2} sx={{ height: '90vh', maxHeight: '90vh', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error" gutterBottom>
              Access Denied
            </Typography>
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
        width: 420
      }}>
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          paddingBottom: '60px',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 3, mt: 2 }}>
            <Typography variant="h5">
              My Tour Bookings
            </Typography>
          </Box>

          {loadingReservations ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress sx={{ color: '#FFC107' }} />
            </Box>
          ) : (
            <Box sx={{ px: 2 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ 
                  color: '#FFC107',
                  '&.Mui-focused': { color: '#FFC107' },
                  '&.MuiInputLabel-shrink': { color: '#FFC107' }
                }}>Filter by Route</InputLabel>
                <Select
                  value={selectedRoute}
                  label="Filter by Route"
                  onChange={handleRouteChange}
                  sx={{ 
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFC107',
                      border: '2px solid #FFC107',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFC107',
                      border: '2px solid #FFC107',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFC107',
                      border: '2px solid #FFC107',
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: 2,
                        border: '1px solid #FFC107',
                        '& .MuiMenuItem-root': {
                          fontSize: '0.85rem',
                          color: '#333',
                          '&:hover': {
                            backgroundColor: '#FFF8E1',
                            color: '#333'
                          },
                          '&.Mui-selected': {
                            backgroundColor: '#ffdc75ff',
                            color: '#000',
                          }
                        }
                      }
                    }
                  }}
                >
                  <MenuItem value="all">All Routes ({allGuideReservations.length} bookings)</MenuItem>
                  {routes.map((route) => {
                    const routeBookings = allGuideReservations.filter(res => res.routeId === route.id);
                    if (routeBookings.length === 0) return null;
                    return (
                      <MenuItem key={route.id} value={route.id}>
                        {route.name} ({routeBookings.length} bookings)
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <Typography variant="subtitle1" gutterBottom>
                Select a date to view bookings:
              </Typography>
              
              <Calendar 
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                reservationDates={getReservationDates()}
              />

              {selectedDate && (
                <Alert severity="info" sx={{ 
                  mt: 2, 
                  mb: 2,
                  backgroundColor: '#FFF8E1',
                  border: '1px solid #FFC107',
                  borderRadius: 2,
                  '& .MuiAlert-icon': { color: '#FF8F00' },
                  '& .MuiAlert-message': { color: '#333' }
                }}>
                  Showing bookings for {selectedDate.toLocaleDateString('en-GB')}
                  {selectedRoute !== 'all' && (
                    <span> on route "{routes.find(r => r.id === selectedRoute)?.name}"</span>
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
                  '& .MuiAlert-icon': { color: '#FF8F00' },
                  '& .MuiAlert-message': { color: '#333' }
                }}>
                  You have {allGuideReservations.length} total booking{allGuideReservations.length !== 1 ? 's' : ''}. 
                  Select a date on the calendar to view specific bookings. 
                  Days with bookings are highlighted in yellow.
                </Alert>
              )}

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
                          height: '100%',
                          backgroundColor: '#FFF8E1',
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
                            <Box sx={{ mr: 2, flexShrink: 0 }}>
                              {reservation.routeImage ? (
                                <Avatar 
                                  src= {`http://localhost:8000/${reservation.routeImage}`}
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
                              
                              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                                <PersonIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary" 
                                  sx={{ fontSize: '0.85rem' }}
                                >
                                  Tourist: {reservation.userName || 'Unknown'}
                                </Typography>
                              </Box>

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
                          <Box display="flex" justifyContent="space-between" alignItems="center">
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

        <Dialog
          open={confirmDialog.open}
          onClose={handleCloseConfirmDialog}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(to top, #F4E6B0, #EEEEEE)',
              color: '#333',
              borderRadius: 2,
              border: '2px solid #FFC107',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 'bold' }}>Cancel Reservation</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to cancel this tour? The tourist will be notified.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} color="error">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmCancel}
              variant="outlined"
              sx={{ borderRadius: '12px',
                    textTransform: 'none',
                    bgcolor: '#FFC107',
                    color: '#333',
                    fontSize: '0.80rem',
                    padding: '6px 8px',
                    minWidth: '80px',
                    '&:hover': { bgcolor: '#FFB300' }
                  }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={errorDialog.open}
          onClose={handleCloseErrorDialog}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(to top, #F4E6B0, #EEEEEE)',
              color: '#333',
              borderRadius: 2,
              border: '2px solid #FFC107',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }
          }}
        >
          <DialogTitle sx={{ fontWeight: 'bold' }}>Error</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{errorDialog.message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseErrorDialog}
              variant="contained"
              sx={{ backgroundColor: '#FFC107', color: '#333' }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </SidePanel>
    </Slide>
  );
};

export default GuideRequests;
