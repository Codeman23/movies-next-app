import { getMovieUrl } from 'config/url.config';
import Link from 'next/link';
import { FC } from 'react';

import styles from './AuthPlaceholder.module.scss';

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
	return (
		<Link className={styles.btn} href={`/auth?redirect=${getMovieUrl(slug)}`}>
			Sign in
		</Link>
	);
};

export default AuthButton;
