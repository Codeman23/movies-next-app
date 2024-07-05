import { ChangeEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from 'react-query';
import { useDebounce } from '@/hooks/useDebounce';
import { GenreService } from '@/services/genre.service';
import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface';
import { getAdminUrl } from 'config/url.config';
import { toastrError } from '@/utils/toastrError';
import { toastr } from 'react-redux-toastr';

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		['genre list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),

			onError: (error) => {
				toastrError(error, 'genre list');
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { push } = useRouter();

	const { mutateAsync: createAsync } = useMutation(
		'create genre',
		(userId: string) => GenreService.create(),
		{
			onError: (error) => {
				toastrError(error, 'Create genre');
			},

			onSuccess: ({ data: _id }) => {
				toastr.success('Create genre', 'create was successful');
				push(getAdminUrl(`genre/edit/${_id}`));
			},
		}
	);

	const { mutateAsync: deleteAsync } = useMutation(
		'delete genre',
		(userId: string) => GenreService.delete(userId),
		{
			onError: (error) => {
				toastrError(error, 'Delete genre');
			},

			onSuccess: () => {
				toastr.success('Delete genre', 'delete was successful');
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
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	);
};
