/** @paper-design/shaders-react@0.0.54 */
import { SmokeRing } from '@paper-design/shaders-react';

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K5V1CJP65FB9RG3Q8W88XVBF?node=01K5V26PVNSFYN1NB6VW10YZKZ
 * on Sep 25, 2025 at 6:53 PM.
 */
export default function BackofficeInterface() {
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
			<SmokeRing
				speed={0.5}
				scale={0.65}
				thickness={0.65}
				radius={0.25}
				innerShape={0.7}
				noiseScale={3}
				noiseIterations={8}
				offsetX={0}
				offsetY={0}
				colors={['#FFD8DB']}
				colorBack="#00000000"
				frame={1027883.2500001154}
				style={{
					backgroundColor: '#000000',
					height: '100%',
					mixBlendMode: 'difference',
					width: '100%'
				}}
			/>
		</div>
	);
}
