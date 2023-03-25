function Ratings({ ratings }) {
	if (!ratings || ratings.length === 0) {
	  return <>Ratings saknas</>;
	}
  
	return (
	  <>
		{ratings.map(({ id, rating }) => (
		  <div key={id}>{`${rating} av 5`}</div>
		))}
	  </>
	);
  }
  
  export default Ratings;
  
