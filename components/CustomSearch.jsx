import { IoIosSearch } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';

import { Input } from './ui/input';

export default function CustomSearch({
	changeFunction,
	deleteFunction,
	value,
	placeholder,
}) {
	return (
		<div className='flex items-center w-full border rounded-[5px] pr-2'>
			<Input
				onChange={changeFunction}
				placeholder={placeholder || 'Search ...'}
				value={value || ''}
				className='min-w-28 border-0 outline-none h-8'
			/>
			{value ? (
				<MdDeleteForever
					className='search-icon cursor-pointer text-red-500'
					onClick={deleteFunction}
				/>
			) : (
				<IoIosSearch className='search-icon' />
			)}
		</div>
	);
}
