import { FC, useLayoutEffect, useRef, ElementType } from 'react';
import { gsap } from 'gsap';
import styles from './RandomizedText.module.css';

function wrapTextInSpans(element: HTMLElement) {
	const text = element.textContent || '';
	element.innerHTML = text
		.split(' ')
		.map(
			word =>
				`<span class="${styles.word}">${word
					.split('')
					.map(char => `<span class="${styles.letter}"><span>${char}</span></span>`)
					.join('')}</span>`,
		)
		.join(' ');
}

interface RandomizedTextProps {
	children: string;
	as?: ElementType;
	className?: string;
	delay?: number;
}

const RandomizedText: FC<RandomizedTextProps> = ({ children, as: Component = 'div', className, delay = 0 }) => {
	const rootRef = useRef<HTMLElement>(null);

	useLayoutEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		root.textContent = children;
		wrapTextInSpans(root);

		const letters = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.letter} > span`));

		const ctx = gsap.context(() => {
			gsap.set(letters, { y: '100%' });

			gsap.to(letters, {
				y: '0%',
				ease: 'power4.inOut',
				duration: 0.6,
				stagger: {
					each: 0.02,
					from: 'random',
				},
				delay: delay,
			});
		}, root);

		return () => ctx.revert();
	}, [children, delay]);

	return <Component ref={rootRef} className={className || ''} />;
};

export default RandomizedText; 