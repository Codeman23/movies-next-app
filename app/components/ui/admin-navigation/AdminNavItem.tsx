import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { INavItem } from './admin-navigation.interface';
import styles from './AdminNavigation.module.scss';

const AdminNavItem: FC<{ item: INavItem }> = ({ item: { link, title } }) => {
	const { asPath } = useRouter();

	return (
		<li>
			<Link href={link} className={cn({ [styles.active]: asPath === link })}>
				{title}
			</Link>
		</li>
	);
};
export default AdminNavItem;
