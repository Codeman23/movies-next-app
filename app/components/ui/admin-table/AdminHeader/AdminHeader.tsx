import { FC, ChangeEvent } from 'react';
import SearchField from '../../search-field/SearchField';
import AdminCreateButton from './AdminCreateButton';
import styles from './AdminHeader.module.scss';

interface IAdminHeader {
	onCLick?: () => void;
	searchTerm: string;
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: FC<IAdminHeader> = ({
	onCLick,
	handleSearch,
	searchTerm,
}) => {
	return (
		<div className={styles.header}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{onCLick && <AdminCreateButton onCLick={onCLick} />}
		</div>
	);
};
export default AdminHeader;
