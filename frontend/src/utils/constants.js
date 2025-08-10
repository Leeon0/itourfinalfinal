export const MADEIRA_CENTER = [32.7607, -16.9595];

export const MADEIRA_BOUNDS = [
  [32.4, -17.5],  // Sudoeste expandido (mais espaço a oeste e sul)
  [33.3, -15.8]   // Nordeste expandido (inclui Porto Santo a nordeste)
];

export const ROUTING_API = {
  url: 'https://api.openrouteservice.org/v2/directions/driving-car',
  apiKey: '5b3ce3597851110001cf6248c77c2a36e37a48a98b7b9bb1caa79e0e'
};

export const GEOCODING_API = {
  url: 'https://nominatim.openstreetmap.org/search'
};
