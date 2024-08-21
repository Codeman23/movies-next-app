import axios from 'api/interceptors';
import { getUsersUrl } from 'config/api.config';
import { IUser } from '@/shared/types/user.types';
import { IProfileInput } from '@/components/screens/profile/profile.interface';

export const UserService = {
	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm
				? {
						searchTerm,
					}
				: {},
		});
	},

	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'));
	},

	async updateProfile(data: IProfileInput) {
		return axios.put<string>(getUsersUrl('/profile'), data);
	},

	async getById(_id: string) {
		return axios.get<IUser>(getUsersUrl(`/${_id}`));
	},
	async update(_id: string, data: IProfileInput) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data);
	},

	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`));
	},
};
