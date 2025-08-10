import styled from 'styled-components';
import { Button, Paper, IconButton } from '@mui/material';


export const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

export const MapWrapper = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
`;


export const SidePanel = styled(Paper)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 350px;
  max-height: calc(100vh - 20px);
  overflow-y: auto;
  padding: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: linear-gradient(to top, #F4E6B0, #EEEEEE);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */

  @media (max-width: 768px) {
    left: 0;
    right: 0;
    width: auto; /* ← this is key */
    margin: 10px;
  }
`;


export const RouteItem = styled(Paper)`
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
  
  &.active {
    border-color: #1976d2;
    background-color: #f3f8ff;
  }
`;

export const PointsList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin: 16px 0;
  background-color:transparent;
`;

export const PointItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin: 4px 0;
  background:rgb(247, 234, 182);
  border-radius: 4px;
  border: 1px solid #FFC107;
  font-size: 14px;
`;

export const RemoveButton = styled(IconButton)`
  padding: 4px;
  color: #d32f2f;
  
  &:hover {
    background-color: rgba(211, 47, 47, 0.1);
  }
`;

export const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: ;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const SuggestionItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const StyledButton = styled(Button)`
  margin: 8px 0;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ErrorContainer = styled.div`
  padding: 16px;
  background-color: #ffebee;
  border: 1px solid #f44336;
  border-radius: 4px;
  color: #d32f2f;
  margin: 8px 0;
`;

export const SuccessContainer = styled.div`
  padding: 16px;
  background-color: #e8f5e8;
  border: 1px solid #4caf50;
  border-radius: 4px;
  color: #2e7d32;
  margin: 8px 0;
`;

export const FormSection = styled.div`
  margin: 16px 0;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
`;

export const FormSectionTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
`;

export const ImagePreview = styled.div`
  margin-top: 12px;
  text-align: center;
`;

export const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  object-fit: cover;
`;
