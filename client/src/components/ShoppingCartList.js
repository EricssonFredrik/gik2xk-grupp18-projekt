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

  function calculatePriceTotal(products) {
    let priceTotal = 0;
    for (let i = 0; i < products.length; i++) {
      priceTotal += products[i].price * products[i].cartRow.amount;
    }
    return priceTotal;
  }

  return (
    <ul>
      {cart.products?.map((product) => (
        <div key={`cartProductId_${product.id}`}>
          <CartList product={product} />
        </div>
      ))}
       {cart.products && (
        <p>Total: {calculatePriceTotal(cart.products)}</p>
    )}
    </ul>
  );
}

export default ShoppingCartList;