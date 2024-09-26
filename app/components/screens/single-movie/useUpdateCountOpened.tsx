import { MovieService } from '@/services/movie.service';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

const useUpdateCountOpened = (slug: string) => {
	const { mutateAsync } = useMutation('update count opened', () =>
		MovieService.updateCountOpened(slug)
	);

	useEffect(() => {
		mutateAsync();
	}, []);
};

export default useUpdateCountOpened;
