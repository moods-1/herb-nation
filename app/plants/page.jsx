'use client';
import CustomSearch from '@/components/CustomSearch';
import React, { useState, useEffect } from 'react';

export default function Plants() {
	const [mounted, setMounted] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const handleInput = (e) => {
		const { value } = e.target;
		let localValue = value.replace(/\s{2,}/g, ' ').trimStart();
		setSearchValue(localValue);
	};
	const clearSearch = () => {
		setSearchValue('');
	};

	useEffect(() => {
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
						placeholder={''}
					/>
				</div>
			</div>
		</main>
	);
}
