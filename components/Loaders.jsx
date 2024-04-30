import React from 'react';

export const Loader = (props) => {
	const { borderSize, size, color } = props;
	const spinnerSize = size || '35px';
	const spinnerColor = color || '#0275d8';
	const spinnerBorderSize = borderSize || '5px';

	const style = {
		width: spinnerSize,
		height: spinnerSize,
		border: `${spinnerBorderSize} solid #ddd`,
		borderRadius: '50%',
		borderTop: `${spinnerBorderSize} solid ${spinnerColor}`,
	};

	return <div className={`spinner`} style={style} />;
};

export function SlideLoader({className}) {
    return (
        <div className={`side-loader ${className}`} />
  )
}

export function PlantLoader({ count }) {
    const countArr = [];
    const maxNum = count || 1;
	for (let i = 0; i < maxNum; i++) {
		countArr.push(i);
	}
	return (
		<>
			{countArr.map((_, idx) => (
				<div
					className={`w-full max-w-72 h-96 ${idx > 0 ? 'hidden sm:block' : ''}`}
					key={idx}
				>
					<SlideLoader className='!h-full' />
				</div>
			))}
		</>
	);
}