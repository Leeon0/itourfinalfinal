import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { Route as RouteIcon } from '@mui/icons-material';
import { MADEIRA_CENTER, MADEIRA_BOUNDS } from '../utils/constants';
import { calculateRoute } from '../utils/mapUtils';
import { useRoutes } from '../context/RoutesContext';
import TourGuide from './TourGuide';
import { useAuth } from '../context/AuthContext';

const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDlDNSAxNC4yNSAxMiAyMiAxMiAyMkMxMiAyMiAxOSAxNC4yNSAxOSA5QzE5IDUuMTMgMTUuODcgMiAxMiAyWk0xMiAxMS41QzEwLjYyIDExLjUgOS41IDEwLjM4IDkuNSA5QzkuNSA3LjYyIDEwLjYyIDYuNSAxMiA2LjVDMTMuMzggNi41IDE0LjUgNy42MiAxNC41IDlDMTQuNSAxMC4zOCAxMy4zOCAxMS41IDEyIDExLjVaIiBmaWxsPSIjMDAwMDAwIi8+Cjwvc3ZnPgo=',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});

const baseIcon = new L.Icon({
  iconUrl: '/MarcadorRoute.png', 
  iconSize: [50, 50],
  iconAnchor: [25, 40],
  popupAnchor: [0, -40],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});

