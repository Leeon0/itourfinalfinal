import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Avatar,
  Card,
  CardContent,
  Grid,
  Divider,
  Slide,
  Chip,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating
} from '@mui/material';
import {
  Cancel as CancelIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Image as ImageIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { SidePanel } from '../styles/StyledComponents';
import { useReservations } from '../context/ReservationsContext';
import { useAuth } from '../context/AuthContext';

const MyReservations = ({ onClose }) => {
  const { reservations, loading, deleteReservation, submitRating } = useReservations();
  const { isGuide } = useAuth();
  const [showPanel, setShowPanel] = useState(true);
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [ratingDialog, setRatingDialog] = useState({ open: false, reservation: null });
  const [ratingValue, setRatingValue] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Filtrar reservas para mostrar apenas confirmadas ou canceladas
  const filteredReservations = reservations.filter(reservation => 
    reservation.status === 'confirmed' || reservation.status === 'cancelled'
  );

  // Lidar com restrição de acesso para guias
  if (isGuide()) {
    return (
      <Slide in={showPanel} direction="down" timeout={700} mountOnEnter unmountOnExit onExited={onClose}>
        <SidePanel elevation={2} sx={{ height: '90vh', maxHeight: '90vh', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error" gutterBottom>
              Access Denied
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Only tourists can view reservations.
            </Typography>
            <Button onClick={() => setShowPanel(false)} variant="contained" sx={{ backgroundColor: '#FFC107', color: '#333' }}>
              Close
            </Button>
          </Box>
        </SidePanel>
      </Slide>
    );
  }

  const handleCancel = () => {
    setShowPanel(false);
  };

  const handleDeleteReservation = async (reservationId, routeName) => {
    if (!window.confirm(`Are you sure you want to permanently delete the reservation for "${routeName}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingIds(prev => new Set([...prev, reservationId]));
    try {
      await deleteReservation(reservationId);
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Error deleting reservation: ' + error.message);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(reservationId);
        return newSet;
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'cancelled': return 'error';
      case 'pending': 
      default: return 'warning';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'cancelled': return 'Cancelled';
      case 'pending': 
      default: return 'Pending';
    }
  };

  const formatTimeSlot = (selectedHours, totalHours) => {
    if (!selectedHours || selectedHours.length === 0) return 'Time not specified';
    const startTime = selectedHours[0];
    return `${startTime} (${totalHours}h)`;
  };

  // Formatar data no fuso horário WEST (Europa/Lisboa)
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-GB', { timeZone: 'Europe/Lisbon' });
  };

  // Formatar data de criação
  const formatCreatedAt = (createdAt) => {
    if (!createdAt) return 'Date not available';
    const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    return date.toLocaleDateString('en-GB', { timeZone: 'Europe/Lisbon' });
  };

  const handleRatingSubmit = async () => {
    if (ratingValue) {
      try {
        await submitRating(ratingDialog.reservation.id, ratingValue);
        setRatingDialog({ open: false, reservation: null });
        setRatingValue(null);
        setSuccessMessage('Thank you for your feedback!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setErrorMessage('Failed to submit rating. Please try again.');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    }
  };

  const handleRatingClose = () => {
    setRatingDialog({ open: false, reservation: null });
    setRatingValue(null);
  };

  return (
    <Slide in={showPanel} direction="down" timeout={700} mountOnEnter unmountOnExit onExited={onClose}>
      <SidePanel elevation={2} sx={{ height: '90vh', maxHeight: '90vh', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
        <Box sx={{ flex: 1, overflow: 'auto', paddingBottom: '60px' }}>
          <Typography variant="h5" textAlign="center" sx={{ my: 3 }}>
            My Reservations
          </Typography>

          {successMessage && (
            <Alert severity="success" sx={{ mt: 2, mx: 2 }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2, mx: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress sx={{ color: '#FFC107' }} />
            </Box>
          ) : filteredReservations.length === 0 ? (
            <Box textAlign="center" py={4}>
              <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body1" color="text.secondary" fontWeight="medium">
                No reservations found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All your reservations are automatically confirmed when booked!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ px: 2 }}>
              <Typography variant="body1" fontWeight="medium" textAlign="center" sx={{ mb: 2, borderBottom: '1px solid #FFC107', pb: 1 }}>
                {filteredReservations.length} reservation{filteredReservations.length !== 1 ? 's' : ''} found:
              </Typography>

              <Grid container direction="column" alignItems="center" spacing={2}>
                {filteredReservations.map((reservation) => (
                  <Grid item key={reservation.id} sx={{ width: '100%', maxWidth: '400px' }}>
                    <Card
                      elevation={0}
                      sx={{
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 3,
                        backgroundColor: 'transparent',
                        position: 'relative',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      {reservation.status === 'cancelled' && (
                        <IconButton
                          onClick={() => handleDeleteReservation(reservation.id, reservation.routeName)}
                          disabled={deletingIds.has(reservation.id)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            zIndex: 1,
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            color: '#f44336',
                            width: 32,
                            height: 32,
                            '&:hover': {
                              backgroundColor: '#f44336',
                              color: 'white',
                            },
                            '&:disabled': {
                              backgroundColor: 'rgba(0, 0, 0, 0.1)',
                              color: 'rgba(0, 0, 0, 0.3)',
                            }
                          }}
                        >
                          {deletingIds.has(reservation.id) ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : (
                            <CloseIcon fontSize="small" />
                          )}
                        </IconButton>
                      )}

                      <CardContent sx={{ flexGrow: 1 }}>
                        {/* Nome da Rota */}
                        <Typography 
                          variant="h6" 
                          fontWeight="bold" 
                          sx={{ 
                            mb: 2,
                            fontSize: '1.1rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textAlign: 'left',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {reservation.routeName}
                        </Typography>

                        {/* Imagem da Rota */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                          {reservation.routeImage ? (
                            <Avatar 
                              src={reservation.routeImage} 
                              sx={{ 
                                width: 300, 
                                height: 150, 
                                borderRadius: 2,
                                boxShadow: 1
                              }}
                              variant="rounded"
                            />
                          ) : (
                            <Avatar 
                              sx={{ 
                                width: 80, 
                                height: 80, 
                                borderRadius: 2,
                                bgcolor: 'grey.200',
                                boxShadow: 1
                              }}
                              variant="rounded"
                            >
                              <ImageIcon color="disabled" />
                            </Avatar>
                          )}
                        </Box>

                        {/* Guia e Data (Esquerda), Duração (Direita) */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box>
                            {reservation.routeCreatedByName && (
                              <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                                <PersonIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  sx={{ fontSize: '0.85rem' }}
                                >
                                  Guide: {reservation.routeCreatedByName}
                                </Typography>
                              </Box>
                            )}
                            <Box display="flex" alignItems="center">
                              <EventIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ fontSize: '0.85rem' }}
                              >
                                {formatDate(reservation.selectedDate)}
                              </Typography>
                            </Box>
                          </Box>
                          <Box display="flex" alignItems="right">
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

                        {/* Estado e Botões de Avaliação/Eliminar */}
                        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 , mb: 2}}>
                          <Chip 
                            label={getStatusLabel(reservation.status)} 
                            size="small"
                            color={getStatusColor(reservation.status)}
                            sx={{ fontWeight: 'medium' }}
                          />
                          {reservation.status === 'confirmed' && !reservation.rated && (
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{
                                  borderRadius: '12px',
                                  textTransform: 'none',
                                  bgcolor: '#FFC107',
                                  color: '#333',
                                  fontSize: '0.80rem', // Tamanho de fonte menor
                                  padding: '6px 8px',  // Espaçamento menor
                                  minWidth: '80px',    // Largura mínima menor
                                  '&:hover': { bgcolor: '#FFB300' }
                                }}
                              onClick={() => setRatingDialog({ open: true, reservation })}
                            >
                              Rate Guide
                            </Button>
                          )}
                        </Box>

                        {/* Reservado em */}
                        <Typography 
                          variant="caption" 
                          color="text.secondary" 
                          sx={{ 
                            fontSize: '0.75rem',
                            display: 'block',
                            mt: 1,
                            textAlign: 'center',
                            bottom:0
                          }}
                        >
                          Booked on {formatCreatedAt(reservation.createdAt)}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Divider sx={{ my: 2, borderColor: '#FFC107' }} />
                  </Grid>
                ))}
              </Grid>

              {filteredReservations.length > 0 && (
                <Alert 
                  severity="info" 
                  sx={{ 
                    mt: 3, 
                    mx: 2,
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
                  All your reservations are automatically confirmed when booked. You can delete cancelled reservations using the ✕ button.
                </Alert>
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

        <Dialog
          open={ratingDialog.open}
          onClose={handleRatingClose}
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
          <DialogTitle sx={{ fontWeight: 'bold' }}>Rate Your Guide</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              How was your experience with {ratingDialog.reservation?.routeCreatedByName} for {ratingDialog.reservation?.routeName}?
            </Typography>
            <Box display="flex" justifyContent="center" my={2}>
              <Rating
                name="guide-rating"
                value={ratingValue}
                onChange={(event, newValue) => setRatingValue(newValue)}
                precision={1}
                size="large"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRatingClose} color="error">
              Cancel
            </Button>
            <Button
              onClick={handleRatingSubmit}
              variant="contained"
              sx={{ backgroundColor: '#FFC107', color: '#333' }}
              disabled={!ratingValue}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </SidePanel>
    </Slide>
  );
};

export default MyReservations;