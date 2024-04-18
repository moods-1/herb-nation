import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import ModalControl from './ModalControl';

export default function PlantCard({ plant }) {
	const { _id, commonName, botanicalName, categories, images, description } =
		plant;
	return (
		<span>
			<Link href={`/plants/${_id}`}>
				<Card className='max-w-80 cursor-pointer'>
					<CardHeader>
						<CardTitle>{commonName}</CardTitle>
						<CardDescription>{botanicalName}</CardDescription>
					</CardHeader>
					<CardContent>
						<Image
							src={images.main}
							alt={commonName}
							width={1000}
							height={1000}
							className='w-100'
						/>
					</CardContent>
					
				</Card>
			</Link>
			<ModalControl plant={plant} />
		</span>
	);
}
