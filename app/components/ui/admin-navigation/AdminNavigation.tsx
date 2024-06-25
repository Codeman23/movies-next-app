import { FC } from 'react';
import AdminNavItem from './AdminNavItem';
import { navItems } from './admin-navigation.data';
import { INavItem } from './admin-navigation.interface';
import styles from './AdminNavigation.module.scss';

const AdminNavigation: FC = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{navItems.map((item: INavItem) => (
					<AdminNavItem key={item.link} item={item} />
				))}
			</ul>
		</nav>
	);
};
export default AdminNavigation;
