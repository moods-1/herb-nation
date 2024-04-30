import DataModule from './ApplicationsDataModule';

export const metadata = {
	title: 'Herb Nation - Applications',
};

export default function Applications() {
	return (
		<main>
			<DataModule />
		</main>
	);
}
