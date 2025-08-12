import React, { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios';

const TourGuide = ({ userType, onTourComplete }) => {
  const { user, userProfile, markTutorialAsCompleted } = useAuth(); // ✅ USAR contexto
  useEffect(() => {
    // ✅ VERIFICAR se deve mostrar o tutorial
    const shouldShowTutorial = () => {
      // Só mostrar se:
      // 1. Tem userProfile
      // 2. Tem userType
      // 3. Tutorial ainda não foi completado
      if (!user) {
        return false;
      }

      if (user.tutorialCompleted === 1) {
        return false;
      }
      const res = axios.put(`http://localhost:8000/tutorial/${user.id}`)
      return true;
    };

    if (shouldShowTutorial()) {
      // Iniciar tutorial após 2 segundos
      const timer = setTimeout(() => {
        startTour(user.type);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user, user.type]); // ✅ DEPENDÊNCIAS corretas

  const startTour = (type) => {
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      steps: type === 'guia' ? guideSteps : touristSteps,
      popoverClass: 'driver-popover-custom',
      
      overlayOpacity: 0.85,
      
      onDestroyStarted: () => {
        driverObj.destroy();
        
        // ✅ MARCAR tutorial como completo
        //markTutorialAsCompleted();
        
        // ✅ CHAMAR callback se existir
        if (onTourComplete) {
          onTourComplete();
        }
      }
    });

    // ✅ ADICIONAR CSS customizado
    const style = document.createElement('style');
    style.textContent = `
      /* CSS para o primeiro passo com gradiente */
     .driver-popover {
        width: 800px !important;
        background: linear-gradient(to top, #F4E6B0, #EEEEEE) !important;
        border: none !important;
        border-radius: 16px !important;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4) !important;
        color: #000 !important;
      }
      
      .driver-popover-custom .driver-popover-arrow {
        border-top-color: #FFC107 !important;
      }
      
      .driver-popover-custom .driver-popover-title {
        color: #000 !important;
      }
      
      .driver-popover-custom .driver-popover-description {
        color: #333 !important;
      }
      
    
      
      /* Botões do driver */
      .driver-popover-navigation-btns button {
        background: #F4E6B0 !important;
        color: #333 !important;
        border: 2px solid #FFC107 !important;
        border-radius: 8px !important;
        transition: all 0.3s ease !important;
        height: 40px !important;
        font-size: 14px !important;
      }
      
      .driver-popover-navigation-btns button:hover {
        background: #FFC107 !important;
        color: #FFFF !important;

      }
    `;
    document.head.appendChild(style);

    driverObj.drive();
  };

  const guideSteps = [
    {
      element: 'body',
      popover: {
        title: `
          <div style="text-align: center">
            <h2 style="color: #000; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
              Welcome to
            </h2>
            <img src="./itour.png" alt="iTour Logo" style="width: 120px; height: auto; margin-bottom: 5px;" />
          </div>
        `,
        description: `
          <div style="text-align: center; padding: 10px 10px;">
            <div style="border-radius: 12px; padding: 20px; margin-bottom: 15px;">
              <p style="margin-bottom: 15px; font-size: 16px; line-height: 1.5; color: #333;">
                As a <strong>guide</strong>, you can create and manage amazing routes for tourists exploring beautiful Madeira Island.
              </p>
              <p style="margin: 0; font-size: 16px; color: #333;">
                Let's take a quick tour of your dashboard!
              </p>
            </div>
          </div>
        `,
        side: 'over',
        align: 'center',
        
      }
    },
    // 2. User Type
    {
      element: '[data-testid="user-type-chip"]',
      popover: {
        title: '👤 Your User Type',
        description: `
          <div style="padding: 10px;">
            <p>This chip shows your user type: <strong>Guide</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;list-style: none !important;">
              <li>Create routes for tourists</li>
              <li>Manage bookings</li>
              <li>Build your reputation</li>
            </ul>
          </div>
        `,
        side: 'bottom'
      }
    },
    // 3. Base Points (Yellow Markers)
    {
      element: 'body',
      popover: {
        title: '📍 Route Base Points',
        description: `
          <div style="text-align: center; padding: 15px;">
           <img src="/MarcadorRoute.png" alt="Yellow Marker" style="width: 100px; height: 100px; margin-right: 10px;" />
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <h3 style="color: #FFC107; margin: 0;">Yellow Base Markers</h3>
            </div>
            <p style="margin-bottom: 10px;">These <strong>yellow markers</strong> represent your route starting points.</p>
            <p style="margin-bottom: 10px;">Each marker is a different route that tourists can book and explore.</p>
            <p style="font-style: italic; color: #666;">💡 Click any yellow marker to view route details and manage bookings!</p>
          </div>
        `,
        side: 'over',
        align: 'center'
      }
    },
    // 4. Location Points (Black Markers)
    {
      element: 'body',
      popover: {
        title: 'Route Locations',
        description: `
          <div style="text-align: center; padding: 15px;">
              <img src="/marcador.png" alt="Black Marker" style="width: 80px; height: 80px; margin-right: 10px;" />
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <h3 style="color: #333; margin: 0;">Black Location Markers</h3>
            </div>
            <p style="margin-bottom: 10px;">When you click a route, you'll see <strong>black markers</strong> showing all the stops.</p>
            <p style="margin-bottom: 10px;">Each black marker represents a specific location tourists will visit on the route.</p>
            <p style="font-style: italic; color: #666;">💡 These appear when a route is selected to show the complete journey!</p>
          </div>
        `,
        side: 'over',
        align: 'center'
      }
    },
    // 5. Main Menu
    {
      element: '[data-testid="main-menu-button"]',
      popover: {
        title: 'Main Menu',
        description: `
          <div style="text-align: center;">
            <h4 style="color: #FFC107;">Your Control Center</h4>
            <p>Click this menu to access:</p>
            <ul style="text-align: left; margin: 10px 0; padding-left: 20px; list-style: none !important;">
              <li><strong>Tour Guides</strong> - View your routes and stats</li>
              <li><strong>Routes</strong> - View other people´s routes</li>
              <li><strong>My Routes</strong> - Manage your created routes</li>
              <li><strong>Guide Requests</strong> - View booking requests</li>
              <li><strong>Edit Profile</strong> - Update your information</li>
              <li><strong>Logout</strong> - Sign out safely</li>
            </ul>
            <p><em>Your main navigation hub!</em></p>
          </div>
        `,
        side: 'left'
      }
    },
    // 6. Create Route FAB
    {
      element: '[data-testid="create-route-fab"]',
      popover: {
        title: 'Create New Route',
        description: `
          <div style="text-align: center;">
            <p>This <strong> button</strong> lets you:</p>
            <ul style="text-align: left; margin: 10px 0; padding-left: 20px; list-style: none !important;">
              <li>Create new routes</li>
              <li>Add multiple stops</li>
              <li>Write descriptions</li>
              <li>Upload photos</li>
            </ul>
            <p><em>Start creating amazing experiences!</em></p>
          </div>
        `,
        side: 'left'
      }
    },
    // 7. Ready to Guide
    {
      element: 'body',
      popover: {
        description: `
          <div style="text-align: center; padding: 15px;">
            <img src="/itour.png" alt="logo" style="width: 120px; height: auto;" />
            <h1 style="color: #FFC107; margin-bottom: 15px;">You're All Set!</h1>
            <p style="margin-bottom: 10px;">Start creating amazing routes and sharing Madeira's beauty with everyone!</p>
          </div>
        `,
        side: 'over',
        align: 'center'
      }
    }
  ];

  // 🧳 Tutorial para TURISTAS (6 passos)
  const touristSteps = [
    // 1. Welcome com logo e gradiente
    {
      element: 'body',
      popover: {
        title: `
          <div style="text-align: center">
            <h2 style="color: #000; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
              Welcome to
            </h2>
            <img src="./itour.png" alt="iTour Logo" style="width: 120px; height: auto; margin-bottom: 15px;" />
          </div>
        `,
        description: `
          <div style="text-align: center; padding: 10px 10px;">
            <div style="border-radius: 12px; padding: 20px; margin-bottom: 15px;">
              <p style="margin-bottom: 15px; font-size: 16px; line-height: 1.5; color: #333;">
                As an <strong>explorer</strong>, you can discover and book amazing routes across beautiful Madeira Island.
              </p>
              <p style="margin: 0; font-size: 16px; color: #333;">
                Let's explore your adventure options!
              </p>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 5px;">
              <span style="color: #000; font-weight: bold;">Adventure Awaits</span>
            </div>
          </div>
        `,
        side: 'over',
        align: 'center'
      }
    },
    // 2. User Type
    {
      element: '[data-testid="user-type-chip"]',
      popover: {
        title: '👤 Your User Type',
        description: `
          <div style="padding: 10px;">
            <p>This chip shows your user type: <strong>Tourist</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px; list-style: none !important;">
              <li>Discover amazing routes</li>
              <li>Book adventures</li>
              <li>Rate your experiences</li>
              <li>Share your journey</li>
            </ul>
          </div>
        `,
        side: 'bottom'
      }
    },
    /*  3. Base Points (Yellow Markers)*/
    /* Alterar icones*/
    {
      element: 'body',
      popover: {
        title: 'Adventure Starting Points',
        description: `
          <div style="text-align: center; padding: 15px;">
           <img src="/MarcadorRoute.png" alt="Yellow Marker" style="width: 100px; height: 100px; margin-right: 10px;" />
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <h3 style="color: #FFC107; margin: 0;">Yellow Base Markers</h3>
            </div>
            <p style="margin-bottom: 10px;">These <strong>yellow markers</strong> are your gateway to amazing adventures!</p>
            <p style="margin-bottom: 10px;">Each marker represents a unique route you can explore and book.</p>
            <p style="font-style: italic; color: #666;">Click any yellow marker to discover routes and book your adventure!</p>
          </div>
        `,
        side: 'over',
        align: 'center'
      }
    },
    // 4. Location Points (Black Markers)
    {
      element: 'body',
      popover: {
        title: 'Route Destinations',
        description: `
          <div style="text-align: center; padding: 15px;">
              <img src="/marcador.png" alt="Black Marker" style="width: 80px; height: 80px; margin-right: 10px;" />
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <h3 style="color: #333; margin: 0;">Amazing Locations</h3>
            </div>
            <p style="margin-bottom: 10px;">When you select a route, you'll see <strong>black markers</strong> showing all the places you'll visit.</p>
            <p style="margin-bottom: 10px;">Each black marker is a unique destination on your adventure journey.</p>
            <p style="font-style: italic; color: #666;">These show you exactly where your adventure will take you!</p>
          </div>
        `,
        side: 'over',
        align: 'center'
      }
    },
    // 5. Main Menu
    {
      element: '[data-testid="main-menu-button"]',
      popover: {
        title: 'Main Menu',
        description: `
          <div style="text-align: center; padding: 10px;">
            <p>Click this menu to access:</p>
            <ul style="text-align: left; margin: 10px 0; padding-left: 20px; list-style: none !important;">
              <li><strong>All Routes</strong> - Browse available routes</li>
              <li><strong>My Reservations</strong> - View your bookings</li>
              <li><strong>Profile</strong> - Update your information</li>
              <li><strong>Logout</strong> - Sign out safely</li>
            </ul>
            <p><em>Everything you need in one place!</em></p>
          </div>
        `,
        side: 'left'
      }
    },
    // 6. Start Exploring
    {
      element: 'body',
      popover: {
        description: `
          <div style="text-align: center; padding: 15px;">
            <img src="/itour.png" alt="logo" style="width: 120px; height: auto;" />
            <h1 style="color: #FFC107; margin-bottom: 15px;">You're All Set!</h1>
            <p style="margin-bottom: 10px;">Start exploring Madeira's incredible routes and book your perfect adventure!</p>
            <p style="font-style: italic; color: #666;">Tip: Click any yellow marker on the map to discover routes!</p>
          </div>
        `,
        side: 'over',
        align: 'center'
      }
    }
  ];

  return null;
};

export default TourGuide;