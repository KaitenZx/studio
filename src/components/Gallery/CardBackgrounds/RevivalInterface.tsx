/** @paper-design/shaders-react@0.0.54 */
import { Heatmap } from '@paper-design/shaders-react';

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K5V1CJP65FB9RG3Q8W88XVBF?node=01K5V4BZEBSH81B3C0YYBNW53T
 * on Sep 25, 2025 at 6:53 PM.
 */
export default function RevivalInterface() {
	return (
		<div style={{
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: -1,
			pointerEvents: 'none'
		}}>
			<Heatmap
				colors={['#11206A', '#1F3BA2', '#2F63E7', '#6BD7FF', '#FFE679', '#FF991E', '#FF4C00']}
				colorBack="#00000000"
				speed={1.6}
				contour={0.5}
				angle={0}
				noise={0.35}
				innerGlow={0.5}
				outerGlow={0.5}
				scale={0.7}
				image="https://shaders.paper.design/images/image-filters/0019.webp"
				frame={2258153.797999544}
				style={{
					backgroundColor: '#000000',
					borderRadius: '0px',
					height: '100%',
					mixBlendMode: 'difference',
					width: '100%'
				}}
			/>
		</div>
	);
}
