import { FC } from 'react';

import Heading from '@/components/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import { IHome } from './home.interface';

const Home: FC<IHome> = () => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch movies online and TV everyday."
		>
			<Heading
				title="Watch movies online"
				className="text-gray-500 mb-8 text-xl"
			/>
		</Meta>
	);
};

export default Home;
