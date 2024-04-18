import Image from 'next/image';
import { PLANTS } from '@/lib/data';
import { arraySentence } from '@/lib/clientFunctions';
import Regions from './Regions';
import Categories from './Categories';

export async function generateMetadata({ params }) {
	const { id } = params;
	const plant = PLANTS.find((p) => p._id === id);
	if (plant) {
		return { title: plant.commonName, description: plant.description };
	}
	return { title: 'Plant no found' };
}

export default async function PlantDetails({ params }) {
	const { id } = params;
	const plant = PLANTS.find((p) => p._id === id);
	const {
		commonName,
		botanicalName,
		images,
		description,
		partsUsed,
		categories,
		regions,
	} = plant;

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
								src={images.main}
								alt={commonName}
								width={1000}
								height={1000}
								className='max-w-96 w-full'
							/>
						</div>
						<div className='flex-1 flex flex-col gap-6 min-w-52 sm:min-w-96'>
							<div>
								<p className='section-title'>Description</p>
								<p>{description}</p>
							</div>
							<div>
								<p className='section-title'>Parts Used</p>
								<p>{partsUsed}</p>
							</div>
							<div>
								<p className='section-title'>Beneficial for/against</p>
								<Categories categories={categories} />
							</div>
							<div>
								<p className='section-title'>Regions</p>
								<Regions regions={regions} />
							</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</main>
	);
}
