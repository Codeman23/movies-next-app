import { FC } from 'react';
import Heading from '@/components/ui/heading/Heading';
import Meta from '@/utils/meta/Meta';
import Slider from '@/components/ui/slider/Slider';
import { IHome } from './home.interface';

const Home: FC<IHome> = ({ slides }) => {
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
		</Meta>
	);
};

export default Home;
