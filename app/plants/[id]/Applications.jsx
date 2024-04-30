import Link from 'next/link';
import React from 'react';

export default function Applications({ applications }) {
	return (
		<div className='flex flex-wrap gap-2'>
			{applications
				? applications.map((c) => (
						<Link href={`/applications/${c.replaceAll(' ', '-')}`} key={c}>
							<span className='category-pill'>{c}</span>
						</Link>
				  ))
				: null}
		</div>
	);
}
