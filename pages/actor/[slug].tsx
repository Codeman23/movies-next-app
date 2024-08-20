import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { IActor, IMovie } from '@/shared/types/movie.types';
import Catalog from '@/components/ui/catalog-movies/Catalog';
import { MovieService } from '@/services/movie.service';
import { ActorService } from '@/services/actor.service';
import Error404 from '../404';

interface IActorPageProps {
	movies: IMovie[];
	actor: IActor | undefined;
}

const ActorPage: NextPage<IActorPageProps> = ({ movies, actor }) => {
	return actor ? (
		<Catalog movies={movies || []} title={actor.name} />
	) : (
		<Error404 />
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await ActorService.getAll();
		const paths = genres.map((a) => ({ params: { slug: a.slug } }));

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
		const { data: actor } = await ActorService.getBySlug(String(params?.slug));

		const { data: movies } = await MovieService.getByActor(actor._id);

		return {
			props: {
				movies,
				actor,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
export default ActorPage;
