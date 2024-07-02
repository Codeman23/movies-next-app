import { NextPageAuth } from '@/shared/types/auth.types';
import MovieList from '@/components/screens/admin/movies/MoviesList';

const MoviesListPage: NextPageAuth = () => {
	return <MovieList />;
};

MoviesListPage.isOnlyAdmin = true;

export default MoviesListPage;
