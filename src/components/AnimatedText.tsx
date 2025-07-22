import { useRef, useLayoutEffect, FC, ElementType } from 'react';
import { gsap } from 'gsap';
import styles from './AnimatedText.module.css';

interface AnimatedTextProps {
	children: string;
	as?: ElementType;
	className?: string;
	isInline?: boolean;
	animateOnLoad?: boolean;
	loadAnimationDuration?: number;
}

const getChildIndex = (child: EventTarget | null) => {
	if (!(child instanceof Element) || !child.parentNode) return 0;
	return Array.from(child.parentNode.children).indexOf(child);
};

const AnimatedText: FC<AnimatedTextProps> = ({
	children,
	as: Component = 'span',
	className,
	isInline,
	animateOnLoad,
	loadAnimationDuration = 1,
}) => {
	const rootRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const root = rootRef.current;
			if (!root) return;

			if (animateOnLoad) {
				gsap.to(root.querySelectorAll(`.${styles.visible} span`), {
					yPercent: 100,
					ease: 'back.out(2)',
					duration: loadAnimationDuration,
					stagger: {
						each: 0.023,
						from: 0,
					},
				});

				gsap.to(root.querySelectorAll(`.${styles.hidden} span`), {
					yPercent: 100,
					ease: 'back.out(2)',
					duration: loadAnimationDuration,
					stagger: {
						each: 0.023,
						from: 0,
					},
					onComplete: () => {
						gsap.set(root.querySelectorAll('span'), { clearProps: 'all' });
					},
				});
			}

			const visibleLetters = root.querySelectorAll<HTMLSpanElement>(`.${styles.visible} .${styles.letter}`);

			const handleMouseOver = (e: MouseEvent) => {
				if (gsap.isTweening(visibleLetters)) {
					return;
				}

				if (e.target && (e.target as HTMLElement).classList.contains(styles.letter)) {
					root.classList.add(styles.hovered);
					const indexHover = getChildIndex(e.target);

					gsap.to(root.querySelectorAll(`.${styles.visible} span`), {
						yPercent: 100,
						ease: 'back.out(2)',
						duration: 0.6,
						stagger: {
							each: 0.023,
							from: indexHover,
						},
					});

					gsap.to(root.querySelectorAll(`.${styles.hidden} span`), {
						yPercent: 100,
						ease: 'back.out(2)',
						duration: 0.6,
						stagger: {
							each: 0.023,
							from: indexHover,
						},
						onComplete: () => {
							gsap.set(root.querySelectorAll('span'), { clearProps: 'all' });
							root.classList.remove(styles.hovered);
						},
					});
				}
			};

			root.addEventListener('mouseover', handleMouseOver);

		}, rootRef);
		return () => ctx.revert();
	}, [children, animateOnLoad, loadAnimationDuration]);

	const renderSpans = (text: string, className: string) => (
		<span className={className}>
			{text.split('').map((char, i) => (
				<span key={i} className={char === ' ' ? '' : styles.letter}>
					{char === ' ' ? '\u00A0' : char}
				</span>
			))}
		</span>
	);

	return (
		<Component className={`${styles.item} ${isInline ? styles.inline : ''} ${className || ''}`} ref={rootRef}>
			{renderSpans(children, styles.hidden)}
			{renderSpans(children, styles.visible)}
		</Component>
	);
};

export default AnimatedText; 