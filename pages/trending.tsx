import { GetStaticProps, NextPage } from 'next';
import { IMovie } from '@/shared/types/movie.types';
import Catalog from '@/components/ui/catalog-movies/Catalog';
import { MovieService } from '@/services/movie.service';

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Trending movies"
			description="Trending movies in excellent quality: legal, safe, without ads"
		/>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await MovieService.getMostPopularMovies();

		return {
			props: {
				movies,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
export default TrendingPage;
