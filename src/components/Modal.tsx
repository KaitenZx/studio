import { FC, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import styles from './Modal.module.css';

interface ModalProps {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
	const overlayRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			gsap.fromTo(
				overlayRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.3, ease: 'power2.inOut' },
			);
			gsap.fromTo(
				modalRef.current,
				{ y: 50, opacity: 0, scale: 0.95 },
				{ y: 0, opacity: 1, scale: 1, duration: 0.3, ease: 'power2.inOut', delay: 0.1 },
			);
		}
	}, [isOpen]);

	const handleClose = () => {
		gsap.to(overlayRef.current, {
			opacity: 0,
			duration: 0.3,
			ease: 'power2.inOut',
			onComplete: onClose,
		});
		gsap.to(modalRef.current, {
			y: 50,
			opacity: 0,
			scale: 0.95,
			duration: 0.3,
			ease: 'power2.inOut',
		});
	};

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<div className={styles.overlay} ref={overlayRef} onClick={handleClose}>
			<div className={styles.modal} ref={modalRef} onClick={e => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={handleClose}>
					&times;
				</button>
				{children}
			</div>
		</div>,
		document.getElementById('modal-root')!,
	);
};

export default Modal; 