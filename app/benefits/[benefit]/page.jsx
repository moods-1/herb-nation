import React from 'react';
import { firstCap } from '@/lib/clientFunctions';
import { PLANTS } from '@/lib/data';
import PlantCard from '@/app/plants/PlantCard';

export function generateMetadata({ params }) {
	const { benefit } = params;
	const category = benefit.replaceAll('-', ' ');
	const title = firstCap(category);
	if (title) {
		return { title: title, description: 'Plant benefits' };
	}
	return { title: 'Plant Benefits' };
}

export default function page({ params }) {
	const { benefit } = params;
	const category = benefit.replaceAll('-', ' ');
	const title = firstCap(category);
	const plantData = PLANTS.filter((p) => p.categories.includes(category));
	return (
		<main>
			<div className='page-title'>{title}</div>
			<div className='flex gap-5 flex-wrap mt-10'>
				{plantData.map((p) => (
					<PlantCard plant={p} key={p._id} />
				))}
			</div>
		</main>
	);
}
