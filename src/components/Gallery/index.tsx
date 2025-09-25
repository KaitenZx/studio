import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import styles from './index.module.scss';
import {
	RevivalSite,
	RevivalInterface,
	RevivalMobile,
	BackofficeInterface,
	AidSite,
	AidCase,
	PezSite,
	Krays,
	Wedding
} from './CardBackgrounds';

import aidCase from '../../assets/screens/aid_case.webp';
import aidSite from '../../assets/screens/aid_site.webp';
import arivalAppDashboard from '../../assets/screens/arival_app_dashboard.webp';
import arivalAppFaceId from '../../assets/screens/arival_app_face_id.webp';
import arivalAppInsurance from '../../assets/screens/arival_app_insurance.webp';
import arivalAppSendMoney from '../../assets/screens/arival_app_send_money.webp';
import arivalAppSettings from '../../assets/screens/arival_app_settings.webp';
import arivalAppWelcomeScreen from '../../assets/screens/arival_app_welcome_screen.webp';
import arivalInterfaceDashboardMobile from '../../assets/screens/arival_interface_dashboard_mobile.webp';
import arivalInterfaceDashboard from '../../assets/screens/arival_interface_dashboard.webp';
import arival from '../../assets/screens/arival.webp';
import backofficeTrxDetails from '../../assets/screens/backoffice_trx_details.webp';
import kraysCase from '../../assets/screens/krays_case.webp';
import pezSite from '../../assets/screens/pez_site.webp';
import wedding from '../../assets/screens/wedding.webp';

gsap.registerPlugin(Observer);

const mobileAppImages = [
	arivalAppWelcomeScreen,
	arivalAppDashboard,
	arivalAppFaceId,
	arivalAppSendMoney,
	arivalAppSettings,
	arivalAppInsurance,
];

type GalleryItemBase = {
	id: number;
	title: string;
	description: string;
	link: string;
	category: string;
};

type GalleryItem =
	| (GalleryItemBase & { image: string })
	| (GalleryItemBase & { images: string[] })
	| (GalleryItemBase & { composite: { base: string; overlay: string } });

const allGalleryItems: GalleryItem[] = [
	{ id: 1, title: 'Revival Bank — Site', description: 'arival.com', link: '/project/1', category: 'Sites', image: arival },
	{ id: 2, title: 'Mobile App', description: 'Mobile App', link: '/project/2', category: 'Apps', images: mobileAppImages },
	{ id: 3, title: 'Krays Case', description: 'krays', link: '/project/3', category: 'Cases', image: kraysCase },
	{ id: 4, title: 'Backoffice', description: 'backoffice', link: '/project/4', category: 'Art', image: backofficeTrxDetails },
	{ id: 6, title: 'Aid Site', description: 'aidSite', link: '/project/6', category: 'Sites', image: aidSite },
	{ id: 7, title: 'Pez Presentation', description: 'pez', link: '/project/7', category: 'Presentations', image: pezSite },
	{ id: 8, title: 'Aid Case', description: 'aidcase', link: '/project/8', category: 'Cases', image: aidCase },
	{
		id: 10,
		title: 'Revival bank - Interface ',
		description: 'arival overlay',
		link: '/project/10',
		category: 'Art',
		composite: {
			base: arivalInterfaceDashboard,
			overlay: arivalInterfaceDashboardMobile,
		},
	},
	{ id: 11, title: 'Wedding', description: 'wedding', link: '/project/11', category: 'Presentations', image: wedding },
];

const filters = ['All', 'Apps', 'Cases', 'Sites', 'Presentations', 'Art'];

