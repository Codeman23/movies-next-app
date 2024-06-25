import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from 'react-query';
import cn from 'classnames';
import SubHeading from '@/components/ui/heading/SubHeading';
import { MovieService } from '@/services/movie.service';
import { IMovie } from '@/shared/types/movie.types';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import styles from '../Admin.module.scss';
import { getMovieUrl } from 'config/url.config';

const PopularMovie: FC = () => {
	const { isLoading, data: movie } = useQuery(
		'Most popular movie in admin',
		() => MovieService.getMostPopularMovies(),
		{
			select: (data): IMovie => data[0],
		}
	);

	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title="The most popular movie" />
			{isLoading ? (
				<SkeletonLoader className="h-48" />
			) : (
				movie && (
					<>
						<h3 className={styles.number}>Opened {movie?.countOpened} times</h3>
						<Link href={getMovieUrl(movie.slug)}>
							<Image
								width={285}
								height={176}
								src={movie.bigPoster}
								alt={movie.title}
								className={styles.image}
								unoptimized
							/>
						</Link>
					</>
				)
			)}
		</div>
	);
};
export default PopularMovie;
