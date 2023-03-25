import { useEffect, useState } from 'react';
import CartList from './CartList';
import { getCartById } from '../models/CartModel';

function ShoppingCartList() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    async function fetchCart() {
      const cartData = await getCartById(1);
      setCart(cartData);
    }
    fetchCart();
  }, []);

  return (
    <ul>
      {cart.products?.map((product) => (
        <div key={`cartProductId_${product.id}`}>
          <CartList product={product} />
        </div>
      ))}
      {cart.products && <p>Total: {cart.priceTotal}</p>}
    </ul>
  );
}

export default ShoppingCartList;