'use client'

import React, { useState, useEffect } from 'react';

import CustomSearch from '@/components/CustomSearch';
import PlantCard from '@/app/plants/PlantCard';
import { getUnarchivedPlants } from '@/api/actions/plantActions';
import PlantModal from './PlantModal';
import { Button } from '@/components/ui/button';
import { PlantLoader } from '@/components/Loaders';
import NoData from '@/components/NoData';

export default function DataModule() {
	const [isLoading, setIsLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [dev, setDev] = useState(false);
	const [plants, setPlants] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const filteredData = plants.filter((p) => {
		const fil = searchValue.toLowerCase();
		return (
			p.commonName.toLowerCase().includes(fil) ||
			p.categories.find((c) => c.toLowerCase().includes(fil))
		);
	});

	const toggleModal = () => {
		setOpenModal((prev) => !prev);
	};

	const modFunction = (type, plant) => {
		if (type === 'edit') {
			const plantIndex = plants.findIndex((p) => p._id === plant._id);
			if (plantIndex || plantIndex === 0) {
				setPlants((prev) => [
					...prev.slice(0, plantIndex),
					plant,
					...prev.slice(plantIndex + 1),
				]);
			}
		} else if (type === 'new') {
			setPlants((prev) => [plant, ...prev]);
		}
	};

	const handleInput = (e) => {
		const { value } = e.target;
		let localValue = value.replace(/\s{2,}/g, ' ').trimStart();
		setSearchValue(localValue);
	};

	const clearSearch = () => {
		setSearchValue('');
	};

	useEffect(() => {
		setIsLoading(true);
		const fetchPlants = async () => {
			try {
				const result = await getUnarchivedPlants();
				if (result) {
					setIsLoading(false);
					setPlants(result);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchPlants();
		setDev(process.env.NEXT_PUBLIC_DEVELOPMENT === 'true' ? true : false);
	}, []);

	const noData = !isLoading && filteredData.length < 1;

	return (
		<>
			<div className='page-head-search'>
				<div className='flex items-center gap-4 flex-wrap'>
					<p className='page-title'>Plants</p>
					{dev ? (
						<Button className='!h-[30px]' onClick={toggleModal}>
							New
						</Button>
					) : null}
				</div>

				<div className='max-w-72 w-full'>
					<CustomSearch
						changeFunction={handleInput}
						deleteFunction={clearSearch}
						value={searchValue}
						placeholder='Search plants or applications'
					/>
				</div>
			</div>
			<div className='page-content'>
				{isLoading && (
					<div className='w-full'>
						<p className='font-semibold text-xl'>Fetching plants ...</p>
						<div className='mt-6 w-full h-[50vh] flex flex-wrap gap-6'>
							<PlantLoader count={2} />
						</div>
					</div>
				)}
				{noData ? (
					<NoData message={'Sorry, no plant data available.'} />
				) : (
					filteredData.map((plant) => (
						<PlantCard
							plant={plant}
							key={plant._id}
							modFunction={modFunction}
						/>
					))
				)}
			</div>
			{openModal && (
				<PlantModal
					open={openModal}
					toggle={toggleModal}
					type='new'
					modFunction={modFunction}
				/>
			)}
		</>
	);
}
