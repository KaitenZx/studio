/** @paper-design/shaders-react@0.0.54 */
import { NeuroNoise } from '@paper-design/shaders-react';

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K5V1CJP65FB9RG3Q8W88XVBF?node=01K5VBCNY9XZ0FQYB9P43GA73H
 * on Sep 25, 2025 at 6:28 PM.
 */
export default function AnimatedBackground() {
	return (
		<div style={{
			position: 'fixed',
			top: 0,
			left: 0,
			width: '100vw',
			height: '100vh',
			zIndex: -1,
			pointerEvents: 'none'
		}}>
			<NeuroNoise
				colorBack="#00000000"
				colorMid="#FE7DA1"
				colorFront="#FFFFFF"
				scale={0.73}
				speed={0.72}
				contrast={0.58}
				brightness={0}
				frame={41857929.54100106}
				style={{
					backgroundColor: '#FFFFFF',
					height: '100%',
					width: '100%'
				}}
			/>
		</div>
	);
}
