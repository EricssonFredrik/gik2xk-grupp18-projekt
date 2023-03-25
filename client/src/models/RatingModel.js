import api from '../api.js';

export async function getRating(id) {
    const result = await api.get(`/products/${id}/getRating`, {
		data: { id },
	});

    if (result.status === 200) return result.data;
    else {
        console.log(result.status);
        console.log(result.data);
        return{};
    }
}

export async function getAverageRating(id) {
	if (isNaN(id)) return;
  
	const ratings = await getRating(id);
	const average = ratings.reduce((total, { rating }
		)=> total + rating, 0) / ratings.length;
	
	return Math.round(average);
  }