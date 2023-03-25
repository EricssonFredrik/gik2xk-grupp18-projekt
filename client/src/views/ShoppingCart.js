import ShoppingCartList from "../components/ShoppingCartList"
import { Grid } from "@mui/material";

function ShoppingCart() {
  return <Grid container columnSpacing={1} className="Home">
    <Grid className="Home__grid-item" item xs={12}><ShoppingCartList>
      </ShoppingCartList></Grid>
  </Grid>;
}
  
  export default ShoppingCart;