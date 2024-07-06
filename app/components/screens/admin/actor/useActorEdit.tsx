import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { toastrError } from '@/utils/toastrError';
import { toastr } from 'react-redux-toastr';
import { getKeys } from '@/utils/object/getKeys';
import { IActorEditInput } from './actor-edit.interface';
import { ActorService } from '@/services/actor.service';
import { getAdminUrl } from 'config/url.config';

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { push, query } = useRouter();

	const genreId = String(query.id);

	const { isLoading } = useQuery(
		['actor', genreId],
		() => ActorService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError(error) {
				toastrError(error, 'Get actor');
			},
			enabled: !!query.id,
		}
	);

	const { mutateAsync } = useMutation(
		'update actor',
		(data: IActorEditInput) => ActorService.update(genreId, data),
		{
			onSuccess: () => {
				toastr.success('Update actor', 'update was successful');
				push(getAdminUrl('actors'));
			},
			onError(error) {
				toastrError(error, 'Update actor');
			},
		}
	);

	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};
