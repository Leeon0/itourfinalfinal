import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import ImageUpload from './ImageUpload';
import PasswordRequest from './ForgotPassword';

const AuthForm = () => {
  const { signIn, signUp } = useAuth();
  const [currentView, setCurrentView] = useState('landing');
  const [guideStep, setGuideStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userType: '',
    profileImage: null,
    vehicleBrand: '',
    vehicleModel: '',
    licensePlate: '',
    seatingCapacity: '',
    vehicleColor: '',
    additionalInfo: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 
  const handleNameChange = (fieldName, value) => {
    if (value.length <= 20) {
      setFormData({
        ...formData,
        [fieldName]: value
      });
    }
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (currentView === 'login') {
        result = await signIn(formData.email, formData.password);
      } else {
        
        if (currentView === 'register-guide' && guideStep === 0) {
          if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError('Primeiro nome e último nome são obrigatórios');
            return;
          }
          setGuideStep(1);
          setLoading(false);
          return;
        }
        
        const fullName = currentView === 'register-guide' 
          ? `${formData.firstName} ${formData.lastName}`
          : formData.firstName;
          
        if (!fullName.trim()) {
          setError('Nome é obrigatório');
          return;
        }

        if (currentView === 'register-guide' && guideStep === 1) {
          const licensePlateRegex = /^(?:[A-Z]{2}-\d{2}-[A-Z]{2}|\d{2}-\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2}-\d{2}|\d{2}-[A-Z]{2}-\d{2})$/;
          if (!licensePlateRegex.test(formData.licensePlate)) {
            setError('A matrícula deve seguir o formato AA-01-AA ou 00-AA-00 (ex: AB-12-CD)');
            setLoading(false);
            return;
          }
        }

        if (currentView === 'register-guide' || currentView === 'register-traveler') {
          const password = formData.password || '';

          if (!password || /\s/.test(password)) {
            setError('A palavra-passe não pode estar em branco nem conter espaços.');
            setLoading(false);
            return;
          }
        }

        const vehicleData = currentView === 'register-guide' ? {
          brand: formData.vehicleBrand,
          model: formData.vehicleModel,
          licensePlate: formData.licensePlate,
          seatingCapacity: parseInt(formData.seatingCapacity),
          color: formData.vehicleColor,
          additionalInfo: formData.additionalInfo
        } : null;

        const userType = currentView === 'register-guide' ? 1 : 0;

        result = await signUp(
          formData.email, 
          formData.password, 
          fullName, 
          userType,
          formData.profileImage,
          vehicleData
        );
        
        console.log('Resultado do signUp:', result);
        console.log('UserType enviado:', userType);
        console.log('VehicleData enviado:', vehicleData);
      }

    } catch (err) {
      console.error('Erro no formulário:', err);
      
      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            setError('Este email já está em uso');
            break;
          case 'auth/invalid-email':
            setError('Email inválido');
            break;
          case 'auth/weak-password':
            setError('Senha muito fraca. Use pelo menos 6 caracteres');
            break;
          case 'auth/network-request-failed':
            setError('Erro de rede. Verifique sua conexão');
            break;
          default:
            setError(`Erro: ${err.message}`);
        }
      } else {
        setError('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentView === 'register-guide' && guideStep > 0) {
      setGuideStep(guideStep - 1);
    } else {
      setCurrentView('landing');
      setGuideStep(0);
      setError('');
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      userType: '',
      profileImage: null,
      vehicleBrand: '',
      vehicleModel: '',
      licensePlate: '',
      seatingCapacity: '',
      vehicleColor: '',
      additionalInfo: ''
    });
    setError('');
    setGuideStep(0);
  };

  const pageStyleFixed = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, #F4E6B0, #EEEEEE)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: 2
  };


  const pageStyleScrollable = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, #F4E6B0, #EEEEEE)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 2000,
    padding: 2,
    overflowY: 'auto',
    paddingTop: '80px',
    paddingBottom: '50px'
  };

  const contentContainerStyle = {
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
    color: '#6b7280'
  };

  const Logo = ({ size = 150 }) => (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
      <img 
        src="/itour.png" 
        alt="iTour"
        style={{
          width: size,
          height: 'auto',
          maxWidth: '100%'
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'block';
        }}
      />
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 600, 
          color: '#374151', 
          display: 'none' 
        }}
      >
        iTour
      </Typography>
    </Box>
  );

  if (currentView === 'landing') {
    return (
      <Box sx={pageStyleFixed}>
        <Box sx={contentContainerStyle}>
          {/* Logotipo */}
          <Logo size={180} />

          <Typography variant="h5" sx={{ color: '#374151', lineHeight: 1.3, mb: 6, fontWeight: 500 }}>
            Join in to explore<br />Madeira at it's best!
          </Typography>

          {/* Opção de Guia */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.5, color: '#374151' }}>
              Become a Guide. Lead tours,<br />share local knowledge, and earn!
            </Typography>
            <Button
              onClick={() => {
                resetForm();
                setCurrentView('register-guide');
              }}
              sx={{
                backgroundColor: 'white',
                color: '#374151',
                border: '1px solid #6b7280',
                borderRadius: '12px',
                padding: '12px 24px',
                width: '300px',
                height: '65px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#f9fafb',
                  opacity: 0.8
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' , gap: '15px' }}>
                <span>Register as a Guide</span>
                <span>📖</span>
              </Box>
            </Button>
          </Box>

          {/* Opção de Viajante */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.5, color: '#374151' }}>
              Join as a traveler. Book authentic<br />experiences and explore like a local!
            </Typography>
            <Button
              onClick={() => {
                resetForm();
                setCurrentView('register-traveler');
              }}
              sx={{
                backgroundColor: 'white',
                color: '#374151',
                border: '1px solid #6b7280',
                borderRadius: '12px',
                padding: '12px 24px',
                width: '300px',
                height: '65px',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#f9fafb',
                  opacity: 0.8
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' , gap: '15px' }}>
                <span>Register as a Traveler</span>
                <span>🌍</span>
              </Box>
            </Button>
          </Box>

          {/* Link de Login */}
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Already a member?{' '}
            <Button
              onClick={() => {
                resetForm();
                setCurrentView('login');
              }}
              sx={{
                textDecoration: 'underline',
                fontWeight: 'bold',
                color: '#374151',
                textTransform: 'none',
                padding: 0,
                minWidth: 'auto',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                  color: '#FFC107'
                }
              }}
            >
              Sign in here!
            </Button>
          </Typography>
        </Box>
      </Box>
    );
  }

  if (currentView === 'login') {
    return (
      <Box sx={pageStyleScrollable}>
  {/* Botão de voltar fixo */}
        <Box sx={{ position: 'fixed', top: 20, left: 20, zIndex: 2001 }}>
          <IconButton onClick={handleBack} sx={{ color: '#6b7280' }}>
            <ArrowBackIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>

        <Box sx={contentContainerStyle}>
          {/* Logotipo */}
          <Logo size={150} />

          <Typography variant="h5" sx={{ color: '#374151', lineHeight: 1.3, mb: 6, fontWeight: 500 }}>
            Guided by locals.<br />Driven by adventure!
          </Typography>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                Email Address
              </Typography>
              <TextField
                name="email"
                type="email"
                placeholder="Enter your email."
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white'
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                Password
              </Typography>
              <TextField
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password."
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white'
                  }
                }}
              />
              <Typography variant="caption" onClick={() => setCurrentView('passwordRequest')}
              sx={{ textDecoration: 'underline', color: '#6b7280', mt: 1, display: 'block' , cursor:'pointer'}}>
                Forgot Password?
              </Typography>
            </Box>

            <Button
              type="submit"
              disabled={loading}
              sx={{
                backgroundColor: '#FFC107',
                color: '#374151',
                border: '2px solid #d1d5db',
                borderRadius: '12px',
                padding: '10px 24px',
                width: '100%',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                mb: 6,
                '&:hover': {
                  backgroundColor: '#f9cc33'
                }
              }}
            >
              {loading ? 'Connecting...' : 'Submit'}
            </Button>

            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Not a member?{' '}
              <Button
                onClick={() => setCurrentView('landing')}
                sx={{
                  textDecoration: 'underline',
                  fontWeight: 'bold',
                  color: '#374151',
                  textTransform: 'none',
                  padding: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                    color: '#FFC107'
                  }
                }}
              >
                Register here!
              </Button>
            </Typography>
          </form>
        </Box>
      </Box>
    );
  }

  if (currentView === 'register-guide') {
    return (
      <Box sx={pageStyleScrollable}>
  {/* Botão de voltar fixo */}
        <Box sx={{ position: 'fixed', top: 20, left: 20, zIndex: 2001 }}>
          <IconButton onClick={handleBack} sx={{ color: '#6b7280' }}>
            <ArrowBackIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>

        <Box sx={contentContainerStyle}>
          {/* Logotipo */}
          <Logo size={120} />

          <Typography variant="h6" sx={{ color: '#374151', fontWeight: 600, mb: 1 }}>
            On your way to become a guide!
          </Typography>
          {guideStep === 0 && (
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 4 }}>
              Step 1 out of 2: Personal Information
            </Typography>
          )}
          {guideStep === 1 && (
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 4 }}>
              Step 2 out of 2: Car Information
            </Typography>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                {error}
              </Alert>
            )}

            {guideStep === 0 && (
              <>
                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                    First Name
                  </Typography>
                  <TextField
                    name="firstName"
                    placeholder="Enter your first name."
                    fullWidth
                    value={formData.firstName}
                    onChange={(e) => handleNameChange('firstName', e.target.value)}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white'
                      }
                    }}
                    helperText={`${formData.firstName.length}/20 caracteres`}
                  />
                </Box>

                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                    Last Name
                  </Typography>
                  <TextField
                    name="lastName"
                    placeholder="Enter your last name."
                    fullWidth
                    value={formData.lastName}
                    onChange={(e) => handleNameChange('lastName', e.target.value)}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white'
                      }
                    }}
                    helperText={`${formData.lastName.length}/20 caracteres`}
                  />
                </Box>

                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                    Email Address
                  </Typography>
                  <TextField
                    name="email"
                    type="email"
                    placeholder="Enter your email."
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                    Password
                  </Typography>
                  <TextField
                    name="password"
                    type="password"
                    placeholder="Enter your password."
                    fullWidth
                    value={formData.password}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3}}>
                  <ImageUpload
                    value={formData.profileImage}
                    onChange={(file) => setFormData({...formData, profileImage: file})}
                      label={
                        <Typography variant="body2" sx={{color: '#374151' , textAlign: 'left'}}>
                          Profile Photo (Optional)
                        </Typography>
                      }
                  />
                </Box>
              </>
            )}

            {guideStep === 1 && (
              <>
                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                    Car Brand
                  </Typography>
                  <TextField
                    name="vehicleBrand"
                    placeholder="Enter your car brand."
                    fullWidth
                    value={formData.vehicleBrand}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                    Car Model
                  </Typography>
                  <TextField
                    name="vehicleModel"
                    placeholder="Enter your car model."
                    fullWidth
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                    License Plate Number
                  </Typography>
                  <TextField
                    name="licensePlate"
                    placeholder="Enter your license plate number."
                    fullWidth
                    value={formData.licensePlate}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                    Seating Capacity
                  </Typography>
                  <TextField
                    name="seatingCapacity"
                    type="number"
                    placeholder="Number of seats"
                    fullWidth
                    value={formData.seatingCapacity}
                    onChange={handleChange}
                    required
                    inputProps={{ min: 1, max: 50 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                    Color
                  </Typography>
                  <TextField
                    name="vehicleColor"
                    placeholder="Enter the color of your car."
                    fullWidth
                    value={formData.vehicleColor}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                    Additional Info
                  </Typography>
                  <TextField
                    name="additionalInfo"
                    placeholder="Additional information about your car."
                    fullWidth
                    multiline
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white'
                      }
                    }}
                  />
                </Box>
              </>
            )}

            <Button
              type="submit"
              disabled={loading}
              sx={{
                backgroundColor: '#FFC107',
                color: '#374151',
                border: '2px solid #d1d5db',
                borderRadius: '12px',
                padding: '10px 24px',
                width: '100%',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                mb: 6,
                '&:hover': {
                  backgroundColor: '#f9cc33'
                }
              }}
            >
              {loading ? 'Connecting...' : (guideStep === 0 ? 'Next' : 'Register')}
            </Button>

            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Already a member?{' '}
              <Button
                onClick={() => setCurrentView('login')}
                sx={{
                  textDecoration: 'underline',
                  fontWeight: 'bold',
                  color: '#374151',
                  textTransform: 'none',
                  padding: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign in here!
              </Button>
            </Typography>
          </form>
        </Box>
      </Box>
    );
  }

  if (currentView === 'register-traveler') {
    return (
      <Box sx={pageStyleScrollable}>
  {/* Botão de voltar fixo */}
        <Box sx={{ position: 'fixed', top: 20, left: 20, zIndex: 2001 }}>
          <IconButton onClick={handleBack} sx={{ color: '#6b7280' }}>
            <ArrowBackIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>

        <Box sx={contentContainerStyle}>
          {/* Logotipo */}
          <Logo size={120} />

          <Typography variant="h6" sx={{ color: '#374151', fontWeight: 600, mb: 6 }}>
            Authentic Journeys start here!
          </Typography>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                First Name
              </Typography>
              <TextField
                name="firstName"
                placeholder="Enter your first name."
                fullWidth
                value={formData.firstName}
                onChange={(e) => handleNameChange('firstName', e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white'
                  }
                }}
                helperText={`${formData.firstName.length}/20 caracteres`}
              />
            </Box>

            <Box sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                Email Address
              </Typography>
              <TextField
                name="email"
                type="email"
                placeholder="Enter your email."
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white'
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                Password
              </Typography>
              <TextField
                name="password"
                type="password"
                placeholder="Enter your password."
                fullWidth
                value={formData.password}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'white'
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <ImageUpload
                value={formData.profileImage}
                onChange={(file) => setFormData({...formData, profileImage: file})}
                label="Profile Photo (Optional)"
              />
            </Box>

            <Button
              type="submit"
              disabled={loading}
              sx={{
                backgroundColor: '#FFC107',
                color: '#374151',
                border: '2px solid #d1d5db',
                borderRadius: '12px',
                padding: '10px 24px',
                width: '100%',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                mb: 6,
                '&:hover': {
                  backgroundColor: '#f9cc33'
                }
              }}
            >
              {loading ? 'Connecting...' : 'Register'}
            </Button>

            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Already a member?{' '}
              <Button
                onClick={() => setCurrentView('login')}
                sx={{
                  textDecoration: 'underline',
                  fontWeight: 'bold',
                  color: '#374151',
                  textTransform: 'none',
                  padding: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign in here!
              </Button>
            </Typography>
          </form>
        </Box>
      </Box>
    );
  }
  if (currentView === 'passwordRequest') {
  return (
    <PasswordRequest onBack={() => setCurrentView('login')} />
  );
}

  return null;
};

export default AuthForm;
