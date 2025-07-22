import styles from './Footer.module.css';
import AnimatedText from './AnimatedText';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.section}>
				<AnimatedText as="h3" className={styles.title}>
					Working stack
				</AnimatedText>
				<div className={styles.items}>
					<div className={styles.item}></div>
					<div className={styles.item}></div>
					<div className={styles.item}></div>
					<div className={styles.item}></div>
				</div>
			</div>
			<div className={styles.section}>
				<AnimatedText as="h3" className={styles.title}>
					Team
				</AnimatedText>
				<div className={styles.items}>
					<div className={styles.item}></div>
					<div className={styles.item}></div>
					<div className={styles.item}></div>
					<div className={styles.item}></div>
					<div className={styles.item}></div>
					<div className={styles.item}></div>
				</div>
			</div>
		</footer>
	);
};

export default Footer; 