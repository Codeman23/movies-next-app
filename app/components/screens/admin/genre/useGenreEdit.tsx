import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { toastrError } from '@/utils/toastrError';
import { toastr } from 'react-redux-toastr';
import { getKeys } from '@/utils/object/getKeys';
import { IGenreEditInput } from './genre-edit.interface';
import { GenreService } from '@/services/genre.service';
import { getAdminUrl } from 'config/url.config';

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter();

	const genreId = String(query.id);

	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError(error) {
				toastrError(error, 'Get genre');
			},
			enabled: !!query.id,
		}
	);

	const { mutateAsync } = useMutation(
		'update genre',
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			onSuccess: () => {
				toastr.success('Update genre', 'update was successful');
				push(getAdminUrl('genres'));
			},
			onError(error) {
				toastrError(error, 'Update genre');
			},
		}
	);

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};
