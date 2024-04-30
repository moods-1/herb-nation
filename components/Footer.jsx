'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { HEADER_LINKS } from '@/lib/constants';

export default function Footer() {
	const currentPath = usePathname();
	return (
		<footer>
			<nav className='gap-5 flex flex-col sm:flex-row items-center justify-center'>
				{HEADER_LINKS.map(({ label, link }) => (
					<Link
						href={link}
						key={label}
						className={`${currentPath === link ? 'active' : ''}`}
					>
						{label}
					</Link>
				))}
			</nav>
			<p className='w-full flex items-center justify-center my-4 px-2 text-sm'>
				<Link href='/'>
					<Image
						src='/images/herb-nation-clear-logo.png'
						alt='logo'
						width={100}
						height={40}
						className='min-w-[100px]'
					/>
				</Link>{' '}
				&copy; 2024
			</p>
			<p className='text-xs text-center'>
				&#9765; The information on this site is provided as an information
				resource only, and is not to be used or relied on for any diagnostic or
				treatment purposes.
			</p>
		</footer>
	);
}
