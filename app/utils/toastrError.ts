import { errorCatch } from 'api/api.helper';
import { toastr } from 'react-redux-toastr';

export const toastrError = (error: any, title?: string) => {
	const message = errorCatch(error);
	toastr.error(title || 'Error request', message);
	throw message;
};
