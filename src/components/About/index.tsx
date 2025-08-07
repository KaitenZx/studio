import { useState } from 'react';
import styles from './index.module.scss';
import AnimatedText from '../AnimatedText';
import RandomizedText from '../RandomizedText';
import Modal from '../Modal';
import RequestForm from '../RequestForm';

const About = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<section className={styles.about}>
				<AnimatedText as="h2" className={styles.title}>
					Hi, iambakulin.
				</AnimatedText>
				<RandomizedText as="p">
					I am multi-disciplinary designer, design-lead and glitch-artist, with 15+ years design-experience.
				</RandomizedText>
				<p>
					<RandomizedText as="span">I lead a small, highly qualified product-oriented</RandomizedText>{' '}
					<a href="#">
						<AnimatedText as="span" isInline animateOnLoad>
							team
						</AnimatedText>
					</a>{' '}
					<RandomizedText as="span">I built while working as design lead at</RandomizedText>{' '}
					<a href="#">
						<AnimatedText as="span" isInline animateOnLoad>
							arival.com
						</AnimatedText>
					</a>
					<RandomizedText as="span">
						. We take on complex app interfaces, startup MVPs, UX audits, websites, art projects, and more.
					</RandomizedText>
				</p>
				<p>
					<RandomizedText as="span">Feel free to</RandomizedText>{' '}
					<a href="#">
						<AnimatedText as="span" isInline animateOnLoad>
							reach out
						</AnimatedText>
					</a>{' '}
					<RandomizedText as="span">— we’re open to new collaborations.</RandomizedText>
				</p>
				<div className={styles.buttons}>
					<a
						href="https://calendly.com/your-link"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.book}
					>
						Book a call
					</a>
					<a
						href="https://t.me/ktnntn"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.chat}
					>
						Chat
					</a>
					<button className={styles.request} onClick={() => setIsModalOpen(true)}>
						Оставить заявку
					</button>
				</div>
			</section>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<RequestForm />
			</Modal>
		</>
	);
};

export default About; 