'use client';

import React, { useEffect, useState } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import PlantModal from './PlantModal';
import { archivePlant } from '@/api/actions/plantActions';

export default function ModalControl({ plant, modFunction }) {
	const [openModal, setOpenModal] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const { archive } = plant;
	
	const toggleModal = () => {
		setOpenModal((prev) => !prev);
	};

	const toggleMenu = () => {
		setOpenMenu((prev) => !prev);
	};

	const handleArchive = async (type) => {
		const { _id: id } = plant;
		const archive = type === 'archive' ? true : false;
		try {
			const result = await archivePlant(id, archive);
			modFunction('edit', result);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', () => {
			setOpenMenu(false);
		});
		return () => window.removeEventListener('resize', () => {});
	}, []);

	return (
		<>
			<DropdownMenu open={openMenu} onOpenChange={toggleMenu}>
				<DropdownMenuTrigger onClick={toggleMenu} className='outline-none'>
					<FaEllipsisVertical size={20} />
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-20'>
					<DropdownMenuItem onClick={toggleModal}>Edit</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleArchive(archive ? 'unarchive' : 'archive')}
					>
						{archive ? 'Unarchive' : 'Archive'}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{openModal ? (
				<PlantModal
					type='edit'
					open={openModal}
					toggle={toggleModal}
					plant={plant}
					modFunction={modFunction}
				/>
			) : null}
		</>
	);
}
