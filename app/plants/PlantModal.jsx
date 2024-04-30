'use client';

import { useEffect, useState } from 'react';

import { APPLICATIONS_ARRAY, REGIONS_SELECT_OPTIONS } from '@/lib/constants';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AddFile from '@/components/AddFile';
import { formValidator } from '@/lib/clientFunctions';
import MultiSelect from '@/components/MultiSelect';
import { addPlant, updatePlant } from '@/api/actions/plantActions';

export default function Modal({ open, toggle, type, plant, modFunction }) {
	const [form, setForm] = useState({});
	const [formError, setFormError] = useState({});
	const [file, setFile] = useState(null);
	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState('');
	const title = form?.commonName;
	const blankTitle = type === 'edit' ? 'Edit Plant' : 'New Plant';

	const defaultApplicationValues = APPLICATIONS_ARRAY.filter((app) => {
		if (plant) {
			const { applications } = plant;
			for (const a of applications) {
				if (app.value === a) {
					return app;
				}
			}
		}
	});

	const defaultRegionValues = REGIONS_SELECT_OPTIONS.filter((ro) => {
		if (plant) {
			const { regions } = plant;
			const regionKeys = Object.keys(regions);
			for (const r of regionKeys) {
				if (ro.value === r) {
					return ro;
				}
			}
		}
	});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setFormError({});
	};

	const handleImageError = (message) => {
		setImageError(message);
		setTimeout(() => {
			setImageError('');
		}, 4000);
	};

	const handleImage = (data) => {
		setImage(data);
		setForm((prev) => ({ ...prev, images: { ...prev.images, main: data } }));
	};

	const handleApplicationChange = (data) => {
		const applications = data.map((d) => d.value);
		setForm((prev) => ({ ...prev, applications }));
	};

	const handleRegionChange = (data) => {
		const regions = {};
		data.forEach(({ value, map }) => {
			regions[value] = map;
		});
		setForm((prev) => ({ ...prev, regions }));
	};

	const closePostAPI = (type, item) => {
		modFunction(type, item);
		toggle();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validatedData = formValidator(form);
		const { error, errorObject } = validatedData;
		setFormError(errorObject);
		if (error) return null;
		if (plant && type === 'edit') {
			form.newImage = plant.images.main !== form.images.main;
		}
		let result;
		if (type === 'edit') {
			result = await updatePlant(form);
			closePostAPI(type, result);
		} else {
			result = await addPlant(form);
			closePostAPI(type, result);
		}
	};

	useEffect(() => {
		if (type === 'edit' && plant) {
			setForm({ ...plant });
			setImage(plant.images?.main);
		}
	}, [type, plant]);

	return (
		<Dialog open={open} onOpenChange={toggle} modal={true}>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<p className='page-title w-full text-align my-5'>
						{title || blankTitle}
					</p>
					<div className='plant-modal-content'>
						<AddFile
							file={file}
							setFile={setFile}
							image={image}
							limit={200000}
							setImage={handleImage}
							inputName='image'
							imageClass='w-[200px]'
							displayError={handleImageError}
							defaultImage={'/images/default-plant.jpg'}
						/>
						<div className='form-div'>
							<div className='form-section'>
								<label>Common Name</label>
								<Input
									value={form.commonName || ''}
									name='commonName'
									placeholder='Enter plant name'
									onChange={handleInput}
								/>
								{formError.commonName && (
									<p className='text-sm text-red-700'>{formError.commonName}</p>
								)}
							</div>

							<div className='form-section'>
								<label>Botanical Name</label>
								<Input
									value={form.botanicalName || ''}
									name='botanicalName'
									placeholder='Enter botanical name'
									onChange={handleInput}
								/>
							</div>
						</div>
						<div className='form-div'>
							<div className='form-section'>
								<label>Description</label>
								<Textarea
									value={form.description || ''}
									name='description'
									placeholder='Enter plant description'
									onChange={handleInput}
								/>
							</div>
						</div>
						<div className='form-div'>
							<div className='form-section'>
								<label>Parts Used</label>
								<Input
									value={form.partsUsed || ''}
									name='partsUsed'
									placeholder='Enter sentence for parts used'
									onChange={handleInput}
								/>
							</div>
						</div>
						<div className='form-div'>
							<div className='form-section'>
								<label>Applications</label>
								<MultiSelect
									defaultValue={defaultApplicationValues}
									options={APPLICATIONS_ARRAY}
									menuPlacement='top'
									onChange={handleApplicationChange}
								/>
							</div>
						</div>
						<div className='form-div'>
							<div className='form-section'>
								<label>Regions</label>
								<MultiSelect
									defaultValue={defaultRegionValues}
									options={REGIONS_SELECT_OPTIONS}
									menuPlacement='top'
									onChange={handleRegionChange}
								/>
							</div>
						</div>
						<Button className='w-full my-5'>Submit</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
