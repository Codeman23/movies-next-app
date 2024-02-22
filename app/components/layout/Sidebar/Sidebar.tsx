import Search from './Search/Search';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<Search />
			{/* movies contaier */}
		</div>
	);
};

export default Sidebar;
