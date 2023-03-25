import api from '../api.js';

export async function addToCart(cartId = 1, productId, amt) {
	try {
		const { data } = await api.post(`carts/${cartId}/addProduct/${productId}`, {
			amount: amt,
		});
		return data;
	} catch (error) {
		console.error(error);
		return {};
	}
}

export async function getCartById(id = 1) {
	try {
	  const { data } = await api.get(`/carts/${id}`);
	  return data;
	} catch (error) {
	  console.log(error);
	  return {};
	}
  }