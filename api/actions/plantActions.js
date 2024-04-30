'use server';

import Plant from '@/lib/models/PlantsModel';
import { dbConnect } from '@/lib/dbConnect';
import { storeImage } from '@/lib/serverFunctions';

export async function getAllPlants() {
	try {
		await dbConnect();
		const result = await Plant.find().sort({ commonName: 1 });
		return JSON.parse(JSON.stringify(result));
	} catch (error) {
		console.log(error);
	}
}

export async function updateToApplications() {
	try {
		await dbConnect();
		Plant.syncIndexes();
		const result = await Plant.updateMany({}, { $unset: { categories: 1 } });
		// const res = JSON.parse(JSON.stringify(result));
		// res.forEach((r) => {
		// 	const syn = async (res) => {
		// 		const { _id: id } = res;
		// 		const ress = await Plant.updateOne(
		// 			{ _id: id },
		// 			{ $unset: { categories: 1 } },
		// 			{ returnOriginal: false }
		// 		);
		// 		console.log({ ress });
		// 	};
		// 	syn(r);
		// });
	} catch (error) {
		console.log({ error });
	}
}

export async function getUnarchivedPlants() {
	try {
		await dbConnect();
		const result = await Plant.find({ archive: false }).sort({ commonName: 1 });
		return JSON.parse(JSON.stringify(result));
	} catch (error) {
		console.log(error);
	}
}

export async function getPlantById(id) {
	try {
		await dbConnect();
		const result = await Plant.findOne({ _id: id, archive: false });
		return JSON.parse(JSON.stringify(result));
	} catch (error) {
		console.log(error);
	}
}

export async function getPlantsByApplication(application) {
	try {
		await dbConnect();
		const result = await Plant.find({
			applications: { $in: [application] },
			archive: false,
		}).sort({
			commonName: 1,
		});
		return JSON.parse(JSON.stringify(result));
	} catch (error) {
		console.log(error);
	}
}

export async function addPlant(data) {
	try {
		await dbConnect();
		const { images } = data;
		const mainImage = await storeImage(images?.main, 'HerbNation');
		data.images.main = mainImage;
		const result = await Plant.create(data);
		return JSON.parse(JSON.stringify(result));
	} catch (error) {
		console.log(error);
	}
}

export async function archivePlant(id, archive) {
	try {
		await dbConnect();
		const result = await Plant.findOneAndUpdate(
			{ _id: id },
			{ archive },
			{ returnOriginal: false }
		);
		return JSON.parse(JSON.stringify(result));
	} catch (error) {
		console.log(error);
	}
}

export async function updatePlant(data) {
	try {
		await dbConnect();
		if (data.newImage) {
			const { images } = data;
			const mainImage = await storeImage(images?.main, 'HerbNation');
			data.images.main = mainImage;
		}
		const { _id: id } = data;
		const result = await Plant.findOneAndUpdate({ _id: id }, data, {
			returnOriginal: false,
		});
		return JSON.parse(JSON.stringify(result));
	} catch (error) {
		console.log(error);
	}
}
