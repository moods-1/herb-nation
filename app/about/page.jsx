import Image from 'next/image';
import React from 'react';

export const metadata = {
	title: 'Herb Nation - About Us',
};

export default function AboutUs() {
	return (
		<main className='flex flex-col sm:flex-row'>
			<div className='flex-1 bg-about-us bg-cover min-h-[40vh]' />
			<div className='flex-1 px-0 sm:px-6 pt-6 sm:pt-0'>
				<p className='text-4xl md:text-6xl lg:text-8xl mb-10 font-serif'>
					About Us
				</p>
				<p>
					{
						"Herb Nation is here for those who are seeking granny's knowledge of natural healing."
					}
				</p>
				<br />
				<p>
					The information on this site is provided as an information resource
					only, and is not to be used or relied on for any diagnostic or
					treatment purposes. Please consult a physician if you are having any
					issues, and return here to exercise your freedom of choice to try
					alternatives.
				</p>
			</div>
		</main>
	);
}
