import { NextPageAuth } from '@/shared/types/auth.types';
import ActorsList from '@/components/screens/admin/actors/ActorsList';

const ActorsListPage: NextPageAuth = () => {
	return <ActorsList />;
};

ActorsListPage.isOnlyAdmin = true;

export default ActorsListPage;
