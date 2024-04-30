import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import ModalControl from './ModalControl';

export default function PlantCard({ plant, modFunction }) {
	const { _id, commonName, botanicalName, images } = plant;
	const dev = process.env.NEXT_PUBLIC_DEVELOPMENT === 'true' ? true : false;
	const showControl = dev && modFunction;

	return (
		<span>
			<Card className='plant-card'>
				<CardHeader>
					<div className='flex flex-wrap items-start justify-between gap-2'>
						<Link href={`/plants/${_id}`}>
							<CardTitle className='text-base sm:text-lg'>
								{commonName}
							</CardTitle>
							<CardDescription>{botanicalName}</CardDescription>
						</Link>
						{showControl ? (
							<ModalControl plant={plant} modFunction={modFunction} />
						) : null}
					</div>
				</CardHeader>
				<Link href={`/plants/${_id}`}>
					<CardContent>
						<Image
							src={images.main}
							alt={commonName}
							width={1000}
							height={1000}
							className='w-100'
						/>
					</CardContent>
				</Link>
			</Card>
		</span>
	);
}
