import { FC } from 'react';
import Meta from '@/utils/meta/Meta';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';
import { useUsers } from './useActors';

const ActorsList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers();

	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Actors" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Name', 'Count movies']}
				tableItems={data || []}
			/>
		</Meta>
	);
};
export default ActorsList;
