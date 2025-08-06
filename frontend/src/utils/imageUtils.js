/**
 * Utilitários para processamento de imagens
 */

/**
 * Processa uma imagem para armazenamento no Firestore
 * @param {string} base64Image - Imagem em formato base64
 * @returns {string} - Imagem processada em base64
 */
export const processImageForFirestore = async (base64Image) => {
  try {
    if (typeof base64Image === 'string' && base64Image.startsWith('data:image/')) {
      return base64Image;
    }
    
    if (base64Image instanceof File) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(base64Image);
      });
    }
    
    return base64Image;
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    throw new Error('Erro ao processar imagem');
  }
};

/**
 * Redimensiona uma imagem para um tamanho máximo
 * @param {string} base64Image - Imagem em base64
 * @param {number} maxWidth - Largura máxima
 * @param {number} maxHeight - Altura máxima
 * @returns {Promise<string>} - Imagem redimensionada em base64
 */
export const resizeImage = (base64Image, maxWidth = 800, maxHeight = 600) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.drawImage(img, 0, 0, width, height);
      
      const resizedBase64 = canvas.toDataURL('image/jpeg', 0.8);
      resolve(resizedBase64);
    };
    
    img.src = base64Image;
  });
};

/**
 * Valida se uma imagem é válida
 * @param {File} file - Arquivo de imagem
 * @returns {boolean} - Se a imagem é válida
 */
export const validateImage = (file) => {
  if (!(file instanceof File)) {
    return false;
  }
  
  if (!file.type.startsWith('image/')) {
    return false;
  }
  
  if (file.size > 5 * 1024 * 1024) {
    return false;
  }
  
  return true;
};
