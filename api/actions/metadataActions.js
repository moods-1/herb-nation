'use server';

import Plant from '@/lib/models/PlantsModel';
import { dbConnect } from '@/lib/dbConnect';

export async function getPlantData(id) {
	try {
		await dbConnect();
		const result = await Plant.findOne({ _id: id, archive: false });
		return JSON.parse(JSON.stringify(result));
	} catch (error) {
		console.log(error);
	}
}
