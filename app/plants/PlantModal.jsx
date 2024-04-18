'use client';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AddFile from '@/components/AddFile';
import { useEffect, useState } from 'react';

export default function Modal({ open, toggle, type, plant }) {
	const [form, setForm] = useState({});
	const [file, setFile] = useState(null);
	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState('');
	const title = form?.commonName;
	const blankTitle = type === 'edit' ? 'Edit Plant' : 'New Plant';

	const handleInput = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
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

	useEffect(() => {
		if (type === 'edit') {
			setForm({ ...plant });
			setImage(plant.images?.main);
		}
	}, [type, plant]);

	return (
		<Dialog open={open} onOpenChange={toggle}>
			<DialogContent className=''>
				<form className=''>
					<p className='page-title w-full text-align my-5'>
						{title || blankTitle}
					</p>
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
						</div>
						<div className='form-section'>
							<label>Botanical Name</label>
							<Input
								value={form.botanicalName || ''}
								name='botanicalName'
								placeholder='Enter botanicl name'
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
				</form>
			</DialogContent>
		</Dialog>
	);
}
