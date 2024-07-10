import { NextPage, GetStaticProps } from 'next';
import { MovieService } from '@/services/movie.service';
import { getMovieUrl } from 'config/url.config';
import { getGenresList } from '@/utils/movie/getGenresList';
import { ISlide } from '@/components/ui/slider/slider.interface';
import { IHome } from '@/components/screens/home/home.interface';

import Home from '@/components/screens/home/Home';

const HomePage: NextPage<IHome> = ({ slides }) => {
	return <Home slides={slides} />;
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll();

		const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getMovieUrl(m.slug),
			subTitle: getGenresList(m.genres),
			title: m.title,
			bigPoster: m.bigPoster,
		}));

		return {
			props: {
				slides,
			} as IHome,
		};
	} catch (error) {
		return {
			props: {
				slides: [],
			} as IHome,
		};
	}
};

export default HomePage;
