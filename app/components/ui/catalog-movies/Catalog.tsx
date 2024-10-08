import { FC } from 'react';
import { ICatalog } from './catalog.interface';
import Meta from '@/utils/meta/Meta';
import Heading from '../heading/Heading';
import Description from '../heading/Description';
import GalleryItem from '../gallery/GalleryItem';
import styles from './Catalog.module.scss';
import { getMovieUrl } from 'config/url.config';

const Catalog: FC<ICatalog> = ({ movies, title, description }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.description} />
			)}
			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						item={{
							name: movie.title,
							link: getMovieUrl(movie.slug),
							posterPath: movie.bigPoster,
							content: { title: movie.title },
						}}
						variant="horizontal"
					/>
				))}
			</section>
		</Meta>
	);
};
export default Catalog;
