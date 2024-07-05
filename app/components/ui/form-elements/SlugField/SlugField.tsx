import { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import Field from '../Field';
import style from './SlugField.module.scss';

interface ISlugField {
	error?: FieldError;
	register: UseFormRegister<any>;
	generate: () => void;
}

const SlugField: FC<ISlugField> = ({ error, register, generate }) => {
	return (
		<div className="relative">
			<Field
				{...register('slug', { required: 'Slug is required!' })}
				placeholder="Slug"
				error={error}
			/>
			<div className={style.badge} onClick={generate}>
				generate
			</div>
		</div>
	);
};

export default SlugField;
