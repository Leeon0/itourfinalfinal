import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, TextField, Button, Alert, Chip, Stack,
  IconButton, Slide
} from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { SidePanel, PointsList, PointItem, RemoveButton } from '../styles/StyledComponents';
import LocationSearch from './LocationSearch';
import ImageUpload from './ImageUpload';
import { useAuth } from '../context/AuthContext';
import { useRoutes } from '../context/RoutesContext';

const RouteForm = ({ onClose }) => {
  const { isGuide, loading, user } = useAuth();
  const { fetchRoutes } = useRoutes();

  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [baseLocation, setBaseLocation] = useState(null);
  const [duration, setDuration] = useState("");
  const [routeImage, setRouteImage] = useState(null);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [showPanel, setShowPanel] = useState(true);

  const handleDurationChange = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    setDuration(numbers === '' ? '' : Math.min(parseInt(numbers), 24).toString());
  };

  const handleRouteNameChange = (value) => {
    if (value.length <= 50) setRouteName(value);
  };

  const handleDescriptionChange = (value) => {
    if (value.length <= 80) setRouteDescription(value);
  };

  const handleLocationSelect = (location) => {
    if (locations.length >= 10) {
      setError("Maximum of 10 locations reached");
      return;
    }
    setLocations(prev => [...prev, location]);
    setError("");
  };

  const removeLocation = (index) => {
    setLocations(prev => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setShowPanel(false);
  };

  const handleSubmit = async () => {
    if (!routeName.trim() || !baseLocation || !duration.trim() || locations.length < 1) {
      setError("All fields are required.");
      return;
    }

    setFormLoading(true);
    try {
  // Transformar baseLocation e locations para formato normalizado
      const normalizedBaseLocation = baseLocation
        ? {
            id: baseLocation.id,
            name: baseLocation.name,
            latitude: baseLocation.position[0],
            longitude: baseLocation.position[1],
            category: baseLocation.category || null
          }
        : null;

      const normalizedLocations = locations.map(loc => ({
        id: loc.id,
        name: loc.name,
        latitude: loc.position[0],
        longitude: loc.position[1],
        category: loc.category || null
      }));

      const formData = new FormData();
      formData.append('name', routeName.trim());
      formData.append('description', routeDescription.trim());
      formData.append('baseLocation', JSON.stringify(normalizedBaseLocation));
      formData.append('duration', duration);
      formData.append('locations', JSON.stringify(normalizedLocations));
      //formData.append('color', `#${Math.floor(Math.random() * 16777215).toString(16)}`);
      formData.append('createdBy', user.id);

      if (routeImage) { formData.append('routeImage', routeImage) };

      await axios.post('http://localhost:8000/routes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      await fetchRoutes();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Error creating route: ' + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <SidePanel elevation={3}>
        <Box display="flex" justifyContent="center" alignItems="center" p={3}>
          <Typography>Loading...</Typography>
        </Box>
      </SidePanel>
    );
  }

  if (!isGuide()) {
    return (
      <SidePanel elevation={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">Acesso Restrito</Typography>
          <Button onClick={onClose} color="secondary"><CloseIcon /></Button>
        </Box>
        <Alert severity="warning">Only guides may create routes.</Alert>
        <Button onClick={onClose} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Fechar</Button>
      </SidePanel>
    );
  }

  return (
    <Slide in={showPanel} direction="down" timeout={700} mountOnEnter unmountOnExit onExited={onClose}>
      <SidePanel elevation={3} sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', maxHeight: '90vh', overflow: 'hidden', borderRadius: 4 }}>
        <Box sx={{ width: '100%', maxWidth: 350, mx: 'auto', py: 3, maxHeight: '80vh', overflowY: 'auto', '&::-webkit-scrollbar': { width: '1px' } }}>
          <Box display="flex" justifyContent="center" alignItems="center"><Typography variant="h5" mb={4}>New Route</Typography></Box>

          {error && <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>{error}</Alert>}

          <TextField fullWidth placeholder="Route Name" value={routeName} onChange={(e) => handleRouteNameChange(e.target.value)} size="small" disabled={formLoading} helperText={`${routeName.length}/50 characters`} sx={{ mb: 2 }} />

          <TextField fullWidth placeholder="Description" value={routeDescription} onChange={(e) => handleDescriptionChange(e.target.value)} size="small" multiline rows={2} disabled={formLoading} helperText={`${routeDescription.length}/80 characters`} sx={{ mb: 2 }} />

          <TextField fullWidth placeholder="Ex: 1, 2, 3" value={duration} onChange={(e) => handleDurationChange(e.target.value)} size="small" disabled={formLoading} helperText="Enter only numbers (saved as Xh)" sx={{ mb: 2 }} />

          <ImageUpload onImageSelect={(file) => setRouteImage(file)} selectedImage={routeImage} placeholder="Upload route image" showPreview={true} />

          <Typography variant="body1" fontWeight="medium" sx={{ mt: 2 }}>Base Location</Typography>
          {!baseLocation ? (
            <LocationSearch onLocationSelect={setBaseLocation} placeholder="Choose a base location" disabled={formLoading} />
          ) : (
            <Box sx={{ mb: 2, p: 1, backgroundColor: 'white', borderRadius: '12px', border: '1px solid #d1d5db', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
              <Box sx={{ display: 'inline-block' }}>
                <Typography variant="body2" fontWeight="medium">📍 {baseLocation.name}</Typography>
                <Typography variant="caption" color="text.secondary">{baseLocation.position[0].toFixed(4)}, {baseLocation.position[1].toFixed(4)}</Typography>
              </Box>
              <IconButton size="small" onClick={() => setBaseLocation(null)} sx={{ color: 'error.main', position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }} disabled={formLoading}><DeleteIcon fontSize="small" /></IconButton>
            </Box>
          )}

          <Typography variant="body1" fontWeight="medium">Add Stops</Typography>
          <LocationSearch onLocationSelect={handleLocationSelect} placeholder="Look for a stop." disabled={formLoading} />

          {locations.length > 0 && (
            <PointsList>
              {locations.map((location, index) => (
                <PointItem key={location.id || index} elevation={1}>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">{index + 1}. {location.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{location.position[0].toFixed(4)}, {location.position[1].toFixed(4)}</Typography>
                  </Box>
                  <RemoveButton onClick={() => removeLocation(index)} size="small" disabled={formLoading}><CloseIcon fontSize="small" /></RemoveButton>
                </PointItem>
              ))}
            </PointsList>
          )}

          <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 2 }}>
            <Chip label={`${locations.length} ${locations.length === 1 ? 'Stop' : 'Stops'}`} color={locations.length >= 1 ? "success" : "default"} size="small" />
            {routeName && <Chip label="Name defined" color="success" size="small" />}
            {baseLocation && <Chip label="Location defined" color="success" size="small" />}
            {duration && <Chip label="Duration defined" color="success" size="small" />}
            {routeImage && <Chip label="Photo added" color="success" size="small" />}
          </Stack>

          <Button onClick={handleSubmit} variant="contained" fullWidth disabled={!routeName.trim() || !baseLocation || !duration.trim() || locations.length < 1 || formLoading} sx={{ borderRadius: '12px', textTransform: 'none', bgcolor: '#FFC107', color: '#333', fontSize: '1rem', '&:hover': { bgcolor: '#FFB300' } }}>
            {formLoading ? 'Criando...' : 'Create Route'}
          </Button>

          <Box sx={{ mt: 4 }}>
            <Button onClick={handleCancel} fullWidth sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'transparent', backdropFilter: 'blur(5px)', borderTop: '1px solid #FFC107', p: 2, color: '#f44336', fontWeight: 600, borderRadius: 0, '&:hover': { backgroundColor: '#f44336', color: 'white' } }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </SidePanel>
    </Slide>
  );
};

export default RouteForm;
