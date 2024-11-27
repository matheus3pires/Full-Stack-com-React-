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
import { Inventory  as InventoryIcon   } from '@mui/icons-material';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [nomeBusca, setNomeBusca] = useState('');
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '' });
  const [produtosModal, setProdutosModal] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:8080/produtos');
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const buscarProdutos = async () => {
    if (!nomeBusca) {
      console.error('Preencha o nome para buscar.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/produtos/buscarPorNome/${nomeBusca}`);
      if (!response.ok) {
        console.error('Erro ao buscar produtos pelo nome:', response.statusText);
        setProdutosModal([]);
        return;
      }
      const data = await response.json();
      setProdutosModal(data);
      setModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar produtos pelo nome:', error);
    }
  };

  const adicionarProduto = async (e) => {
    e.preventDefault();
    if (!novoProduto.nome || !novoProduto.preco) {
      console.error('Nome e preço são obrigatórios');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto),
      });
      if (response.ok) {
        setNovoProduto({ nome: '', preco: '' });
        fetchProdutos();
      } else {
        console.error('Erro ao adicionar produto:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  useEffect(() => {
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
        Módulo de Produtos
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
            label="Buscar por Nome do Produto"
            variant="outlined"
            fullWidth
            value={nomeBusca}
            onChange={(e) => setNomeBusca(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={buscarProdutos}
            sx={{ paddingX: 4 }}
          >
            Buscar
          </Button>
        </Paper>
      </Box>

      <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Adicionar Novo Produto
        </Typography>
        <form onSubmit={adicionarProduto}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={novoProduto.nome}
              onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
            />
            <TextField
              label="Preço"
              variant="outlined"
              fullWidth
              value={novoProduto.preco}
              onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
              type="number"
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
              Adicionar Produto
            </Button>
          </Box>
        </form>
      </Paper>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}
      >
        Lista de Produtos
      </Typography>
      <Box>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <Paper
              key={produto.id}
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
                <InventoryIcon   />
              </Avatar>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {produto.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Preço: R$ {produto.preco.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary" align="center">
            Nenhum produto encontrado.
          </Typography>
        )}
      </Box>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Produtos Encontrados</DialogTitle>
        <DialogContent dividers>
          {produtosModal.length > 0 ? (
            produtosModal.map((produto) => (
              <Box key={produto.id} mb={2}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Nome: {produto.nome}
                </Typography>
                <Typography variant="body2">preço: R$ {produto.preco.toFixed(2)}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Nenhum produto encontrado.
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

export default Produtos;
