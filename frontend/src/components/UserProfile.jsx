import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Avatar,
  Chip,
  TextField,
  Alert,
  Card,
  CardContent,
  Divider,
  Stack,
  Slide
} from '@mui/material';
import { 
  Person as PersonIcon,
  DirectionsCar as CarIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { SidePanel } from '../styles/StyledComponents';
import { useAuth } from '../context/AuthContext';
import ImageUpload from './ImageUpload';
  

const UserProfile = ({ onClose }) => {
  const { user, userProfile, isGuide, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [visible, setVisible] = useState(true);
  
  console.log('UserProfile - userProfile:', userProfile);
  console.log('UserProfile - userProfile.vehicleData:', userProfile?.vehicleData);  
  
  const [editData, setEditData] = useState({
    name: userProfile?.name || '',
    profileImage: userProfile?.profileImage || null,
    vehicle: {
      brand: userProfile?.vehicleData?.brand || '',
      model: userProfile?.vehicleData?.model || '',
      licensePlate: userProfile?.vehicleData?.licensePlate || '',
      seatingCapacity: userProfile?.vehicleData?.seatingCapacity || '',
      color: userProfile?.vehicleData?.color || '',
      additionalInfo: userProfile?.vehicleData?.additionalInfo || ''
    }
  });

  const handleChange = (field, value) => {
    if (field.startsWith('vehicle.')) {
      const vehicleField = field.split('.')[1];
      setEditData(prev => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [vehicleField]: value
        }
      }));
    } else {
      setEditData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      
      const updateData = {
        name: editData.name,
        profileImage: editData.profileImage
      };

      if (isGuide()) {
        updateData.vehicleData = { 
          ...editData.vehicle,
          seatingCapacity: parseInt(editData.vehicle.seatingCapacity) || 0
        };
      }

      await updateUserProfile(updateData);
      setSuccess('Perfil atualizado com sucesso!');
      setIsEditing(false);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setError('Erro ao atualizar perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseWithSlide = () => {
  setVisible(false);
  setTimeout(() => {
    onClose();
  }, 700);
};

  const handleCancel = () => {
    setEditData({
      name: userProfile?.name || '',
      profileImage: userProfile?.profileImage || null,
      vehicle: {
        brand: userProfile?.vehicleData?.brand || '', 
        model: userProfile?.vehicleData?.model || '', 
        licensePlate: userProfile?.vehicleData?.licensePlate || '', 
        seatingCapacity: userProfile?.vehicleData?.seatingCapacity || '', 
        color: userProfile?.vehicleData?.color || '', 
        additionalInfo: userProfile?.vehicleData?.additionalInfo || '' 
      }
    });
    setIsEditing(false);
    setError('');
  };

  return (
    <Slide direction="down" in={visible} timeout={700} mountOnEnter unmountOnExit>
      <SidePanel elevation={3} sx={{
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
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Card elevation={0} sx={{ mb: 3, backgroundColor: 'transparent', width: '100%'}}>
        <CardContent sx={{ padding: 0 }}>
          {/* Header do perfil */}
          <Box sx={{ mb: 3, mt: 3 }}>
            {isEditing ? (
              <Box>
                {/* Foto de perfil - centralizada */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <ImageUpload
                    value={editData.profileImage}
                    onChange={(base64) => handleChange('profileImage', base64)}
                    label="Profile Picture"
                    circular
                  />
                </Box>
                
                {/* Campo de nome */}
                <TextField
                  fullWidth
                  label="Nome"
                  value={editData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  sx={{ mb: 2, borderRadius: '12px'}}
                />
              </Box>
            ) : (
              <Box display="flex" alignItems="center" sx={{ mb: 3 }}>
                <Box sx={{ mr: 3, flexShrink: 0 }}>
                  {(userProfile?.profileImage || userProfile?.profile_image) ? (
                    <Avatar 
                      src={userProfile.profileImage || userProfile.profile_image} 
                      sx={{ width: 80, height: 80 }}
                    />
                  ) : (
                    <Avatar 
                      sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}
                    >
                      <PersonIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                  )}
                </Box>
                
                <Box flex={1} sx={{ minWidth: 0 }}>
                  <Typography 
                    variant="h5" 
                    fontWeight="bold"
                    sx={{ 
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {userProfile?.name || 'Nome não definido'}
                  </Typography>
                  
                  <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                    <EmailIcon fontSize="small" color="action" sx={{ mr: 0.5, flexShrink: 0 }} />
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {user?.email}
                    </Typography>
                  </Box>

                  {/* Data de criação da conta */}
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 1, 
                      display: 'block',
                      wordBreak: 'break-word'
                    }}
                  >
                    Member since {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
                  </Typography>
                  
                  <Chip
                    label={isGuide() ? 'Guide' : 'Tourist'}
                    size="small"
                    sx={{
                      backgroundColor: '#FFC107',
                      color: '#000',
                      fontWeight: 'medium',
                      '& .MuiChip-label': {
                        color: '#000'
                      }
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>

          {/* Informações do veículo (apenas para guias) */}
          {isGuide() && (
            <>
              
              <Box>

                {isEditing ? (
                  // ...existing code...
                  <Stack spacing={3}>
                    {/* ...campos de edición... */}
                  </Stack>
                ) : (
                  <Box>
                    {/* Mostrar datos del vehículo si existen en vehicleData o directamente en userProfile */}
                    {(() => {
                      // Prioridad: vehicleData, luego campos directos
                      const v = userProfile?.vehicleData || userProfile;
                      const hasVehicle = v && (v.brand || v.model || v.licensePlate || v.color || v.seatingCapacity || v.additionalInfo);
                      if (hasVehicle) {
                        return (
                          <Box sx={{ 
                            backgroundColor: 'rgba(250, 213, 64, 0.1)', 
                            borderRadius: 2, 
                            p: 3,
                            border: '1px solid rgba(250, 213, 64, 0.3)'
                          }}>
                            {/* Título do veículo */}
                            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                              <CarIcon sx={{ mr: 1, color: 'black', fontSize: 33 }} />
                              <Typography variant="h6" fontWeight="bold" sx={{ color: '#333' }}>
                                {v.brand && v.model 
                                  ? `${v.brand} ${v.model}`
                                  : v.brand || v.model || 'Vehicle'
                                }
                              </Typography>
                            </Box>
                            {/* Chips de informações principais */}
                            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                              {v.seatingCapacity && (
                                <Chip 
                                  label={`${v.seatingCapacity} seats`} 
                                  size="medium"
                                  icon={<PersonIcon />}
                                  sx={{
                                    backgroundColor: '#FFC107',
                                    color: '#000',
                                    fontWeight: 'medium'
                                  }}
                                />
                              )}
                              {v.color && (
                                <Chip 
                                  label={v.color} 
                                  size="medium"
                                  sx={{
                                    backgroundColor: '#333',
                                    color: '#fff',
                                    fontWeight: 'medium'
                                  }}
                                />
                              )}
                              {v.licensePlate && (
                                <Chip 
                                  label={v.licensePlate} 
                                  size="medium"
                                  sx={{
                                    backgroundColor: '#f5f5f5',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    border: '2px solid #333'
                                  }}
                                />
                              )}
                            </Stack>
                            {/* Informações adicionais */}
                            {v.additionalInfo && (
                              <Box sx={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                                borderRadius: 1, 
                                p: 2,
                                mt: 2
                              }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                  "{v.additionalInfo}"
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        );
                      } else {
                        return (
                          <Box sx={{ 
                            textAlign: 'center', 
                            py: 4,
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: 2,
                            border: '1px dashed #ccc'
                          }}>
                            <CarIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                            <Typography variant="body1" color="text.secondary" fontWeight="medium">
                              No vehicle information available
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Click "Edit Profile" to add your vehicle details
                            </Typography>
                          </Box>
                        );
                      }
                    })()}
                  </Box>
                )}
              </Box>
            </>
          )}

        </CardContent>
      </Card>

      {/* Botões de ação */}
      
      {isEditing ? (
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button
            onClick={handleSave}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={loading}
            fullWidth
            sx={{
              borderRadius:4 ,
              backgroundColor: '#FFC107',
              color: '#000',
              '&:hover': {
                backgroundColor: '#F5C842'
              },
              '&:disabled': {
                backgroundColor: '#E0E0E0',
                color: '#666'
              }
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            onClick={handleCancel}
            variant="outlined"
            
            fullWidth
            sx={{
              borderRadius:4 ,
              borderColor: '#f44336',
              color: '#f44336',
              '&:hover': {
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(244, 67, 54, 0.04)'
              }
            }}
          >
            Back
          </Button>
        </Stack>
      ) : (
        <Button
          onClick={() => setIsEditing(true)}
          fullWidth
          startIcon={<EditIcon />}
          sx={{
                  backgroundColor: '#FFC107',
                  color: '#000',
                  borderRadius: 4,
                  mb: 8,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#F5C842'
                  }
                }}
          
        >
          Edit Profile
        </Button>
      )}
    </Box>
      <Button
        onClick={handleCloseWithSlide}
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

export default UserProfile;