import { Button, TextField } from '@mui/material';

function AddToCart({ onAdd }) {
	let amount = 1;
	return (
		<>
            <div>
			<TextField
				InputProps={{ inputProps: { min: 1 } }}
				defaultValue={1}
				id="outlined-basic"
				label="Antal:"
				variant="filled"
				type="number"
				onChange={(e) => {
					amount = e.target.value;
				}}
			/>
            <br/>
          </div>
			<Button variant="contained" size="large" color="inherit" onClick={() => onAdd(1, amount)}>
				Lägg till produkt
			</Button>
		</>
	);
}

export default AddToCart;