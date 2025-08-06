// src/contexts/ReservationsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ReservationsContext = createContext();

export const useReservations = () => {
  const context = useContext(ReservationsContext);
  if (!context) {
    throw new Error('useReservations deve ser usado dentro de um ReservationsProvider');
  }
  return context;
};

export const ReservationsProvider = ({ children }) => {
  const { user } = useAuth(); // utilizador autenticado
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obter todas as reservas (pode ser útil para verificar conflitos de horários, etc.)
  const getAllReservations = async () => {
    try {
      const res = await axios.get('http://localhost:8000/reservations');
      return res.data;
    } catch (error) {
      console.error('Erro ao buscar todas as reservas:', error);
      throw error;
    }
  };

  // Buscar reservas do utilizador autenticado
  const fetchMyReservations = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/reservations/user/${user.id}`);
      setReservations(res.data);
    } catch (error) {
      console.error('Erro ao buscar reservas do utilizador:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Criar uma nova reserva
  const addReservation = async (route, selectedDate, selectedHours) => {
    if (!user?.id) {
      throw new Error('Precisa de estar autenticado para fazer uma reserva');
    }

    try {
      const payload = {
        userId: user.id,
        routeId: route.id,
        selectedDate,
        selectedHours,
      };

      await axios.post('http://localhost:8000/reservations', payload);
      await fetchMyReservations();
    } catch (error) {
      console.error('Erro ao adicionar reserva:', error);
      throw error;
    }
  };

  // Cancelar uma reserva (soft delete ou update de estado)
  const cancelReservation = async (reservationId) => {
    try {
      await axios.put(`http://localhost:8000/reservations/${reservationId}/cancel`);
      await fetchMyReservations();
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error);
      throw error;
    }
  };

  // Eliminar reserva permanentemente
  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:8000/reservations/${reservationId}`);
      await fetchMyReservations();
    } catch (error) {
      console.error('Erro ao eliminar reserva:', error);
      throw error;
    }
  };

  // Submeter uma avaliação (rating) para um guia
  const submitRating = async (reservationId, rating) => {
    if (!user?.id) {
      throw new Error('Precisa de estar autenticado para submeter uma avaliação');
    }

    try {
      await axios.post(`http://localhost:8000/ratings`, {
        reservationId,
        touristId: user.id,
        rating
      });

      await fetchMyReservations();
    } catch (error) {
      console.error('Erro ao submeter avaliação:', error);
      throw error;
    }
  };

  // Buscar média de avaliações de um guia específico
  const getGuideRating = async (guideId) => {
    try {
      const res = await axios.get(`http://localhost:8000/guides/${guideId}/rating`);
      return res.data;
    } catch (error) {
      console.error('Erro ao buscar rating do guia:', error);
      return { averageRating: 0, totalRatings: 0 };
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchMyReservations();
    } else {
      setReservations([]);
    }
  }, [user?.id]);

  const value = {
    reservations,
    loading,
    getAllReservations,
    fetchMyReservations,
    addReservation,
    cancelReservation,
    deleteReservation,
    submitRating,
    getGuideRating
  };

  return (
    <ReservationsContext.Provider value={value}>
      {children}
    </ReservationsContext.Provider>
  );
};