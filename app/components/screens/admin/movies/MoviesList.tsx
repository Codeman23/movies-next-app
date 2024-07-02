import { FC } from 'react';
import Meta from '@/utils/meta/Meta';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';
import { useMovies } from './useMovies';

const MoviesList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync } =
		useMovies();

	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Movies" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Title', 'Date', 'Rating']}
				tableItems={data || []}
			/>
		</Meta>
	);
};
export default MoviesList;
