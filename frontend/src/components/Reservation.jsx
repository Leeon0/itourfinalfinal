import React, { useState, useEffect } from 'react';
import {
  Slide,
  Box,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  Divider
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { SidePanel } from '../styles/StyledComponents';
import { useReservations } from '../context/ReservationsContext';
import { useAuth } from '../context/AuthContext';

const allHours = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

const Calendar = ({ selectedDate, onDateSelect, occupiedDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const today = new Date();
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
  
  const isPastDate = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  const isOccupied = (date) => {
    if (!date) return false;
    return occupiedDates.includes(formatDate(date));
  };
  
  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return formatDate(date) === formatDate(selectedDate);
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
          const isPast = isPastDate(date);
          const occupied = isOccupied(date);
          const selected = isSelected(date);
          const disabled = isEmpty || isPast || occupied;
          
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
                borderColor: selected ? '#FFC107' : 'transparent',
                bgcolor: selected ? '#FFC107' : 'transparent',
                color: selected ? '#000' : 
                       disabled ? '#ccc' : 
                       '#444',
                fontWeight: selected ? 'bold' : 'normal',
                '&:hover': {
                  bgcolor: selected ? '#FFC107' : 
                           disabled ? 'transparent' : 
                           'rgba(250, 213, 64, 0.1)',
                  borderColor: selected ? '#FFC107' : 
                              disabled ? 'transparent' : 
                              'rgba(250, 213, 64, 0.3)',
                },
                '&:disabled': {
                  color: '#ccc',
                  bgcolor: 'transparent',
                  borderColor: 'transparent',
                }
              }}
            >
              {date ? date.getDate() : ''}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

const Reservation = ({ onClose, route, onReservationComplete }) => {
  const { addReservation, getAllReservations } = useReservations();
  const { userProfile, isGuide } = useAuth();
  const [showPanel, setShowPanel] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartHour, setSelectedStartHour] = useState(''); // ✅ Mudança: apenas uma hora de início
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [occupiedDates, setOccupiedDates] = useState([]);
  const [occupiedHours, setOccupiedHours] = useState({});
  const [reservedHours, setReservedHours] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false);

  // Analisar a duração da rota para obter o número de horas
  const durationHours = parseInt(route.duration, 10) || 1; // Valor padrão 1 se duração inválida

  // Procurar reservas existentes para esta rota
  const fetchRouteReservations = async () => {
    try {
      setLoadingReservations(true);
      const allReservations = await getAllReservations();
      
  // Filtrar apenas reservas confirmadas ou pendentes para esta rota
      const routeReservations = allReservations.filter(reservation => 
        reservation.routeId === route.id && 
        (reservation.status === 'confirmed' || reservation.status === 'pending')
      );

  // Criar lista de datas ocupadas e horas por data
      const occupied = [];
      const hoursByDate = {};

      routeReservations.forEach(reservation => {
        const date = reservation.selectedDate;
        
  // Adicionar às horas ocupadas por data
        if (!hoursByDate[date]) {
          hoursByDate[date] = [];
        }
        hoursByDate[date].push(...reservation.selectedHours);
        
  // Se todas as horas estiverem ocupadas, marcar a data como totalmente ocupada
        const uniqueHours = [...new Set(hoursByDate[date])];
        if (uniqueHours.length >= allHours.length) {
          occupied.push(date);
        }
      });

      setOccupiedDates(occupied);
      setOccupiedHours(hoursByDate);
      
  // Se houver uma data selecionada, atualizar as horas reservadas
      if (selectedDate) {
        const dateStr = formatDate(selectedDate);
        setReservedHours(hoursByDate[dateStr] || []);
      }
      
    } catch (error) {
      console.error('Erro ao buscar reservas da rota:', error);
      setError('Erro ao carregar disponibilidade. Tente novamente.');
    } finally {
      setLoadingReservations(false);
    }
  };

  useEffect(() => {
    if (route?.id) {
      fetchRouteReservations();
    }
  }, [route?.id]);

  // Recarregar reservas a cada 10 segundos
  useEffect(() => {
    if (!route?.id) return;

    const interval = setInterval(() => {
      fetchRouteReservations();
    }, 10000);

    return () => clearInterval(interval);
  }, [route?.id]);

  // Verificar se é turista
  if (isGuide()) {
    return (
      <Slide in={showPanel} direction="right" timeout={500} mountOnEnter unmountOnExit onExited={onClose}>
        <SidePanel elevation={3} sx={{ width: 380, height: '90vh', display: 'flex', flexDirection: 'column', borderRadius: 3, top: '5vh', right: 0, zIndex: 1500, bgcolor: 'background.paper' }}>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error" gutterBottom>
              Access Denied
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Only tourists can make reservations.
            </Typography>
            <Button onClick={onClose} variant="contained" sx={{ backgroundColor: '#FFC107', color: '#333' }}>
              Close
            </Button>
          </Box>
        </SidePanel>
      </Slide>
    );
  }

  const handleClose = () => setShowPanel(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  setSelectedStartHour(''); // ✅ Reset apenas a hora de início
    setError('');
    
  // Atualizar horas reservadas para a nova data
    const dateStr = formatDate(date);
    setReservedHours(occupiedHours[dateStr] || []);
  };

  // ✅ NOVA FUNÇÃO: Verificar se uma hora de início é válida
  const isStartHourAvailable = (startHour) => {
    const startIndex = allHours.indexOf(startHour);
    
  // Verificar se há horas suficientes disponíveis consecutivas
    for (let i = 0; i < durationHours; i++) {
      const hourIndex = startIndex + i;
      const hour = allHours[hourIndex];
      
  // Se não existir a hora ou estiver reservada, não é válida
      if (!hour || reservedHours.includes(hour)) {
        return false;
      }
    }
    return true;
  };

  // ✅ NOVA FUNÇÃO: Obter todas as horas que serão ocupadas
  const getOccupiedHours = (startHour) => {
    const startIndex = allHours.indexOf(startHour);
    const occupiedHours = [];
    
    for (let i = 0; i < durationHours; i++) {
      const hour = allHours[startIndex + i];
      if (hour) {
        occupiedHours.push(hour);
      }
    }
    return occupiedHours;
  };

  const handleStartHourChange = (hour) => {
    if (isStartHourAvailable(hour)) {
      setSelectedStartHour(hour);
      setError('');
    } else {
      setError(`Cannot start at ${hour}. Not enough consecutive hours available for this ${durationHours}-hour route.`);
    }
  };

  const handleReserve = async () => {
    if (!selectedDate) {
      setError('Please select a date to reserve');
      return;
    }
    if (!selectedStartHour) {
      setError('Please select a start time for your reservation.');
      return;
    }

    setLoading(true);
    setError('');

    try {
  // Verificar disponibilidade antes de fazer a reserva
      await fetchRouteReservations();
      
  // Verificar se a hora de início ainda está disponível
      if (!isStartHourAvailable(selectedStartHour)) {
        setError(`Sorry, ${selectedStartHour} is no longer available. Please select a different time.`);
        setSelectedStartHour('');
        return;
      }

  // ✅ Obter todas as horas que serão ocupadas
      const hoursToReserve = getOccupiedHours(selectedStartHour);
      
      await addReservation(route, formatDate(selectedDate), hoursToReserve);
      
  // Feedback de sucesso
      const endTime = allHours[allHours.indexOf(selectedStartHour) + durationHours - 1];
      alert(`Reservation confirmed!\nRoute: ${route.name}\nDate: ${formatDate(selectedDate)}\nTime: ${selectedStartHour} - ${endTime}\nDuration: ${durationHours} hour(s)`);
      
  // Resetar e fechar
      setSelectedDate(null);
      setSelectedStartHour('');
      setShowPanel(false);
      
      if (onReservationComplete) {
        onReservationComplete();
      }
    } catch (error) {
      console.error('Error making reservation:', error);
      setError(error.message || 'Failed to make reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ NOVA FUNÇÃO: Contar blocos de tempo disponíveis
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return 0;
    
    let availableSlots = 0;
    for (let i = 0; i <= allHours.length - durationHours; i++) {
      const startHour = allHours[i];
      if (isStartHourAvailable(startHour)) {
        availableSlots++;
      }
    }
    return availableSlots;
  };

  return (
    <Slide
      in={showPanel}
      direction="right"
      timeout={500}
      mountOnEnter
      unmountOnExit
      onExited={onClose}
    >
      <SidePanel
        elevation={3}
        sx={{
          width: 400,
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          top: '5vh',
          right: 0,
          zIndex: 1500,
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ 
          p: 2, 
          flex: 1, 
          overflowY: 'auto',
          maxHeight: '100%',
          '&::-webkit-scrollbar': { display: 'none' }, 
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            Make a Reservation
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box>
            {/* Nome da Rota */}
            <Typography variant="h6" sx={{ mb: 1 }}>
              {route.name}
            </Typography>

            {/* Imagem da Rota */}
            {route.routeImageBase64 && (
              <Box
                component="img"
                src={route.routeImageBase64}
                alt="Route"
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 2,
                }}
              />
            )}

            {/* Locais da Rota */}
            {route.locations && route.locations.length > 0 && (
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ maxHeight: '120px', overflow: 'hidden', pr: 1 }}>
                  {route.locations.slice(0, 6).map((location, index) => (
                    <Box key={index} display="flex" alignItems="center" sx={{ mb: 0.3 }}>
                      <Box
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          backgroundColor: '#FFC107',
                          mr: 0.7,
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
                  {route.locations.length > 6 && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: '0.7rem', fontStyle: 'italic' }}
                    >
                      +{route.locations.length - 6} more...
                    </Typography>
                  )}
                </Box>

                {route.duration && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    ⏱ {route.duration}
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Select a date:
          </Typography>

          {/* Componente de Calendário */}
          <Calendar 
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            occupiedDates={occupiedDates}
          />

          {/* ✅ NOVA informação sobre disponibilidade */}
          {selectedDate && (
            <Alert 
              severity={getAvailableTimeSlots() > 0 ? "info" : "warning"} 
               sx={{ 
                    mt: 3, 
                    
                    backgroundColor: '#FFF8E1',
                    border: '1px solid #FFC107',
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      color: '#FF8F00'
                    },
                    '& .MuiAlert-message': {
                      color: '#333'
                    }
                  }}

            >
              {getAvailableTimeSlots() > 0 
                ? `${getAvailableTimeSlots()} time slot(s) available on ${selectedDate.toLocaleDateString('en-GB')} for this ${durationHours}-hour route.`
                : `No time slots available on ${selectedDate.toLocaleDateString('en-GB')} for this ${durationHours}-hour route.`
              }
            </Alert>
          )}

          <Divider sx={{ my: 2, borderColor: '#FFC107' }} />

          {/* ✅ NOVA interface para seleção de hora de início */}
          <Typography variant="subtitle1" gutterBottom>
            Select start time (Duration: {durationHours} hour{durationHours > 1 ? 's' : ''}):
          </Typography>

          {loadingReservations ? (
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress size={24} sx={{ color: '#FFC107' }} />
            </Box>
          ) : (
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              mb: 2,
            }}>
              {allHours.map((hour) => {
                const isAvailable = isStartHourAvailable(hour);
                const isSelected = selectedStartHour === hour;
                const endHourIndex = allHours.indexOf(hour) + durationHours - 1;
                const endHour = allHours[endHourIndex];
                
                return (
                  <Button
                    key={hour}
                    onClick={() => isAvailable && handleStartHourChange(hour)}
                    disabled={!isAvailable}
                    variant={isSelected ? "contained" : "outlined"}
                    sx={{
                      textTransform: 'none',
                      fontSize: '0.7rem',
                      height: 50,
                      borderRadius: 2,
                      border: '2px solid #FFC107 !important',
                      color: !isAvailable ? '#ccc !important' : isSelected ? '#000' : '#444',
                      backgroundColor: !isAvailable ? '#f5f5f5 !important' : isSelected ? '#FFC107' : 'transparent',
                      fontWeight: isSelected ? 500 : 400,
                      flexDirection: 'column',
                      padding: '4px',
                      '&:hover': {
                        bgcolor: !isAvailable ? '#f5f5f5 !important' : isSelected ? '#FFC107' : '#fff9db',
                        borderColor: '#FFC107',
                      },
                      '&.Mui-disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed'
                      }
                    }}
                  >
                    <Typography component="span" sx={{ fontSize: '0.75rem', lineHeight: 1, fontWeight: 'bold' }}>
                      {hour}
                    </Typography>
                    {endHour && (
                      <Typography 
                        component="span" 
                        sx={{ 
                          fontSize: '0.55rem', 
                          color: isSelected ? '#000' : !isAvailable ? '#999' : '#666',
                          lineHeight: 1,
                          mt: 0.2
                        }}
                      >
                        to {endHour}
                      </Typography>
                    )}
                    {!isAvailable && (
                      <Typography 
                        component="span" 
                        sx={{ 
                          fontSize: '0.5rem', 
                          color: '#999',
                          lineHeight: 1,
                          mt: 0.2
                        }}
                      >
                        Unavailable
                      </Typography>
                    )}
                  </Button>
                );
              })}
            </Box>
          )}

          {/* ✅ Mostrar as horas que serão ocupadas */}
          {selectedStartHour && (
            <Alert severity="success" sx={{ mb: 2, fontSize: '0.8rem' }}>
              Selected time slot: {selectedStartHour} to {allHours[allHours.indexOf(selectedStartHour) + durationHours - 1]}
              <br />
              This will reserve {durationHours} hour(s): {getOccupiedHours(selectedStartHour).join(', ')}
            </Alert>
          )}

          {reservedHours.length > 0 && (
            <Alert severity="info"  sx={{ 
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
                  }}
>
              Hours already reserved for this date: {reservedHours.join(', ')}
            </Alert>
          )}

          {/* Legenda */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, fontSize: '0.75rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#FFC107', borderRadius: 1, mr: 0.5 }} />
              <Typography variant="caption">Available</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 12, height: 12, bgcolor: '#f5f5f5', border: '1px solid #ddd', borderRadius: 1, mr: 0.5 }} />
              <Typography variant="caption">Unavailable</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleReserve}
            disabled={!selectedDate || !selectedStartHour || loading}
            sx={{ 
              borderRadius: '12px', 
              textTransform: 'none', 
              bgcolor: '#FFC107', 
              color: '#333', 
              fontSize: '1rem', 
              mb: 7,
              '&:hover': { bgcolor: '#FFB300' },
              '&:disabled': { bgcolor: 'transparent', color: '#666', border: '1px solid #FFC107'}
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#FFC107' }} /> : 'Reserve'}
          </Button>

          <Button
            onClick={handleClose}
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
            disabled={loading}
          >
            Close
          </Button>
        </Box>
      </SidePanel>
    </Slide>
  );
};

export default Reservation;