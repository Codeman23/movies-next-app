import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { IMovie } from '@/shared/types/movie.types';
import Error404 from '../404';
import SingleMovie from '@/components/screens/single-movie/SingleMovie';
import { MovieService } from '@/services/movie.service';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import { getMovieUrl } from 'config/url.config';

export interface IMoviePageProps {
	movie: IMovie | undefined;
	similarMovies: IGalleryItem[];
}

const MoviePage: NextPage<IMoviePageProps> = ({ similarMovies, movie }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies || []} />
	) : (
		<Error404 />
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll();
		const paths = movies.map((a) => ({ params: { slug: a.slug } }));

		return { paths, fallback: 'blocking' };
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug));

		const responseSimilarMovies = await MovieService.getByGenres(
			movie.genres.map((g) => g._id)
		);

		const similarMovies: IGalleryItem[] = responseSimilarMovies.data
			.filter((m) => m._id !== movie._id)
			.map((m) => ({
				name: m.title,
				posterPath: m.poster,
				link: getMovieUrl(m.slug),
			}));

		return {
			props: {
				similarMovies,
				movie,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
export default MoviePage;
