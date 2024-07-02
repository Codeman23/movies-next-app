import { FC } from 'react';
import Meta from '@/utils/meta/Meta';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';
import { useGenres } from './useGenres';

const GenresList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } =
		useGenres();

	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Genres" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Name', 'Slug']}
				tableItems={data || []}
			/>
		</Meta>
	);
};
export default GenresList;
