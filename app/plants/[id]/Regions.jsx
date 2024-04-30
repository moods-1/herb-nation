'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { REGION_NAMES } from '@/lib/constants';
import Modal from '@/components/Modal';
import NoData from '@/components/NoData';

export default function Regions({ regions }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [modelContent, setModelContent] = useState(null);
	const toggleModal = () => {
		setModalOpen((prev) => !prev);
	};
	const handleImageClick = (region, image) => {
		setModelContent(
			<div className='flex flex-col w-full mt-5'>
				<p className='font-semibold mb-1'>{REGION_NAMES[region]}</p>
				<Image
					src={image}
					width={500}
					height={500}
					alt={region}
					className='h-full w-full'
				/>
			</div>
		);
		setModalOpen(true);
	};

	return (
		<>
			<div className='flex flex-wrap gap-2'>
				{regions
					? regions.map(({ region, map }) => (
							<div key={region} className='flex flex-col w-[150px]'>
								<Image
									key={region}
									src={map}
									width={150}
									height={150}
									alt={region}
									className='h-full w-full cursor-pointer'
									onClick={() => handleImageClick(region, map)}
								/>
								<p>{REGION_NAMES[region]}</p>
							</div>
					  ))
					: <NoData />}
			</div>
			<Modal
				className='w-full max-w-2xl bg-gray-700 border-0 text-white'
				open={modalOpen}
				toggle={toggleModal}
				content={modelContent}
			/>
		</>
	);
}
