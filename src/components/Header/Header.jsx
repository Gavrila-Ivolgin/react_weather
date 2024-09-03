import styles from './Header.module.css';

function Header() {

	return (
		<div className="logo-container">
			<img className={styles.logo} src="/logo.svg" alt="logo"/>
		</div>
	);
}

export default Header;