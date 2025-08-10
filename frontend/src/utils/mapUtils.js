import { MADEIRA_BOUNDS, ROUTING_API, GEOCODING_API } from './constants';

export const calculateRoute = async (markersList) => {
  if (markersList.length < 2) {
    return [];
  }

  try {
    const coordinates = markersList.map(marker => [marker[1], marker[0]]);
    
    const response = await fetch(ROUTING_API.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        'Authorization': ROUTING_API.apiKey,
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        coordinates: coordinates
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.routes && data.routes[0]) {
        const routePoints = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        return routePoints;
      }
    } else {
      return markersList;
    }
  } catch (error) {
    console.error('Erro ao calcular rota:', error);
    return markersList;
  }
};

export const fetchSuggestions = async (query) => {
  if (query.length < 2) {
    return [];
  }

  try {
    const bbox = `${MADEIRA_BOUNDS[0][1]},${MADEIRA_BOUNDS[0][0]},${MADEIRA_BOUNDS[1][1]},${MADEIRA_BOUNDS[1][0]}`;
    
    const res = await fetch(
      `${GEOCODING_API.url}?format=json&q=${encodeURIComponent(
        query
      )}&limit=8&addressdetails=1&bounded=1&viewbox=${bbox}&countrycodes=pt`
    );
    const data = await res.json();
    
    const filteredSuggestions = data.filter(suggestion => {
      const lat = parseFloat(suggestion.lat);
      const lon = parseFloat(suggestion.lon);
      return lat >= MADEIRA_BOUNDS[0][0] && lat <= MADEIRA_BOUNDS[1][0] && 
             lon >= MADEIRA_BOUNDS[0][1] && lon <= MADEIRA_BOUNDS[1][1];
    });
    
    return filteredSuggestions;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const geocodeLocation = async (locationName) => {
  try {
    const bbox = `${MADEIRA_BOUNDS[0][1]},${MADEIRA_BOUNDS[0][0]},${MADEIRA_BOUNDS[1][1]},${MADEIRA_BOUNDS[1][0]}`;
    
    const res = await fetch(
      `${GEOCODING_API.url}?format=json&q=${encodeURIComponent(
        locationName
      )}&bounded=1&viewbox=${bbox}&countrycodes=pt`
    );
    const data = await res.json();
    
    const filteredResults = data.filter(result => {
      const lat = parseFloat(result.lat);
      const lon = parseFloat(result.lon);
      return lat >= MADEIRA_BOUNDS[0][0] && lat <= MADEIRA_BOUNDS[1][0] && 
             lon >= MADEIRA_BOUNDS[0][1] && lon <= MADEIRA_BOUNDS[1][1];
    });
    
    return filteredResults[0] || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
