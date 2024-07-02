import { ChangeEvent, useMemo, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useDebounce } from '@/hooks/useDebounce';
import { MovieService } from '@/services/movie.service';
import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface';
import { getAdminUrl } from 'config/url.config';
import { toastrError } from '@/utils/toastrError';
import { toastr } from 'react-redux-toastr';
import { getGenresList } from '@/utils/movie/getGenresList';

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		['movie list', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),

			onError: (error) => {
				toastrError(error, 'movie list');
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		'delete movie',
		(userId: string) => MovieService.deleteMovie(userId),
		{
			onError: (error) => {
				toastrError(error, 'Delete movie');
			},

			onSuccess: () => {
				toastr.success('Delete movie', 'delete was successful');
				queryData.refetch();
			},
		}
	);

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
		}),
		[queryData, searchTerm, deleteAsync]
	);
};
