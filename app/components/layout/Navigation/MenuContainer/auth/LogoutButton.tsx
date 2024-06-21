import MaterialIcon from '@/components/ui/MaterialIcon';
import { useActions } from '@/hooks/useActions';
import { FC, MouseEvent } from 'react';

const LogoutButton: FC = () => {
	const { logout } = useActions();

	const handleLogout = (evt: MouseEvent<HTMLAnchorElement>) => {
		evt.preventDefault();
		logout();
	};

	return (
		<li>
			<a onClick={handleLogout}>
				<MaterialIcon name="MdLogout" />
				<span>Logout</span>
			</a>
		</li>
	);
};
export default LogoutButton;
