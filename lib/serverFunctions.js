import { v2 } from 'cloudinary';

v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storeImage = async (data, folder) => {
	let img = {};
	if (folder) {
		img = await v2.uploader.upload(data, { folder });
	} else {
		img = await v2.uploader.upload(data);
	}
	return img.url;
};
