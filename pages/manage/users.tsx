import { NextPageAuth } from '@/shared/types/auth.types';
import UsersList from '@/components/screens/admin/users/UserList';

const UserListPage: NextPageAuth = () => {
	return <UsersList />;
};

UserListPage.isOnlyAdmin = true;

export default UserListPage;
