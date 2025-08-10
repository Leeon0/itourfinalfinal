import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  List, 
  ListItemText 
} from '@mui/material';
import { SuggestionsContainer, SuggestionItem } from '../styles/StyledComponents';
import { fetchSuggestions } from '../utils/mapUtils';


const MADEIRA_LOCATIONS = [
  { display_name: 'Funchal, Madeira', lat: '32.6669', lon: '-16.9241' },
  { display_name: 'Câmara de Lobos, Madeira', lat: '32.6469', lon: '-16.9744' },
  { display_name: 'Machico, Madeira', lat: '32.7169', lon: '-16.7669' },
  { display_name: 'Santana, Madeira', lat: '32.8019', lon: '-16.8819' },
  { display_name: 'Porto Moniz, Madeira', lat: '32.8669', lon: '-17.1319' },
  { display_name: 'Calheta, Madeira', lat: '32.7219', lon: '-17.1719' },
  { display_name: 'Ribeira Brava, Madeira', lat: '32.6769', lon: '-17.0669' },
  { display_name: 'Ponta do Sol, Madeira', lat: '32.6919', lon: '-17.1019' },
  { display_name: 'Porto Santo, Vila Baleira', lat: '33.0619', lon: '-16.3419' },
  { display_name: 'Curral das Freiras, Madeira', lat: '32.7169', lon: '-16.9919' }
];

const LocationSearch = ({ onLocationSelect, placeholder = "Ex: Funchal, Porto Santo...", disabled = false }) => {
  const [locationName, setLocationName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = async (value) => {
    setLocationName(value);
    
    if (value.length >= 2) {
      console.log('LocationSearch - Buscando sugestões para:', value);
      try {
        const results = await fetchSuggestions(value);
        console.log('LocationSearch - Sugestões encontradas:', results);
        
       
        if (results.length === 0) {
          const filteredLocations = MADEIRA_LOCATIONS.filter(location =>
            location.display_name.toLowerCase().includes(value.toLowerCase())
          );
          console.log('LocationSearch - Usando fallback local:', filteredLocations);
          setSuggestions(filteredLocations);
        } else {
          setSuggestions(results);
        }
        setShowSuggestions(true);
      } catch (error) {
        console.error('LocationSearch - Erro ao buscar sugestões:', error);
       
        const filteredLocations = MADEIRA_LOCATIONS.filter(location =>
          location.display_name.toLowerCase().includes(value.toLowerCase())
        );
        console.log('LocationSearch - Erro, usando fallback:', filteredLocations);
        setSuggestions(filteredLocations);
        setShowSuggestions(true);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);
    const name = suggestion.display_name.split(',')[0];
    
    const location = {
      position: [lat, lon],
      name: name,
      id: Date.now()
    };
    
    onLocationSelect(location);
    setLocationName("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <Box position="relative">
      <TextField
        fullWidth
        value={locationName}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        size="small"
        disabled={disabled}
        onFocus={() => setShowSuggestions(suggestions.length > 0)}
        sx={{ boxSizing: 'border-box' , backgroundColor: '#fff', border:'1px solid rgba(0, 0, 0, 0.23)' ,borderRadius: 4, '& .MuiOutlinedInput-notchedOutline': {
        border:'none'
        },}}
      />
      
      {/* Lista de sugestões */}
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsContainer elevation={2}>
          <List dense>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() => selectSuggestion(suggestion)}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2" fontWeight="medium">
                      {suggestion.display_name}
                    </Typography>
                  }
                  secondary={
                    suggestion.address && (
                      <Typography variant="caption" color="text.secondary">
                        {suggestion.address.city || suggestion.address.town || suggestion.address.village || ''}
                        {suggestion.address.state ? `, ${suggestion.address.state}` : ''}
                      </Typography>
                    )
                  }
                />
              </SuggestionItem>
            ))}
          </List>
        </SuggestionsContainer>
      )}
    </Box>
  );
};

export default LocationSearch;
