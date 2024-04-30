import { Schema, model, models } from 'mongoose';

const PlantSchema = new Schema(
	{
		commonName: {
			type: String,
			required: true,
			unique: true,
			default: '',
		},
		botanicalName: {
			type: String,
			unique: true,
		},
		partsUsed: { type: String },
		categories: [
			{
				type: String,
			},
		],
		applications: [
			{
				type: String,
			},
		],
		regions: {
			type: Map,
			of: String,
		},
		images: {
			type: Map,
			of: String,
		},
		description: {
			type: String,
		},
		archive: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, collection: 'Plants' }
);

const Plant = models?.Plant || model('Plant', PlantSchema);

export default Plant;
