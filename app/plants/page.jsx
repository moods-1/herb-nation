'use client';
import CustomSearch from '@/components/CustomSearch';
import React, { useState, useEffect } from 'react';
import { PLANTS } from '@/lib/data';
import PlantCard from '@/app/plants/PlantCard';

export default function Plants() {
	const [mounted, setMounted] = useState(false);
	const [plants, setPlants] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const filteredData = plants.filter((p) => {
		const fil = searchValue.toLowerCase();
		return (
			p.commonName.toLowerCase().includes(fil) ||
			p.categories.find((c) => c.toLowerCase().includes(fil))
		);
	});

	const handleInput = (e) => {
		const { value } = e.target;
		let localValue = value.replace(/\s{2,}/g, ' ').trimStart();
		setSearchValue(localValue);
	};

	const clearSearch = () => {
		setSearchValue('');
	};

	useEffect(() => {
		setPlants(PLANTS);
		setMounted(true);
	}, []);

	return (
		<main>
			<div className='w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between'>
				<p className='page-title'>Plants</p>
				<div className='max-w-72'>
					<CustomSearch
						changeFunction={handleInput}
						deleteFunction={clearSearch}
						value={searchValue}
						placeholder='Search plants or categories'
					/>
				</div>
			</div>
			<div className='flex flex-wrap gap-5 mt-10'>
				{filteredData.map((plant) => (
					<PlantCard plant={plant} key={plant._id} />
				))}
			</div>
		</main>
	);
}
