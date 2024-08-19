import { FC } from 'react';
import Heading from '@/components/ui/heading/Heading';
import Meta from '@/utils/meta/Meta';
import Slider from '@/components/ui/slider/Slider';
import { IHome } from './home.interface';
import SubHeading from '@/components/ui/heading/SubHeading';
import Gallery from '@/components/ui/gallery/Gallery';

const Home: FC<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch movies online and TV everyday."
		>
			<Heading
				title="Watch movies online"
				className="text-gray-500 mb-8 text-xl"
			/>
			{slides.length && <Slider slides={slides} />}
			<div className="my-10">
				<SubHeading title="Trending now" />
				{trendingMovies.length && <Gallery items={trendingMovies} />}
			</div>
			<div>
				<SubHeading title="Best actors" />
				{actors.length && <Gallery items={actors} />}
			</div>
		</Meta>
	);
};

export default Home;
