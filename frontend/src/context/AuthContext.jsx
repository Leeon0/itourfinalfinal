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

  // Efecto para cargar el usuario completo (con datos del coche) si está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Primero intenta obtener el usuario básico
        const res = await api.get('/user');
        if (res.data && res.data.id) {
          // Si existe id, pide el usuario completo
          const fullRes = await api.get(`/users/${res.data.id}`);
          setUser(fullRes.data.user);
          setUserProfile(fullRes.data.user.profile ?? null);
        } else {
          setUser(null);
          setUserProfile(null);
        }
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
      const res = await axios.post('http://localhost:8000/register', formDataToSend);
      
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

      const formData = new FormData();
      formData.append('id', updateData.id);
      formData.append('name', updateData.name);
      formData.append('profileImage', updateData.profileImage); // ✅ File object

      // Flatten vehicleData
      if (updateData.vehicleData) {
        formData.append('licensePlate', updateData.vehicleData.licensePlate);
        formData.append('brand', updateData.vehicleData.brand);
        formData.append('model', updateData.vehicleData.model);
        formData.append('color', updateData.vehicleData.color);
        formData.append('seatingCapacity', updateData.vehicleData.seatingCapacity);
        formData.append('additionalInfo', updateData.vehicleData.additionalInfo);
      }
      console.log('Dados a enviar para o backend update!!', formData)
      const res = await axios.put(`http://localhost:8000/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('recebi do backend:', res)
      // Atualizar localmente o estado do perfil
      setUser(res.data.user);

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
