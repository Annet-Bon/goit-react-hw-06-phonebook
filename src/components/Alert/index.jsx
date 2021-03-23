import PropTypes from 'prop-types';
import styles from './alert.module.css';

export default function Alert ({ message }) {
	return (
		<div className={styles.back}>
			<p className={styles.message}>{message}</p>
		</div>
	);
};

Alert.propTypes = {
	message: PropTypes.string,
};