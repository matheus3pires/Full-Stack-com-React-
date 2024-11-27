// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import Home from './pages/Home';
import Clientes from './pages/Clientes';  
import Produtos from './pages/Produtos';
import Pedidos from './pages/Pedidos';
import { Home as HomeIcon } from '@mui/icons-material';  
import Rodape from './components/Rodape'; 

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" width="100%" justifyContent="space-between">
            <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
              Home
            </Button>
            <Box>
              <Button color="inherit" component={Link} to="/clientes">Clientes</Button>
              <Button color="inherit" component={Link} to="/produtos">Produtos</Button>
              <Button color="inherit" component={Link} to="/pedidos">Pedidos</Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes><Rodape />
    </Router>
  );
};

export default App;


