import DataModule from './PlantsDataModule';

export const metadata = {
	title: 'Herb Nation - Plants',
};

export default function Plants() {
	return (
		<main>
			<DataModule />
		</main>
	);
}
