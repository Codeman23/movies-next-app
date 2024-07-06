import { ChangeEvent, useMemo, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useDebounce } from '@/hooks/useDebounce';
import { ActorService } from '@/services/actor.service';
import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface';
import { getAdminUrl } from 'config/url.config';
import { convertMongoDate } from '@/utils/date/convertMongoDate';
import { toastrError } from '@/utils/toastrError';
import { toastr } from 'react-redux-toastr';
import { useRouter } from 'next/router';

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearch = useDebounce(searchTerm, 500);

	const queryData = useQuery(
		['actor list', debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),

			onError: (error) => {
				toastrError(error, 'actor list');
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const { mutateAsync: deleteAsync } = useMutation(
		'delete actor',
		(userId: string) => ActorService.delete(userId),
		{
			onError: (error) => {
				toastrError(error, 'Delete actor');
			},

			onSuccess: () => {
				toastr.success('Delete actor', 'delete was successful');
				queryData.refetch();
			},
		}
	);

	const { push } = useRouter();

	const { mutateAsync: createAsync } = useMutation(
		'create actor',
		() => ActorService.create(),
		{
			onError: (error) => {
				toastrError(error, 'Create actor');
			},

			onSuccess: ({ data: _id }) => {
				toastr.success('Create actor', 'create was successful');
				push(getAdminUrl(`actor/edit/${_id}`));
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
