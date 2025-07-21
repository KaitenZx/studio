import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import styles from './Gallery.module.css';

gsap.registerPlugin(Observer);

const allGalleryItems = [
	{ id: 1, description: 'arival.com', link: '/project/1', category: 'Sites' },
	{ id: 2, description: 'project-x.com', link: '/project/2', category: 'Apps' },
	{ id: 3, description: 'design-case.io', link: '/project/3', category: 'Cases' },
	{ id: 4, description: 'art-project.dev', link: '/project/4', category: 'Art' },
	{ id: 5, description: 'startup-mvp.com', link: '/project/5', category: 'Apps' },
	{ id: 6, description: 'another-one.org', link: '/project/6', category: 'Sites' },
	{ id: 7, description: 'last-item.net', link: '/project/7', category: 'Presentations' },
	{ id: 8, description: 'ux-audit.co', link: '/project/8', category: 'Cases' },
	{ id: 9, description: 'glitch-art.gallery', link: '/project/9', category: 'Art' },
	{ id: 10, description: 'pixel-perfect.art', link: '/project/10', category: 'Art' },
	{ id: 11, description: 'keynote-template.co', link: '/project/11', category: 'Presentations' },
	{ id: 12, description: 'webgl-shader.xyz', link: '/project/12', category: 'Shaders' },
	{ id: 13, description: 'shader-toy-clone.com', link: '/project/13', category: 'Shaders' },
	{ id: 14, description: 'e-commerce-site.shop', link: '/project/14', category: 'Sites' },
	{ id: 15, description: 'mobile-app-pro.io', link: '/project/15', category: 'Apps' },
];

const filters = ['All', 'Apps', 'Cases', 'Sites', 'Presentations', 'Shaders', 'Art'];

const Gallery = () => {
	const [activeFilter, setActiveFilter] = useState(filters[0]);
	const [displayedItems, setDisplayedItems] = useState(allGalleryItems);
	const containerRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (activeFilter === 'All') {
			setDisplayedItems(allGalleryItems);
		} else {
			const filtered = allGalleryItems.filter(item => item.category === activeFilter);
			setDisplayedItems(filtered);
		}
	}, [activeFilter]);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const container = containerRef.current;
			if (!container || displayedItems.length === 0) return;

			const cards = gsap.utils.toArray<HTMLDivElement>(`.${styles.card}`, container);
			if (cards.length === 0) return;

			// Staggered fade-in animation for new cards
			gsap.from(cards, {
				opacity: 0,
				duration: 0.8,
				stagger: 0.1,
				ease: 'sine.out',
			});

			const half = container.clientWidth / 2;
			if (half === 0) return;

			const wrap = gsap.utils.wrap(-half, 0);

			let total = 0;

			const xTo = gsap.quickTo(container, 'x', {
				duration: 0.5,
				ease: 'power3',
				modifiers: {
					x: gsap.utils.unitize(wrap),
				},
			});

			const rotateTo = gsap.quickTo(cards, 'rotation', {
				duration: 1,
				ease: 'power3',
			});

			// Observer for direct drag on the gallery
			let isDragging = false;
			Observer.create({
				target: container,
				type: 'touch,pointer',
				onDragStart: () => {
					isDragging = true;
				},
				onDrag: (self: Observer) => {
					total += self.deltaX;
					xTo(total);

					const normalizedDelta = (self.deltaX / window.innerWidth) * 100;
					rotateTo(-normalizedDelta);
				},
				onRelease: () => {
					rotateTo(0);
				},
				onStop: () => {
					rotateTo(0);
				},
				onClick: (self: Observer) => {
					if (isDragging) {
						isDragging = false;
						return;
					}
					const link = (self.event.target as HTMLElement).closest(
						`.${styles.descriptionLink}`,
					) as HTMLAnchorElement | null;

					if (link) {
						window.location.href = link.href;
					}
				},
			});

			// Observer for global horizontal scroll
			let wheelTween: gsap.core.Tween;
			Observer.create({
				target: window,
				type: 'wheel',
				lockAxis: true, // Fire only when scrolling predominantly on one axis
				onWheel: (self: Observer) => {
					total -= self.deltaX; // Invert deltaX for natural scrolling
					xTo(total);

					const normalizedDelta = (self.deltaX / window.innerWidth) * 100;
					rotateTo(normalizedDelta); // Invert rotation to match direction

					if (wheelTween) wheelTween.kill();
					wheelTween = gsap.delayedCall(0.2, () => rotateTo(0));
				},
			});
		}, wrapperRef);

		return () => ctx.revert();
	}, [displayedItems]);

	return (
		<section ref={wrapperRef}>
			<div className={styles.wrapper}>
				<div className={styles.container} ref={containerRef}>
					{[...displayedItems, ...displayedItems].map((item, index) => (
						<div key={`${item.id}-${index}`} className={styles.card}>
							<div className={styles.placeholderImage} />
							<a
								href={item.link}
								className={styles.descriptionLink}
								onClick={e => e.preventDefault()}
							>
								<p className={styles.description}>{item.description}</p>
							</a>
						</div>
					))}
				</div>
			</div>
			<div className={styles.filters}>
				{filters.map(filter => (
					<button
						key={filter}
						className={activeFilter === filter ? styles.active : ''}
						onClick={() => setActiveFilter(filter)}
					>
						{filter}
					</button>
				))}
			</div>
		</section>
	);
};

export default Gallery; 