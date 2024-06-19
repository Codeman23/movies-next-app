import { forwardRef } from 'react';
import cn from 'classnames';
import { IField } from './form.interface';
import styles from './form.module.scss';

//forwardRef оборачивает компонент
const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={cn(styles.common, styles.field)} style={style}>
				<label>
					<span>{placeholder}</span>
					<input ref={ref} type="text" {...rest} />
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		);
	}
);

// Field.displayName = 'Field';
//фиксит баг с displayName при forwardRef видимо не актуален более

export default Field;
