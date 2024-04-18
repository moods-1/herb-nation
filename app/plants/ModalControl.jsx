'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import PlantModal from './PlantModal';

export default function ModalControl({ plant }) {
	const [openModal, setOpenModal] = useState(false);
	const toggleModal = () => {
		setOpenModal((prev) => !prev);
	};

	return (
		<>
			<Button className='w-full' onClick={toggleModal}>
				Edit
			</Button>
			{openModal ? (
				<PlantModal
					type='edit'
					open={openModal}
					toggle={toggleModal}
					plant={plant}
				/>
			) : (
				<></>
			)}
		</>
	);
}
