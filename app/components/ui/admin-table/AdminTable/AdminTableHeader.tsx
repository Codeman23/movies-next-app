import { FC } from 'react';
import cn from 'classnames';
import styles from './AdminTable.module.scss';

const AdminTableHeader: FC<{ headerItems: string[] }> = ({ headerItems }) => {
	return (
		<div className={cn(styles.item, styles.itemHeader)}>
			{headerItems.map((value) => (
				<div key={value}>{value}</div>
			))}
			<div>Actions</div>
		</div>
	);
};
export default AdminTableHeader;
