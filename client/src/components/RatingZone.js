import { useState } from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Rating from '@mui/material/Rating';

function RatingZone({ onSave }) {
  const [rating, setRating] = useState(1);

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleSave = () => {
    onSave(rating);
  };

  return (
    <>
      <Box>
        <Rating
          onChange={handleRatingChange}
          name="Rating"
          value={rating}
          precision={1}
        />
      </Box>
      <Button onClick={handleSave}>Lägg till rating</Button>
    </>
  );
}

export default RatingZone;