// Функция для получения фонового компонента по ID карточки
const getBackgroundComponent = (id: number) => {
	switch (id) {
		case 1: return RevivalSite;
		case 2: return RevivalMobile;
		case 3: return Krays;
		case 4: return BackofficeInterface;
		case 6: return AidSite;
		case 7: return PezSite;
		case 8: return AidCase;
		case 10: return RevivalInterface;
		case 11: return Wedding;
		default: return null;
	}
};

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
			setDisplayedItems(filtered as any);
		}
	}, [activeFilter]);

	useLayoutEffect(() => {
		const cards = gsap.utils.toArray<HTMLDivElement>(`.${styles.card}`);
		let currentTween: gsap.core.Tween | null = null;

		const handleMouseEnter = (e: MouseEvent) => {
			const card = e.currentTarget as HTMLDivElement;
			if (card.dataset.nohover === 'true') return;

			const media = card.querySelector<HTMLDivElement>(`.${styles.media}`);
			if (!media) return;

			if (currentTween && currentTween.isActive()) {
				currentTween.kill();
			}

			const cardHeight = card.offsetHeight;
			const mediaHeight = media.scrollHeight;
			const mediaTop = media.offsetTop; // distance from top of card to top of media
			const scrollDistance = Math.max(0, mediaHeight + mediaTop - cardHeight);

			if (scrollDistance > 0) {
				const scrollDuration = scrollDistance / 100;
				currentTween = gsap.to(media, {
					y: -scrollDistance,
					duration: scrollDuration,
					ease: 'none',
				});
			}
		};

		const handleMouseLeave = (e: MouseEvent) => {
			const card = e.currentTarget as HTMLDivElement;
			if (card.dataset.nohover === 'true') return;

			const media = card.querySelector<HTMLDivElement>(`.${styles.media}`);
			if (!media) return;

			if (currentTween && currentTween.isActive()) {
				currentTween.kill();
			}

			currentTween = gsap.to(media, {
				y: 0,
				duration: 0.5,
				ease: 'power2.out',
			});
		};

		cards.forEach(card => {
			card.addEventListener('mouseenter', handleMouseEnter);
			card.addEventListener('mouseleave', handleMouseLeave);
		});

		const ctx = gsap.context(() => {
			const container = containerRef.current;
			if (!container || displayedItems.length === 0) return;

			if (cards.length === 0) return;

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
				onRelease: () => rotateTo(0),
				onStop: () => rotateTo(0),
				onClick: (self: Observer) => {
					if (isDragging) {
						isDragging = false;
						return;
					}
					const link = (self.event.target as HTMLElement).closest(
						`.${styles.descriptionLink}`,
					) as HTMLAnchorElement | null;
					if (link) window.location.href = link.href;
				},
			});

			let wheelTween: gsap.core.Tween;
			Observer.create({
				target: window,
				type: 'wheel',
				lockAxis: true,
				onWheel: (self: Observer) => {
					total -= self.deltaX;
					xTo(total);
					const normalizedDelta = (self.deltaX / window.innerWidth) * 100;
					rotateTo(normalizedDelta);
					if (wheelTween) wheelTween.kill();
					wheelTween = gsap.delayedCall(0.2, () => rotateTo(0));
				},
			});
		}, wrapperRef);

		return () => {
			cards.forEach(card => {
				card.removeEventListener('mouseenter', handleMouseEnter);
				card.removeEventListener('mouseleave', handleMouseLeave);
			});
			ctx.revert();
		};
	}, [displayedItems]);

	return (
		<section ref={wrapperRef}>
			<div className={styles.wrapper}>
				<div className={styles.container} ref={containerRef}>
					{[...displayedItems, ...displayedItems].map((item, index) => {
						const BackgroundComponent = getBackgroundComponent(item.id);

						return (
							<div
								key={`${item.id}-${index}`}
								className={styles.card}
							>
								{BackgroundComponent && <BackgroundComponent />}
								<div className={styles.media}>
									<div className={styles.mediaHeader}>
										<h3 className={styles.cardTitle}>{item.title}</h3>
									</div>
									{'composite' in item ? (
										<div className={styles.compositeContainer}>
											<img
												src={item.composite.base}
												alt={`${item.title} base`}
												className={styles.compositeBase}
											/>
											<img
												src={item.composite.overlay}
												alt={`${item.title} overlay`}
												className={styles.compositeOverlay}
											/>
										</div>
									) : 'images' in item ? (
										<div className={styles.mobileSlideImagesContainer}>
											{item.images.map((src, i) => (
												<img
													key={src}
													src={src}
													alt={`App screen ${i + 1}`}
													className={styles.mobileSlideScreen}
												/>
											))}
										</div>
									) : (
										<img src={item.image} alt={item.description} className={styles.cardImage} />
									)}
								</div>
							</div>
						);
					})}
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
