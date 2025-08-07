import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Avatar,
  Alert,
  IconButton
} from '@mui/material';
import {
  PhotoCamera,
  Delete as DeleteIcon
} from '@mui/icons-material';

const ImageUpload = ({
  value,
  onChange,
  onImageSelect,
  selectedImage,
  label = "Image",
  placeholder,
  accept = "image/*",
  showPreview = false
}) => {
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = onChange || onImageSelect;
  const [previewUrl, setPreviewUrl] = useState(null);
  const currentImage = value || selectedImage;
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    console.log(file)
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should not exceed 5MB');
      return;
    }

    setError('');
    
    if (handleImageChange) {
      handleImageChange(file); // Pass the raw File object
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result); // base64 for preview only
    };
    reader.readAsDataURL(file);

    /*const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target)
      const base64 = e.target.result;
      if (handleImageChange) {
        handleImageChange(base64);
      }
    };
    reader.onerror = () => {
      setError('Error processing image file. Please try again.');
    };
    reader.readAsDataURL(file);*/
  };

  const handleRemove = () => {
    if (handleImageChange) {
      handleImageChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body1">
        {label}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          border: '1px solid #ccc',
          borderRadius: 4,
          backgroundColor: '#fff',
          '&:hover': {
            borderColor: '#999'
          }
        }}
      >
        {previewUrl ? (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 2
              }}
            >
              <Avatar
                src={previewUrl}
                sx={{ width: 80, height: 80 }}
              />
              <Button
                size="small"
                onClick={handleClick}
                startIcon={<PhotoCamera />}
                sx={{ mt: 1, color: 'black' }}
              >
                Change
              </Button>
            </Box>

            <IconButton
              size="small"
              onClick={handleRemove}
              color="error"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'transparent',
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              py: 2
            }}
          >
            <PhotoCamera sx={{ fontSize: 40, color: '#ccc', mb: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} component="span">
              {placeholder || 'Clique para selecionar uma imagem'}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleClick}
              startIcon={<PhotoCamera />}
              sx={{ color: '#121212', borderColor: '#121212' }}
            >
              Choose Image
            </Button>
          </Box>
        )}
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default ImageUpload;
