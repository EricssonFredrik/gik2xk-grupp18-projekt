import { Grid } from '@mui/material';
import ProductItemSmall from './ProductItemSmall';
function CartList({ product }) {
	return (
		<>
			<Grid container columnSpacing={2} p={2}>
				<Grid item xs={12} md={6}>
					<ProductItemSmall product={product} />
				</Grid>
				<Grid item xs={12} md={6}>
					<p>Antal: {product.cartRow.amount}</p>
					<p>Pris: {product.cartRow.amount * product.price}</p>
				</Grid>
			</Grid>
		</>
	);
}

export default CartList;
