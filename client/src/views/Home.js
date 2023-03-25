import ProductList from "../components/ProductList"
import { Grid } from "@mui/material";
import "./Home.css"

  function Home() {
      return <Grid container columnSpacing={1} className="Home">
        <Grid className="Home__grid-item" item xs={12}>
          <ProductList></ProductList>
          </Grid>

  
      </Grid>;
    }
    
    export default Home;