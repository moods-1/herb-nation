import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function BenefitsCard({ display, link, image }) {
	return (
		<Link href={`/benefits/${link}`}>
			<Card className='overflow-hidden'>
				<CardContent className='w-[180px] flex flex-col items-center'>
					<div className='w-[180px] h-[160px]'>
						<Image
							src={image || '/images/heart.png'}
							width={180}
							height={140}
							className='w-full h-full'
							alt={display}
						/>
					</div>

					<p className='font-medium'>{display}</p>
				</CardContent>
			</Card>
		</Link>
	);
}
