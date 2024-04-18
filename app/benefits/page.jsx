import React from 'react';
import { CATEGORIES_ARRAY } from '@/lib/constants';
import BenefitsCard from './BenefitsCard';

export default function Benfits() {
	return (
		<main>
			<p className='page-title'>Benefits</p>
			<div className='flex gap-5 flex-wrap mt-10'>
				{CATEGORIES_ARRAY.map((benefit, idx) => (
					<BenefitsCard key={idx} {...benefit} />
				))}
			</div>
		</main>
	);
}
