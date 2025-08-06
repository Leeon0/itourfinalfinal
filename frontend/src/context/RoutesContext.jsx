// src/context/RoutesContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../services/api';
import { useAuth } from './AuthContext';

const RoutesContext = createContext();

// Hook personalizado para consumir o contexto
export const useRoutes = () => {
  const context = useContext(RoutesContext);
  if (!context) {
    throw new Error('useRoutes must be used within a RoutesProvider');
  }
  return context;
};

export const RoutesProvider = ({ children }) => {
  const [routes, setRoutes] = useState([]);
  const [activeRoute, setActiveRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Buscar todas as rotas da base de dados
  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/routes');
      setRoutes(response.data);
    } catch (error) {
      console.error('Erro ao carregar rotas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova rota
  const addRoute = async (routeData) => {
    try {
      const newRoute = {
        ...routeData,
        createdBy: user.id,
        createdByName: user.name,
        createdAt: new Date().toISOString(),
        isPublic: true
      };

      const res = await axios.post('/routes', newRoute);
      const savedRoute = res.data;

      setRoutes(prev => [...prev, savedRoute]);
      return savedRoute;
    } catch (error) {
      console.error('Erro ao adicionar rota:', error);
      throw error;
    }
  };

  // Atualizar rota existente
  const updateRoute = async (routeId, updates) => {
    try {
      const res = await axios.put(`/routes/${routeId}`, updates);
      const updatedRoute = res.data;

      setRoutes(prev =>
        prev.map(route => (route.id === routeId ? updatedRoute : route))
      );

      if (activeRoute?.id === routeId) {
        setActiveRoute(updatedRoute);
      }
    } catch (error) {
      console.error('Erro ao atualizar rota:', error);
      throw error;
    }
  };

  // Eliminar rota da base de dados
  const deleteRoute = async (routeId) => {
    try {
      await axios.delete(`/routes/${routeId}`);
      setRoutes(prev => prev.filter(route => route.id !== routeId));

      if (activeRoute?.id === routeId) {
        setActiveRoute(null);
      }
    } catch (error) {
      console.error('Erro ao apagar rota:', error);
      throw error;
    }
  };

  // Definir rota selecionada
  const selectRoute = (route) => {
    setActiveRoute(route);
  };

  // Limpar rota ativa
  const clearActiveRoute = () => {
    setActiveRoute(null);
  };

  // Buscar rotas quando o componente monta
  useEffect(() => {
    fetchRoutes();
  }, []);

  const value = {
    routes,
    activeRoute,
    loading,
    fetchRoutes,
    addRoute,
    updateRoute,
    deleteRoute,
    selectRoute,
    clearActiveRoute
  };

  return (
    <RoutesContext.Provider value={value}>
      {children}
    </RoutesContext.Provider>
  );
};