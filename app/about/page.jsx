import React from 'react';

export const metadata = {
	title: 'Herb Nation - About Us',
};

export default function AboutUs() {
	return (
		<main>
			<p className='page-title mb-10'>About Us</p>
			<p>
				{
					"Herb Nation is here for those who are seeking granny's knowledge of natural healing."
				}
			</p>
			<br />
			<p>
				The information on this site is provided as an information resource
				only, and is not to be used or relied on for any diagnostic or treatment
				purposes. Please consult a physician if you are having any issues, and
				return here to exercise your freedom of choice to try alternatives.
			</p>
		</main>
	);
}
