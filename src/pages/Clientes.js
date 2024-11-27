import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nomeBusca, setNomeBusca] = useState('');
  const [novoCliente, setNovoCliente] = useState({ nome: '', email: '', contato: '' });
  const [clientesModal, setClientesModal] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:8080/clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const buscarClientes = async () => {
    if (!nomeBusca) {
      console.error('Preencha o nome para buscar.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/clientes/buscarPorNome/${nomeBusca}`);
      if (!response.ok) {
        console.error('Erro ao buscar clientes pelo nome:', response.statusText);
        setClientesModal([]);
        return;
      }
      const data = await response.json();
      setClientesModal(data);
      setModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar clientes pelo nome:', error);
    }
  };

  const adicionarCliente = async (e) => {
    e.preventDefault();
    if (!novoCliente.nome || !novoCliente.email || !novoCliente.contato) {
      console.error('Todos os campos são obrigatórios.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCliente),
      });
      if (response.ok) {
        setNovoCliente({ nome: '', email: '', contato: '' });
        fetchClientes();
      } else {
        console.error('Erro ao adicionar cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', mb: 4, color: '#1976d2' }}
      >
        Módulo de Clientes
      </Typography>

      <Box mb={4}>
        <Paper
          sx={{
            padding: 2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <TextField
            label="Buscar por Nome do Cliente"
            variant="outlined"
            fullWidth
            value={nomeBusca}
            onChange={(e) => setNomeBusca(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={buscarClientes}
            sx={{ paddingX: 4 }}
          >
            Buscar
          </Button>
        </Paper>
      </Box>

      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Adicionar Novo Cliente
        </Typography>
        <form onSubmit={adicionarCliente}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={novoCliente.nome}
              onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
            />
            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              value={novoCliente.email}
              onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
            />
            <TextField
              label="Contato"
              variant="outlined"
              fullWidth
              value={novoCliente.contato}
              onChange={(e) => setNovoCliente({ ...novoCliente, contato: e.target.value })}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              sx={{
                paddingX: 3,
                paddingY: 1,
                mt: 2,
                borderRadius: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#4caf50',
                '&:hover': { backgroundColor: '#45a049' },
                textTransform: 'uppercase',
              }}
            >
              Adicionar Cliente
            </Button>
          </Box>
        </form>
      </Paper>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}
      >
        Lista de Clientes
      </Typography>
      <Box>
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <Paper
              key={cliente.id}
              sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: 2,
                boxShadow: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: '#f5f5f5',
              }}
            >
              <Avatar sx={{ bgcolor: '#1976d2', color: '#fff' }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {cliente.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  E-mail: {cliente.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Contato: {cliente.contato}
                </Typography>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" align="center">
            Nenhum cliente encontrado.
          </Typography>
        )}
      </Box>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Clientes Encontrados</DialogTitle>
        <DialogContent dividers>
          {clientesModal.length > 0 ? (
            clientesModal.map((cliente) => (
              <Box key={cliente.id} mb={2}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Nome: {cliente.nome}
                </Typography>
                <Typography variant="body2">E-mail: {cliente.email}</Typography>
                <Typography variant="body2">Contato: {cliente.contato}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Nenhum cliente encontrado.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Clientes;
