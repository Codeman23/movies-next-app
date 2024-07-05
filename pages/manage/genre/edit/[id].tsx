import { NextPageAuth } from '@/shared/types/auth.types';
import ActorsList from '@/components/screens/admin/genre/GenreEdit';

const GenreEditPage: NextPageAuth = () => {
	return <ActorsList />;
};

GenreEditPage.isOnlyAdmin = true;

export default GenreEditPage;
