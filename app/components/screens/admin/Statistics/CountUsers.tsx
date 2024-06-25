import { AdminService } from '@/services/admin.service';
import { useQuery } from 'react-query';
import cn from 'classnames';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import styles from '../Admin.module.scss';

const CountUsers = () => {
	const { isLoading, data: response } = useQuery('Count users', () =>
		AdminService.getCountUsers()
	);

	console.log(response);

	return (
		<div className={cn(styles.block, styles.countUsers)}>
			<div>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className={styles.number}>{response?.data}</div>
				)}
				<div className={styles.description}>users</div>
			</div>
		</div>
	);
};
export default CountUsers;
