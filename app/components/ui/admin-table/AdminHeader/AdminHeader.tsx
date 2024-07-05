import { FC, ChangeEvent } from 'react';
import SearchField from '../../search-field/SearchField';
import AdminCreateButton from './AdminCreateButton';
import styles from './AdminHeader.module.scss';

interface IAdminHeader {
	onClick?: () => void;
	searchTerm: string;
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: FC<IAdminHeader> = ({
	onClick,
	handleSearch,
	searchTerm,
}) => {
	return (
		<div className={styles.header}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{onClick && <AdminCreateButton onCLick={onClick} />}
		</div>
	);
};
export default AdminHeader;
