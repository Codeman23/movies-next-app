import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { IGalleryItemProps } from './gallery.interface';
import styles from './Gellery.module.scss';

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
	return (
		<Link
			className={cn(styles.item, {
				[styles.withText]: item.content,
				[styles.horizontal]: variant === 'horizontal',
				[styles.vertical]: variant === 'vertical',
			})}
			href={item.link}
		>
			<Image
				alt={item.name}
				src={item.posterPath}
				layout="fill"
				draggable={false}
				priority
			/>
			{item.content && (
				<div className={styles.content}>
					<div className={styles.title}>{item.content.title}</div>
					{item.content.subTitle && (
						<div className={styles.subTitle}>{item.content.subTitle}</div>
					)}
				</div>
			)}
		</Link>
	);
};
export default GalleryItem;
