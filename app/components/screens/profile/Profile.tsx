import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { IProfileInput } from './profile.interface';
import { useProfile } from './useProfile';
import Meta from '@/utils/meta/Meta';
import Button from '@/components/ui/form-elements/Button';
import AuthFields from '../auth/AuthFields';
import Heading from '@/components/ui/heading/Heading';
import styles from './Profile.module.scss';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		});

	const { isLoading, onSubmit } = useProfile(setValue);

	return (
		<Meta title="Auth">
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Heading title="Profile" className="mb-6" />
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<AuthFields formState={formState} register={register} />
				)}
				<Button>Update</Button>
			</form>
		</Meta>
	);
};
export default Profile;
