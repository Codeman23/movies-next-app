import { useQuery } from 'react-query';
import { GenreService } from '@/services/genre.service';
import { toastrError } from '@/utils/toastrError';
import { IOption } from '@/components/ui/select/select.interface';

export const useAdminGenres = () => {
	const queryData = useQuery('List of genres', () => GenreService.getAll(), {
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					label: genre.name,
					value: genre._id,
				})
			),

		onError: (error) => {
			toastrError(error, 'genre list');
		},
	});

	return queryData;
};
