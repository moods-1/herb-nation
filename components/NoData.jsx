import React from 'react';
import Image from 'next/image';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function NoData({ image, message }) {
	const imgSrc = image || '/images/default-plant.jpg';
	const msg = message || 'Sorry, no data available.';

	return (
		<div className='w-full p-6 h-[50vh] sm:h-[70vh] grid place-items-center'>
			<Card>
				<CardHeader>
					<CardTitle className='text-base sm:text-lg'>{msg}</CardTitle>
				</CardHeader>
				<CardContent>
					<Image width={300} height={300} alt='No data' src={imgSrc} />
				</CardContent>
			</Card>
		</div>
	);
}
