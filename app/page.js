import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<div className=''>
			<div className='hero'>
				<div>
					<p className='hero-text'>Herbs are for the healing of the nation!</p>
					<Link href='/plants'>
						<Button className='rounded-full px-6 mt-4 bg-slate-900 text-lg sm:text-xl'>
							Explore
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
