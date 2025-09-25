/** @paper-design/shaders-react@0.0.54 */
import { MeshGradient } from '@paper-design/shaders-react';

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K5V1CJP65FB9RG3Q8W88XVBF?node=01K5V1V9J1ZVTVX6GBM2DPR2HR
 * on Sep 25, 2025 at 6:55 PM.
 */
export default function PezSite() {
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
			<MeshGradient
				speed={0.98}
				colors={['#D1CCF2', '#7000E0']}
				distortion={0.8}
				swirl={0.6}
				grainMixer={0.11}
				grainOverlay={0.21}
				frame={447983.2899998557}
				style={{
					height: '100%',
					width: '100%'
				}}
			/>
		</div>
	);
}