const MapComponent = ({ onOpenRoutesList }) => {
  const { routes, activeRoute, selectRoute, clearActiveRoute } = useRoutes();
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const { isGuide, user } = useAuth();
  const [isNewUser] = useState(true);

  useEffect(() => {
    if (activeRoute && activeRoute.locations.length > 1) {
      const calculateActiveRoute = async () => {
        const coords = await calculateRoute(activeRoute.locations.map(loc => loc.position));
        setRouteCoordinates(coords);
      };
      calculateActiveRoute();
    } else {
      setRouteCoordinates([]);
    }
  }, [activeRoute]);

  
  // ✅ MEMOIZAR OPTIONS DO POPUP
  const customPopupOptions = useMemo(() => ({
    maxWidth: 250,
    width: 200,
    className: 'custom-popup-yellow'
  }), []);

  // ✅ MEMOIZAR FUNÇÃO DE CLICK
  const handleBaseClick = useCallback((route) => {
    console.log('🎯 Base click:', route.name, route.id);
    
    if (activeRoute?.id === route.id) {
      console.log('🔄 Clearing active route');
      clearActiveRoute();
    } else {
      console.log('🎯 Selecting route:', route.name);
      selectRoute(route);
      
      if (onOpenRoutesList) {
        setTimeout(() => {
          onOpenRoutesList();
        }, 100);
      }
    }
  }, [activeRoute?.id, clearActiveRoute, selectRoute, onOpenRoutesList]);

  // ✅ CALCULAR BASES ÚNICAS COM DESLOCAMENTO ANTI-SOBREPOSIÇÃO
  const uniqueBases = useMemo(() => {
    console.log('🔍 Calculando bases únicas com anti-sobreposição para', routes.length, 'rotas');
    
    if (!routes || routes.length === 0) {
      console.log('⚠️ Nenhuma rota encontrada');
      return [];
    }

    const bases = [];
    const usedPositions = [];

    routes.forEach(route => {
      // ✅ Verificar se a rota tem baseLocation válida
      if (!route.baseLocation || !route.baseLocation.position) {
        console.warn('⚠️ Rota sem baseLocation válida:', route.name, route.id);
        return;
      }

      const [lat, lng] = route.baseLocation.position;
      
      // ✅ Validar coordenadas
      if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
        console.warn('⚠️ Coordenadas inválidas para rota:', route.name, { lat, lng });
        return;
      }

      // ✅ CALCULAR POSIÇÃO SEM SOBREPOSIÇÃO
      const adjustedPosition = calculateOffset(usedPositions, [lat, lng]);
      usedPositions.push(adjustedPosition);

      bases.push({
        ...route,
        baseLocation: {
          ...route.baseLocation,
          position: adjustedPosition,
          originalPosition: [lat, lng] // ✅ Manter posição original para referência
        }
      });
      
      console.log(`✅ Base adicionada: ${route.name} em [${adjustedPosition[0].toFixed(4)}, ${adjustedPosition[1].toFixed(4)}]`);
    });

    console.log('📍 Total de bases únicas processadas:', bases.length);
    return bases;
  }, [routes]);

  return (
    <>
      <TourGuide 
        userType={user?.type}
        isNewUser={isNewUser}
        onTourComplete={() => console.log('Tutorial completed')}
      />

      {/* CSS personalizado para popup */}
      <style>{`
        .custom-popup-yellow .leaflet-popup-content-wrapper {
          background: linear-gradient(to top, #F4E6B0, #EEEEEE) !important;
          color: #333 !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
          padding: 0 !important;
        }
        
        .custom-popup-yellow .leaflet-popup-tip {
          background: #F4E6B0 !important;
          border-top: none !important;
          border-left: none !important;
        }
        
        .custom-popup-yellow .leaflet-popup-content {
          margin: 0 !important;
          padding: 16px !important;
          font-family: 'Roboto', sans-serif !important;
        }
        
        .custom-popup-yellow .leaflet-popup-close-button {
          color: #333 !important;
          font-size: 20px !important;
          font-weight: bold !important;
          right: 8px !important;
          top: 8px !important;
        }
        
        .custom-popup-yellow .leaflet-popup-close-button:hover {
          color: #000 !important;
        }
      `}</style>

      <MapContainer 
        center={MADEIRA_CENTER} 
        zoom={10} 
        style={{ height: '100%', width: '100%' }}
        maxBounds={MADEIRA_BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={9}
        maxZoom={18}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Linha da rota ativa */}
        {routeCoordinates.length > 1 && (
          <Polyline 
            positions={routeCoordinates} 
            color={activeRoute?.color || "red"} 
            weight={4}
            opacity={0.8}
          />
        )}

        {/* ✅ BASES DE ROTAS COM POSIÇÕES AJUSTADAS */}
        {!activeRoute && uniqueBases.map((route, index) => {
          // ✅ Validação extra antes de renderizar
          if (!route.baseLocation?.position || route.baseLocation.position.length !== 2) {
            console.warn('⚠️ Pulando rota com baseLocation inválida:', route.name);
            return null;
          }

          const [lat, lng] = route.baseLocation.position;
          
          // ✅ Verificação final de coordenadas
          if (isNaN(lat) || isNaN(lng)) {
            console.warn('⚠️ Coordenadas NaN para rota:', route.name);
            return null;
          }

          return (
            <Marker 
              key={`base-${route.id}-${lat}-${lng}`}
              position={[lat, lng]}
              icon={baseIcon}
              eventHandlers={{
                click: () => handleBaseClick(route)
              }}
            >
              <Popup {...customPopupOptions}>
                <div style={{textAlign: 'center', minWidth: '180px'}}>
                  <div style={{
                    color: '#333',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    fontSize: '15px'
                  }}>
                    🏁 {route.name}
                  </div>
                  
                  <div style={{
                    color: '#333',
                    fontWeight: '500',
                    marginBottom: '12px',
                    fontSize: '14px'
                  }}>
                    {route.baseLocation.name}
                  </div>
                  
                  <div style={{
                    backgroundColor: '#333',
                    borderRadius: '6px',
                    padding: '8px',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      color: '#FFC107',
                      fontSize: '12px',
                      fontFamily: 'monospace'
                    }}>
                      {lat.toFixed(4)}, {lng.toFixed(4)}
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: 'rgba(51, 51, 51, 0.1)',
                    borderRadius: '6px',
                    padding: '6px',
                    border: '1px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}>
                    <span style={{color: '#333', fontSize: '14px'}}>🛣️</span>
                    <span style={{
                      color: '#333',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}>
                      {route.locations?.length || 0} stops • {route.duration}
                    </span>
                  </div>

                  <div style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    color: '#666',
                    fontStyle: 'italic'
                  }}>
                    Click to view route details
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {/* LOCALIZAÇÕES DA ROTA ATIVA */}
        {activeRoute && activeRoute.locations && activeRoute.locations.map((marker, i) => (
          <Marker 
            position={marker.position} 
            key={marker.id || i} 
            icon={customIcon}
          >
            <Popup {...customPopupOptions}>
              <div style={{textAlign: 'center', minWidth: '180px'}}>
                <div style={{
                  color: '#333',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  fontSize: '15px'
                }}>
                  {marker.name}
                </div>
                
                <div style={{
                  backgroundColor: '#333',
                  borderRadius: '6px',
                  padding: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    color: '#FFC107',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}>
                    {marker.position[0].toFixed(4)}, {marker.position[1].toFixed(4)}
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: 'rgba(51, 51, 51, 0.1)',
                  borderRadius: '6px',
                  padding: '6px',
                  border: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}>
                  <RouteIcon />
                  <span style={{
                    color: '#333',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    {activeRoute.name}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* BASE LOCATION DA ROTA ATIVA */}
        {activeRoute && activeRoute.baseLocation && (
          <Marker 
            position={activeRoute.baseLocation.position}
            icon={baseIcon}
            eventHandlers={{
              click: () => clearActiveRoute()
            }}
          >
            <Popup {...customPopupOptions}>
              <div style={{textAlign: 'center', minWidth: '180px'}}>
                <div style={{
                  color: '#333',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  fontSize: '15px'
                }}>
                  🏁 Base Location
                </div>
                
                <div style={{
                  color: '#333',
                  fontWeight: '500',
                  marginBottom: '12px',
                  fontSize: '14px'
                }}>
                  {activeRoute.baseLocation.name}
                </div>
                
                <div style={{
                  backgroundColor: '#333',
                  borderRadius: '6px',
                  padding: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    color: '#FFC107',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}>
                    {activeRoute.baseLocation.position[0].toFixed(4)}, {activeRoute.baseLocation.position[1].toFixed(4)}
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: 'rgba(51, 51, 51, 0.1)',
                  borderRadius: '6px',
                  padding: '6px',
                  border: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}>
                  <span style={{color: '#333', fontSize: '14px'}}>🛣️</span>
                  <span style={{
                    color: '#333',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}>
                    {activeRoute.name}
                  </span>
                </div>

                <div style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  Click to close route
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default MapComponent;
