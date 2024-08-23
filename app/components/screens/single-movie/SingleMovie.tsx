import { FC } from 'react';
import dynamic from 'next/dynamic';
import Meta from '@/utils/meta/Meta';
import Banner from '@/components/ui/banner/Banner';
import SubHeading from '@/components/ui/heading/SubHeading';
import Gallery from '@/components/ui/gallery/Gallery';
import { IMoviePageProps } from '../../../../pages/movie/[slug]';
import Content from './Content/Content';

const DynamicPlayer = dynamic(
	() => import('@/components/ui/video-player/VideoPlayer'),
	{ ssr: false }
);

const SingleMovie: FC<IMoviePageProps> = ({ similarMovies, movie }) => {
	return (
		<Meta title={`${movie?.title}`} description={`Watch ${movie?.title}`}>
			{movie && (
				<Banner
					image={`${movie?.bigPoster}`}
					Detail={() => <Content movie={movie} />}
				/>
			)}
			{/* Video player */}
			<DynamicPlayer
				slug={`${movie?.slug}`}
				videoSource={`${movie?.videoUrl}`}
			/>

			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>

			{/* Rating */}
		</Meta>
	);
};
export default SingleMovie;
