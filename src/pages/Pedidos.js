import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteBusca, setClienteBusca] = useState('');
  const [produtoBusca, setProdutoBusca] = useState('');
  const [novoPedido, setNovoPedido] = useState({ idCliente: '', idsProdutos: [] });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  // Buscar todos os pedidos
  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:8080/pedidos');
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  // Buscar clientes para o dropdown
  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:8080/clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  // Buscar produtos para o dropdown
  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Buscar pedidos por ID do cliente
  const buscarPedidosPorCliente = async () => {
    if (!clienteBusca) {
      console.error('Preencha o ID do cliente para buscar.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/pedidos/buscarPorCliente/${clienteBusca}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar pedidos: ${response.statusText}`);
      }
      const data = await response.json();
      setPedidosFiltrados(data);
      setIsModalOpen(true); // Abrir modal com os pedidos filtrados
    } catch (error) {
      console.error('Erro ao buscar pedidos por cliente:', error.message);
    }
  };

  // Buscar pedidos por ID do produto
  const buscarPedidosPorProduto = async () => {
    if (!produtoBusca) {
      console.error('Preencha o ID do produto para buscar.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/pedidos/buscarPorProduto/${produtoBusca}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar pedidos: ${response.statusText}`);
      }
      const data = await response.json();
      setPedidosFiltrados(data);
      setIsModalOpen(true); // Abrir modal com os pedidos filtrados
    } catch (error) {
      console.error('Erro ao buscar pedidos por produto:', error.message);
    }
  };

  // Adicionar um novo pedido
  const adicionarPedido = async (e) => {
    e.preventDefault();
    if (!novoPedido.idCliente || novoPedido.idsProdutos.length === 0) {
      console.error('Cliente e produtos são obrigatórios');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoPedido),
      });
      if (response.ok) {
        setNovoPedido({ idCliente: '', idsProdutos: [] });
        fetchPedidos();
      } else {
        console.error('Erro ao adicionar pedido:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
    }
  };

  useEffect(() => {
    fetchPedidos();
    fetchClientes();
    fetchProdutos();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', mb: 4, color: '#1976d2' }}
      >
        Módulo de Pedidos
      </Typography>

      {/* Busca por cliente ou produto */}
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
            label="Buscar por ID do Cliente"
            variant="outlined"
            fullWidth
            value={clienteBusca}
            onChange={(e) => setClienteBusca(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={buscarPedidosPorCliente}
            sx={{ paddingX: 4 }}
          >
            Buscar
          </Button>
        </Paper>
        <Paper
          sx={{
            padding: 2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Buscar por ID do Produto"
            variant="outlined"
            fullWidth
            value={produtoBusca}
            onChange={(e) => setProdutoBusca(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={buscarPedidosPorProduto}
            sx={{ paddingX: 4 }}
          >
            Buscar
          </Button>
        </Paper>
      </Box>

      {/* Adicionar novo pedido */}
      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Adicionar Novo Pedido
        </Typography>
        <form onSubmit={adicionarPedido}>
          <Box display="flex" flexDirection="column" gap={2}>
            <FormControl required>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={novoPedido.idCliente}
                onChange={(e) => setNovoPedido({ ...novoPedido, idCliente: e.target.value })}
                fullWidth
              >
                {clientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl required>
              <InputLabel>Produtos</InputLabel>
              <Select
                multiple
                value={novoPedido.idsProdutos}
                onChange={(e) => setNovoPedido({ ...novoPedido, idsProdutos: e.target.value })}
                fullWidth
              >
                {produtos.map((produto) => (
                  <MenuItem key={produto.id} value={produto.id}>
                    {produto.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
              Adicionar Pedido
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Lista de pedidos */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}
      >
        Lista de Pedidos
      </Typography>
      <Box>
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <Paper
              key={pedido.id}
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
                <ShoppingCartIcon />
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Pedido do Cliente ID: {pedido.idCliente}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ display: 'block' }}>
                  ID Produtos: {pedido.idsProdutos.join(', ')}
                </Typography>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" align="center">
            Nenhum pedido encontrado.
          </Typography>
        )}
      </Box>
      {/* Modal de pedidos filtrados */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Pedidos Encontrados</DialogTitle>
        <DialogContent dividers>
          {pedidosFiltrados.length > 0 ? (
            pedidosFiltrados.map((pedido) => (
              <Box key={pedido.id} mb={2}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Pedido ID: {pedido.id}
                </Typography>
                <Typography variant="body2">
                  Cliente ID: {pedido.idCliente}
                </Typography>
                <Typography variant="body2">
                  ID Produtos: {pedido.idsProdutos.join(', ')}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Nenhum pedido encontrado.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Pedidos;
