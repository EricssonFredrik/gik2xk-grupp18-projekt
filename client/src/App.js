import './App.css';
import { Box, AppBar, Toolbar, Typography,} from '@mui/material';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './views/Home';
import ShoppingCart from './views/ShoppingCart';
import ProductEdit from './views/ProductEdit';
import ProductDetail from './views/ProductDetail';
import Products from './views/Products';





function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3">
              <Link to="/">Frasses e-handel</Link>
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ marginRight: '1rem' }}>
            <Link to="/Products">Alla produkter</Link>
          </Typography>
          <Typography variant="h6" sx={{ marginRight: '1rem' }}>
            <Link to="/Products/new">Skapa produkt</Link>
          </Typography>
          <Typography variant="h6" sx={{ marginRight: '1rem' }}>
            <Link to="/carts/:id">Varukorg</Link>
          </Typography>

        </Toolbar>
      </AppBar>

      <div>
        <Routes>
          <Route
          exact
          path="/" element={<Home></Home>}></Route>
          <Route
          exact
          path="/products" element={<Products></Products>}></Route>
          <Route
            exact
            path="/products/new"
            element={<ProductEdit></ProductEdit>}></Route>
          <Route
            exact
            path="/products/:id/edit"
            element={<ProductEdit></ProductEdit>}></Route>
          <Route
            exact
            path="/products/:id"
            element={<ProductDetail></ProductDetail>}></Route>
            <Route
            exact
            path="/carts/:id"
            element={<ShoppingCart></ShoppingCart>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
