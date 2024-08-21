import { UseFormSetValue, SubmitHandler } from 'react-hook-form';
import { useQuery, useMutation } from 'react-query';
import { UserService } from '@/services/user.service';
import { toastrError } from '@/utils/toastrError';
import { toastr } from 'react-redux-toastr';
import { IProfileInput } from './profile.interface';

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { isLoading } = useQuery('profile', () => UserService.getProfile(), {
		onSuccess: ({ data }) => {
			setValue('email', data.email);
		},
		onError(error) {
			toastrError(error, 'Get profile');
		},
	});

	const { mutateAsync } = useMutation(
		'update profile',
		(data: IProfileInput) => UserService.updateProfile(data),
		{
			onSuccess: () => {
				toastr.success('Update movie', 'update was successful');
			},
			onError(error) {
				toastrError(error, 'Update profile');
			},
		}
	);

	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};
