'use client';

import React, { useState } from 'react';

import { APPLICATIONS_ARRAY } from '@/lib/constants';
import ApplicationCard from './ApplicationCard';
import CustomSearch from '@/components/CustomSearch';
import NoData from '@/components/NoData';

export default function Benfits() {
	const [searchValue, setSearchValue] = useState('');

	const filterData = APPLICATIONS_ARRAY.filter((c) =>
		c.label.toLowerCase().includes(searchValue.toLowerCase())
	);

	const handleInput = (e) => {
		const { value } = e.target;
		let localValue = value.replace(/\s{2,}/g, ' ').trimStart();
		setSearchValue(localValue);
	};

	const clearSearch = () => {
		setSearchValue('');
	};

	return (
		<main>
			<div className='page-head-search'>
				<p className='page-title'>
					Applications <sup className='text-sm'>&#9765;</sup>
				</p>
				<div className='max-w-72'>
					<CustomSearch
						changeFunction={handleInput}
						deleteFunction={clearSearch}
						value={searchValue}
						placeholder='Search applications'
					/>
				</div>
			</div>

			{filterData.length ? (
				<div className='page-content'>
					{filterData.map((application, idx) => (
						<ApplicationCard key={idx} {...application} />
					))}
				</div>
			) : (
				<NoData message={'Sorry, no benefit data available.'} />
			)}
		</main>
	);
}
