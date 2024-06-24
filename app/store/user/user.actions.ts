import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthResponse, IEmailPassword } from './user.interface';
import { AuthService } from '@/services/auth/auth.service';
import { toastr } from 'react-redux-toastr';
import { toastrError } from '@/utils/toastrError';
import { errorCatch } from 'api/api.helper';

/* register */
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.register(email, password);
			toastr.success('Registration', 'Completed successfully');
			return response.data;
		} catch (error) {
			toastrError(error);
			return thunkApi.rejectWithValue(error);
		}
	}
);

/* login */
export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.login(email, password);
			toastr.success('Login', 'Completed successfully');
			return response.data;
		} catch (error) {
			toastrError(error);
			return thunkApi.rejectWithValue(error);
		}
	}
);

/* logout */
export const logout = createAsyncThunk('auth/logout', () => {
	AuthService.logout();
});

/* checkAuth */
export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/checkAuth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens();
			return response.data;
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				toastr.error(
					'Logout',
					'Your authorization is finished, plz sign in again'
				);
				thunkApi.dispatch(logout());
			}
			return thunkApi.rejectWithValue(error);
		}
	}
);
