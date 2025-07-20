import styles from './About.module.css';

const About = () => {
	return (
		<section className={styles.about}>
			<h2>Hi, iambakulin.</h2>
			<p>I am multi-disciplinary designer, design-lead and glitch-artist, with 15+ years design-experience.</p>
			<p>I lead a small, highly qualified product-oriented <a href="#">team</a> I built while working as design lead at <a href="#">arival.com</a>. We take on complex app interfaces, startup MVPs, UX audits, websites, art projects, and more.</p>
			<p>Feel free to <a href="#">reach out</a> — we’re open to new collaborations.</p>
			<div className={styles.buttons}>
				<button className={styles.book}>Book a call</button>
				<button className={styles.chat}>Chat</button>
			</div>
		</section>
	);
};

export default About; 