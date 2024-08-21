import { NextPageAuth } from '@/shared/types/auth.types';
import UserEdit from '@/components/screens/admin/user/UserEdit';

const UserEditPage: NextPageAuth = () => {
	return <UserEdit />;
};

UserEditPage.isOnlyAdmin = true;

export default UserEditPage;
