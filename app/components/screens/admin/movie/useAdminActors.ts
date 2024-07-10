import { useQuery } from 'react-query';
import { ActorService } from '@/services/actor.service';
import { toastrError } from '@/utils/toastrError';
import { IOption } from '@/components/ui/select/select.interface';

export const useAdminActors = () => {
	const queryData = useQuery('List of actors', () => ActorService.getAll(), {
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					label: actor.name,
					value: actor._id,
				})
			),

		onError: (error) => {
			toastrError(error, 'actor list');
		},
	});

	return queryData;
};
