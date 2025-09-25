/** @paper-design/shaders-react@0.0.54 */
import { GrainGradient } from '@paper-design/shaders-react';

/**
 * Code exported from Paper
 * https://app.paper.design/file/01K5V1CJP65FB9RG3Q8W88XVBF?node=01K5V2WCFZZ9YH68T1HK3QK7JK
 * on Sep 25, 2025 at 6:55 PM.
 */
export default function AidCase() {
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
			<GrainGradient
				colors={['#98BEF3', '#8AD5FC', '#6F8EF3']}
				colorBack="#00000000"
				speed={0.5}
				scale={2.66}
				rotation={209}
				offsetX={-1}
				offsetY={0.72}
				softness={0.69}
				intensity={0.29}
				noise={0.13}
				shape="corners"
				frame={350976.180000009}
				style={{
					backgroundColor: '#E6EAFF',
					height: '100%',
					width: '100%'
				}}
			/>
		</div>
	);
}
