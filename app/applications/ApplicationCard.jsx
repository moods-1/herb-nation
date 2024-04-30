import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function ApplicationCard({ label, link, image }) {
	return (
		<Link href={`/applications/${link}`}>
			<Card className='overflow-hidden'>
				<CardContent className='w-[180px] flex flex-col items-center'>
					<div className='w-[180px] h-[160px] hidden sm:block relative' >
						<Image
							src={image || '/images/heart.png'}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className='w-full h-full'
							alt={label}
							priority
						/>
					</div>
					<p className='w-full font-medium mt-2 -mb-3 text-center'>{label}</p>
				</CardContent>
			</Card>
		</Link>
	);
}
