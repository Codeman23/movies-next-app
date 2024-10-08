import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { toastrError } from '@/utils/toastrError';
import { toastr } from 'react-redux-toastr';
import { RatingService } from '@/services/rating.service';

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0);
	const [isSended, setIsSended] = useState(false);

	const { refetch } = useQuery(
		['your movie rating', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess: ({ data }) => {
				setRating(data);
			},
			onError(error) {
				toastrError(error, 'Get rating');
			},
			enabled: !!movieId,
		}
	);

	const { mutateAsync } = useMutation(
		'set rating movie',
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onError(error) {
				toastrError(error, 'Rate movie');
			},
			onSuccess: () => {
				toastr.success('Rate movie', 'You have successfully rated!');

				setIsSended(true);
				refetch();

				setTimeout(() => {
					setIsSended(false);
				}, 2400);
			},
		}
	);

	const handleClick = async (nextValue: number) => {
		setRating(nextValue);
		await mutateAsync({ value: nextValue });
	};

	return { isSended, rating, handleClick };
};
