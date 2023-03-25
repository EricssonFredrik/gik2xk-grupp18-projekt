import { Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import {getOne, create, remove, update} from '../models/ProductModel';


function ProductEdit() {
  const params = useParams();

  const productId = params.id;
  const emptyProduct = {
    id: 0,
    title: '',
    description: '',
    imageUrl: '',
    price: 0
  }; 

  const [product, setProduct] = useState(emptyProduct);

  useEffect(() => {
    if (!isNaN(productId)) {
      getOne(productId).then((product) =>    
        setProduct(product)
      );
    } else {
      setProduct(emptyProduct);
    }
  }, [productId]);
  
  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const newProduct = { ...product, [name]: value };
    setProduct(newProduct);
  }
  
  function onSave(){
    if (product.id === 0 ) {
      create({ ...product, userId: 1 }).then(() => console.log("Sparad"));
    } else {
      update(product).then(() => console.log("uppdaterad"));
    }
  }

  function onDelete() {
    remove(product.id).then(() => console.log('borttaget'));
  }

  return (
    <form>
      <TextField 
      value={product.title}
      onChange={onChange}
      name="title" 
      label="Titel" 
      variant="standard" 
      /> {''}
      <br />
      <TextField
        value={product.description}
        onChange={onChange}
        name="description"
        multiline
        minRows={4}
        label="Innehåll"
        variant="standard"
      />{' '}
      <br />
      <TextField
        value={product.price}
        onChange={onChange}
        name="price"
        label="Pris"
        variant="standard"
      />{' '}
      <br />
      <TextField
      value={product.imageUrl} 
      onChange={onChange} 
      name="imageUrl"
      label="Url till bild" 
      variant="standard" />
      <br />
      <Button onClick={onSave} variant="filled">Spara</Button>
      {product.id !== 0 && (
      <Button onClick={onDelete} variant="filled">Ta bort</Button>)}
  
    </form>
  );
}
  
  export default ProductEdit;