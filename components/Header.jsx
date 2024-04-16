'use client';
import { useState, useEffect } from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { HEADER_LINKS } from '@/lib/constants';

export default function Header() {
	const [openMenu, setOpenMenu] = useState(false);
	const currentPath = usePathname();

	const toggleMenu = () => {
		setOpenMenu((prev) => !prev);
	};

	useEffect(() => {
		window.addEventListener('resize', () => {
			setOpenMenu(false);
		});
		return () => window.removeEventListener('resize', () => {});
	}, []);

	return (
		<header>
			<Link href='/'>
				<p className='text-lg font-semibold'>Herb Nation</p>
			</Link>
			<nav className='gap-5 hidden sm:flex'>
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
			<div className='sm:hidden'>
				<DropdownMenu open={openMenu} onOpenChange={toggleMenu}>
					<DropdownMenuTrigger onClick={toggleMenu} className='outline-none'>
						<MdOutlineMenu size={30} />
					</DropdownMenuTrigger>
					<DropdownMenuContent className='bg-white'>
						{HEADER_LINKS.map(({ label, link }) => (
							<DropdownMenuItem key={label} asChild className='cursor-pointer'>
								<Link
									href={link}
									className={`${
										currentPath === link ? 'active' : ''
									} dropdown-link`}
								>
									{label}
								</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
