import styles from './Gallery.module.css';

const galleryItems = [
	{ id: 1, description: 'arival.com' },
	{ id: 2, description: 'project-x.com' },
	{ id: 3, description: 'design-case.io' },
	{ id: 4, description: 'art-project.dev' },
];

const Gallery = () => {
	return (
		<section className={styles.galleryContainer}>
			<div className={styles.gallery}>
				{galleryItems.map(item => (
					<div key={item.id} className={styles.galleryItem}>
						<div className={styles.placeholder}></div>
						<p>{item.description}</p>
					</div>
				))}
			</div>
			<div className={styles.filters}>
				<button className={styles.active}>All</button>
				<button>Apps</button>
				<button>Cases</button>
				<button>Sites</button>
				<button>Presentations</button>
				<button>Shaders</button>
				<button>Art</button>
			</div>
		</section>
	);
};

export default Gallery; 