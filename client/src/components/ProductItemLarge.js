import { Typography } from '@mui/material';
import ProductItemSmall from './ProductItemSmall';
import Ratings from './Ratings';
import Rating from '@mui/material/Rating';
import { getAverageRating } from '../models/RatingModel'
import { useState } from 'react';

function ProductItemLarge({ product }) {
    const [average, setAverage] = useState(0);
	  const avg = async () => {
		const avg = await getAverageRating(product.id);
		if (!isNaN(avg)) {
			setAverage(avg);
		}
	};
  avg();

  
  return product ? ( 
    <>
        <ProductItemSmall product={product} />
      <div>
      <Typography>{product.description}</Typography>
      </div>
      <br/>
      <div>
      
      <h3>Snittbetyg:
      <Rating name="Rating" value={average} precision={0.1} readOnly />
      </h3>
      </div>
      <br/>
      <div>
      
      <Ratings ratings={product.ratings} />
      </div>
      <br/>
      
    </>
  ) : (
    <>Produkten saknas</>
  );
}

export default ProductItemLarge;