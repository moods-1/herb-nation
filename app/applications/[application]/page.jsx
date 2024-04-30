import PlantCard from '@/app/plants/PlantCard';
import { firstCap, pluralizer } from '@/lib/clientFunctions';
import { getPlantsByApplication } from '@/api/actions/plantActions';
import { allCaps, APPLICATIONS_DESCRIPTIONS } from '@/lib/constants';
import NoData from '@/components/NoData';

export async function generateMetadata({ params }) {
	const { application } = params;
	const category = application.replaceAll('-', ' ');
	const title = allCaps.includes(category)
		? category.toUpperCase()
		: firstCap(category);
	if (title) {
		return {
			title: `Herb Nation - ${title}`,
			description: 'Plant applications',
		};
	}
	return { title: 'Plant Benefits' };
}

export default async function page({ params }) {
	const { application } = params;
	const category = application.replaceAll('-', ' ');
	const title = allCaps.includes(category)
		? category.toUpperCase()
		: firstCap(category);
	const plantData = await getPlantsByApplication(category);
	const herbText = (
		<span className='font-semibold'>
			{`Helpful ${pluralizer(plantData.length, 'herb')}`}
			<sup>&#9765;</sup>:
		</span>
	);

	return (
		<main>
			<p className='page-title'>{title}</p>
			<p className='mb-2'>{APPLICATIONS_DESCRIPTIONS[category]}</p>
			{herbText}
			<div className='page-content'>
				{plantData.length ? (
					plantData.map((p) => <PlantCard plant={p} key={p._id} />)
				) : (
					<NoData />
				)}
			</div>
		</main>
	);
}
