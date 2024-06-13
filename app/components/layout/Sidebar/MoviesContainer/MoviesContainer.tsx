import FavoriteMovies from './FavoriteMovies/FavoriteMovies';
import PopularMovies from './PopularMovies';

const MoviesContainer = () => {
	return (
		<div>
			<PopularMovies />
			<FavoriteMovies />
		</div>
	);
};
export default MoviesContainer;
