import { NextPageAuth } from '@/shared/types/auth.types';
import ActorsEdit from '@/components/screens/admin/actor/ActorEdit';

const ActorEditPage: NextPageAuth = () => {
	return <ActorsEdit />;
};

ActorEditPage.isOnlyAdmin = true;

export default ActorEditPage;
