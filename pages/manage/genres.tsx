import { NextPageAuth } from '@/shared/types/auth.types';
import GenresList from '@/components/screens/admin/genres/GenresList';

const GenresListPage: NextPageAuth = () => {
	return <GenresList />;
};

GenresListPage.isOnlyAdmin = true;

export default GenresListPage;
