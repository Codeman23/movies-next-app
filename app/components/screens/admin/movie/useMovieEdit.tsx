import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { toastrError } from '@/utils/toastrError';
import { toastr } from 'react-redux-toastr';
import { getKeys } from '@/utils/object/getKeys';
import { IMovieEditInput } from './movie-edit.interface';
import { MovieService } from '@/services/movie.service';
import { getAdminUrl } from 'config/url.config';

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push, query } = useRouter();

	const genreId = String(query.id);

	const { isLoading } = useQuery(
		['movie', genreId],
		() => MovieService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError(error) {
				toastrError(error, 'Get movie');
			},
			enabled: !!query.id,
		}
	);

	const { mutateAsync } = useMutation(
		'update movie',
		(data: IMovieEditInput) => MovieService.update(genreId, data),
		{
			onSuccess: () => {
				toastr.success('Update movie', 'update was successful');
				push(getAdminUrl('movies'));
			},
			onError(error) {
				toastrError(error, 'Update movie');
			},
		}
	);

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data);
	};

	return { onSubmit, isLoading };
};
