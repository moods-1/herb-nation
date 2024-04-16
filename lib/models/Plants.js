import { Schema, model, models } from 'mongoose';

const PlantSchema = new Schema({
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
    categories: [
        {
            type: String,
        }
    ],  
    images: {
        type: Map,
        of: String,
    },
    description: {
        type: String,
    }
}, { timestamps: true, collection: 'Plants' });

const PlantModel = models?.Plant || model('Plant', PlantSchema);

export default PlantModel;