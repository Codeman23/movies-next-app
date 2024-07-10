import { FC } from 'react';
import Meta from '@/utils/meta/Meta';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';
import AdminHeader from '@/components/ui/admin-table/AdminHeader/AdminHeader';
import AdminTable from '@/components/ui/admin-table/AdminTable/AdminTable';
import { useMovies } from './useMovies';

const MoviesList: FC = () => {
	const {
		handleSearch,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useMovies();

	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Movies" />
			<AdminHeader
				onClick={createAsync}
				handleSearch={handleSearch}
				searchTerm={searchTerm}
			/>
			<AdminTable
				tableItems={data || []}
				headerItems={['Title', 'Genres', 'Rating']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	);
};
export default MoviesList;
