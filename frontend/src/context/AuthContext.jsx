// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api'; // Instância axios com baseURL do backend
import axios from 'axios';

const AuthContext = createContext();

// Hook personalizado para aceder ao contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth tem de ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Utilizador autenticado
  const [userProfile, setUserProfile] = useState(null); // Perfil (ex. info extra)
  const [loading, setLoading] = useState(true); // Carregamento inicial

  // Efeito para verificar se o utilizador já está autenticado (cookies/session)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/user'); // Endpoint que devolve info do user logado
        setUser(res.data);
        setUserProfile(res.data.profile ?? null); // opcional: pode vir info extra
      } catch (err) {
        setUser(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Início de sessão
  const signIn = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:8000/login', {
        email,
        password
      }, {
        withCredentials: true // Garante que os cookies são enviados
      });

      setUser(res.data.user);
      setUserProfile(res.data.user.profile ?? null);
      return res.data;
    } catch (error) {
      console.error('Login falhou:', error.response?.data || error.message);
      throw error;
    }
  };

  // Registo de novo utilizador
  const signUp = async (
    email,
    password,
    fullName,
    user_type = 0,      
    profileImage = null,
    vehicleData = null
  ) => {
    console.log('signup called!!!')
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', email);
      formDataToSend.append('password', password);
      formDataToSend.append('fullName', fullName);
      formDataToSend.append('user_type', user_type);
      formDataToSend.append('profileImage', profileImage); // This should be a File object

      if (vehicleData) {
        formDataToSend.append('registration', vehicleData.licensePlate);
        formDataToSend.append('brand', vehicleData.brand);
        formDataToSend.append('model', vehicleData.model);
        formDataToSend.append('color', vehicleData.color);
        formDataToSend.append('capacity', vehicleData.seatingCapacity);
        formDataToSend.append('description', vehicleData.additionalInfo);
      }
      console.log(formDataToSend);
      const res = await axios.post('http://localhost:8000/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
// 
      setUser(res.data.user);
      setUserProfile(res.data.user.profile_image ?? null);
      return res.data;
    } catch (err) {
      console.error('Erro no signUp:', err);
      throw err;
    }
  };

  // Encerrar sessão
  const signOut = async () => {
    try {
      await axios.post('http://localhost:8000/logout', {}, {
        withCredentials: true
      });
      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error('Erro no logout:', err);
      throw err;
    }
  };

  // Atualizar perfil do utilizador
  const updateUserProfile = async (updateData) => {
    if (!user || !user.id) {
      throw new Error('Utilizador não autenticado');
    }

    try {
      const userId = user.id;

      const res = await axios.put(`http://localhost:8000/users/${userId}`, updateData, {
        withCredentials: true
      });

      // Atualizar localmente o estado do perfil
      setUserProfile(prev => ({
        ...prev,
        ...updateData
      }));

      return res.data;
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      throw error;
    }
  };

  // Verificações de tipo de utilizador
  const isGuide = () => user?.type === 1;
  const isTourist = () => user?.type === 0;

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserProfile,
    isGuide,
    isTourist
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
