import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductItemSmall({ product }) {

  return (
    <>
      <div>
        <Typography variant="h5" component="h3">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </Typography>
        <div>
          <img alt={product.title} height="100" width="100" src={product.imageUrl} />
        </div>
        <div>
          <p>Pris: {product.price}kr</p>
        </div>

      </div>
    </>
  );
}

export default ProductItemSmall;