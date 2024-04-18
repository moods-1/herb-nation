import React from 'react';

export default function Categories({ categories }) {
	return (
		<div className='flex flex-wrap gap-2'>
			{categories.map((c) => (
				<span className='category-pill' key={c}>
					{c}
				</span>
			))}
		</div>
	);
}
