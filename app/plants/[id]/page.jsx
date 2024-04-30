import Image from 'next/image';

import Regions from './Regions';
import Applications from './Applications';
import { getPlantById, getPlantData } from '@/api/actions/plantActions';
import NoData from '@/components/NoData';

export default async function PlantDetails({ params }) {
	const { id } = params;
	const plant = await getPlantById(id);
	const {
		commonName,
		botanicalName,
		images,
		description,
		partsUsed,
		applications,
		regions,
	} = plant;

	const sortedApplications = applications?.sort((a, b) => (a > b ? 1 : -1));

	const regionsArray = Object.entries(regions)
		.map(([region, map]) => {
			return { region, map };
		})
		.sort((a, b) => (a.region > b.region ? 1 : -1));

	return (
		<main>
			{plant ? (
				<div>
					<div className='mb-6'>
						<p className='page-title'>{commonName}</p>
						<p>{botanicalName}</p>
					</div>
					<div className='flex flex-wrap gap-5'>
						<div>
							<Image
								src={images?.main}
								alt={commonName}
								width={1000}
								height={1000}
								className='max-w-96 w-full'
							/>
						</div>
						<div className='flex-1 flex flex-col gap-6 min-w-52 sm:min-w-96'>
							<div>
								<p className='section-title'>Description</p>
								<p className='min-h-12'>{description}</p>
							</div>
							<div>
								<p className='section-title'>Parts Used</p>
								<p className='min-h-12'>{partsUsed}</p>
							</div>
							<div>
								<p className='section-title'>
									Applications <sup>&#9765;</sup>
								</p>
								<Applications applications={sortedApplications} />
							</div>
							<div>
								<p className='section-title'>Regions</p>
								<Regions regions={regionsArray} />
							</div>
						</div>
					</div>
				</div>
			) : (
				<NoData />
			)}
		</main>
	);
}

export const generateMetadata = async ({ params }) => {
	const { id } = params;
	const plant = await getPlantData(id);
	if (plant) {
		return { title: plant.commonName, description: plant.description };
	}
	return { title: 'Herb Nation' };
};