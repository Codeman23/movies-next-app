import axios from 'api/interceptors';
import { axiosClassic } from 'api/interceptors';
import { getMoviesUrl } from 'config/api.config';
import { IMovie } from '@/shared/types/movie.types';
import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface';

export const MovieService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(``), {
			params: searchTerm
				? {
						searchTerm,
					}
				: {},
		});
	},

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		);
		return movies;
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`));
	},
	async update(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data);
	},

	async create() {
		return axios.post<string>(getMoviesUrl('/'));
	},

	async delete(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`));
	},
};
