import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        height: '90vh',
        background: 'linear-gradient(to bottom, #2196F3, #21CBF3)',
        color: '#fff',
        textAlign: 'center',
        padding: 4
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Bem-vindo ao Sistema de Vendas
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 4 }}>
        Escolha um dos módulos abaixo para gerenciar o sistema:
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>

        <Paper sx={{ width: 300, padding: 3, textAlign: 'center', backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/clientes"
            sx={{
              textTransform: 'none',
              fontSize: '18px',
              padding: '15px 20px',
              marginBottom: 2,
              borderRadius: '8px',
              backgroundColor: '#007BFF',
              '&:hover': { backgroundColor: '#0056b3' }
            }}
          >
            <HomeIcon sx={{ marginRight: 1 }} />
            Clientes
          </Button>
          <Typography variant="body1" sx={{ color: '#333' }}>
            O módulo de "Clientes" permite cadastrar, buscar e visualizar os dados dos seus clientes. 
            Você poderá adicionar novos clientes com informações detalhadas e realizar pesquisas 
            rápidas para facilitar o gerenciamento de seu banco de clientes.
          </Typography>
        </Paper>

        <Paper sx={{ width: 300, padding: 3, textAlign: 'center', backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/produtos"
            sx={{
              textTransform: 'none',
              fontSize: '18px',
              padding: '15px 20px',
              marginBottom: 2,
              borderRadius: '8px',
              backgroundColor: '#28A745',
              '&:hover': { backgroundColor: '#218838' }
            }}
          >
            <HomeIcon sx={{ marginRight: 1 }} />
            Produtos
          </Button>
          <Typography variant="body1" sx={{ color: '#333' }}>
            No módulo de "Produtos", você pode cadastrar novos produtos, listar os já cadastrados 
            e realizar buscas rápidas para encontrar o item desejado. 
            A plataforma oferece fácil acesso aos dados do produto, como nome, preço e quantidade.
          </Typography>
        </Paper>

        <Paper sx={{ width: 300, padding: 3, textAlign: 'center', backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/pedidos"
            sx={{
              textTransform: 'none',
              fontSize: '18px',
              padding: '15px 20px',
              marginBottom: 2,
              borderRadius: '8px',
              backgroundColor: '#FF5733',
              '&:hover': { backgroundColor: '#c0392b' }
            }}
          >
            <HomeIcon sx={{ marginRight: 1 }} />
            Pedidos
          </Button>
          <Typography variant="body1" sx={{ color: '#333' }}>
            O módulo de "Pedidos" oferece uma forma simples e eficiente de gerenciar todas as 
            compras realizadas. Você pode adicionar novos pedidos, pesquisar por cliente ou produto, 
            e ter uma visão geral dos pedidos pendentes e finalizados.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;
