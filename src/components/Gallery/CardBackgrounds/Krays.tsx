/** @paper-design/shaders-react@0.0.54 */
import { Warp } from '@paper-design/shaders-react';

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K5V1CJP65FB9RG3Q8W88XVBF?node=01K5V2S3NBEM000H0VJV75DX7Z
 * on Sep 25, 2025 at 6:55 PM.
 */
export default function Krays() {
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
			<Warp
				colors={['#FFC8BF', '#FF9A8C', '#FF8473', '#7B251D']}
				speed={0.7}
				scale={3.05}
				softness={0.38}
				proportion={0.48}
				swirl={0.62}
				swirlIterations={10}
				shape="checks"
				distortion={0.86}
				shapeScale={0}
				frame={15738.21999980935}
				style={{
					height: '100%',
					width: '100%'
				}}
			/>
		</div>
	);
}
