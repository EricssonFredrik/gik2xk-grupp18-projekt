import { Button } from '@mui/material';
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import ProductItemLarge from '../components/ProductItemLarge';
import { getOne, addRating } from '../models/ProductModel';
import RatingZone from '../components/RatingZone';
import { addToCart } from '../models/CartModel';
import AddToCart from '../components/AddToCart';
import "./ProductDetail.css"

function ProductDetail() {
  const params = useParams();
  const productId = params.id;


  const [product, setProduct] = useState({});

  useEffect(() => {
    getOne(productId).then((product) => setProduct(product));
  }, [productId]);

  function refreshProduct() {
		getOne(productId).then((product) => {
			setProduct(product);
		});
	}

  function addToRating(ratingToAdd) {
		addRating(productId, 1, ratingToAdd).then((result) => {
			refreshProduct();
		});
	}

	function addingToCart(cartId = 4, amount) {
		if (amount > 0) {
			addToCart(cartId, productId, amount).then((result) => console.log(result));
		}
	}

  return (
    <>
      <ProductItemLarge product={product} />

      <div>
				<AddToCart onAdd={addingToCart} />
			</div>
      <br/>
        <Link to={`/products/${productId}/edit`}>
        <Button variant="contained" size="large" color="inherit" >Ändra</Button>
        </Link>

        <div>
      <br/>
          
        </div>
        <div>
          <RatingZone onSave={addToRating}></RatingZone>
        </div>
   </>
  );
}
  
export default ProductDetail;