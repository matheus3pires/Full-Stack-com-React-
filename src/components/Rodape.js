import React from 'react';
import { Box, Typography } from '@mui/material';

const Rodape = () => {
  return (
    <Box
      sx={{
        position: 'fixed',  // Garantir que o rodapé fique fixo na parte inferior
        bottom: 0,
        width: '100%',
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px 0',
        textAlign: 'center',
        fontSize: '14px',
        zIndex: 1000,  // Para garantir que o rodapé fique sobre outros elementos
      }}
    >
      <Typography>
        <strong>Contato:</strong>
        <a
          href="mailto:matheuspiressdev@gmail.com" // Usando mailto para links de e-mail
          style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px' }}
        >
          matheuspiressdev@gmail.com
        </a>
      </Typography>
      <Typography>
        <strong>LinkedIn:</strong>
        <a
          href="https://www.linkedin.com/in/matheuspiress/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#fff', textDecoration: 'none', marginLeft: '5px' }}
        >
          https://www.linkedin.com/in/matheuspiress/
        </a>
      </Typography>
    </Box>
  );
};

export default Rodape;
