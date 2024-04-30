import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { PLANT_MODAL_SELECT_OPTIONS } from '@/lib/constants';

export default function MultiSelect({
	options,
	onChange,
	menuPlacement,
	defaultValue,
}) {
	const animated = makeAnimated();
	const sortedOptions = options.sort((a, b) => a.label > b.label ? 1 : -1);
	return (
		<Select
			isMulti
			closeMenuOnSelect={false}
			defaultValue={defaultValue}
			options={sortedOptions}
			menuPlacement={menuPlacement}
			components={animated}
			onChange={onChange}
			styles={PLANT_MODAL_SELECT_OPTIONS}
		/>
	);
}
