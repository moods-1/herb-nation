export const firstCap = (data) => {
	const splitData = data.split(' ');
	const cappedData = splitData.map((s) => {
		return s.slice(0, 1).toUpperCase() + s.slice(1);
	});
	return cappedData.join(' ');
};

export const capFirstLetter = (data) => {
	return data.slice(0, 1).toUpperCase() + data.slice(1);
};

export const pluralizer = (amount, data) => {
	if (typeof amount === 'number') {
		if (amount > 1) {
			return `${data}s`;
		}
	}
	return data;
};

export const arraySentence = (arr) => {
	const arrLength = arr.length;
	let output = '';
	const first = capFirstLetter(arr[0]);
	switch (arrLength) {
		case 1:
			output = first;
			break;
		case 2:
			output = `${first} and ${arr[1]}.`;
			break;
		default:
			arr.forEach((word, idx) => {
				if (idx === 0) {
					output += `${first}, `;
				} else if (idx < arrLength - 1) {
					output += `${word}, `;
				} else {
					output += `and ${word}.`;
				}
			});
			break;
	}
	return output;
};

export const properLink = (data) => {
	return data.replaceAll(' ', '-');
};

// Form validation //

export const FORM_FIELDS_DISPLAY = {
	firstName: 'First Name',
	lastName: 'Last Name',
	name: 'Name',
	email: 'Email',
	message: 'Message',
	password: 'Password',
	subject: 'Subject',
	commonName: 'Common Name',
	botanicalName: 'Botanical Name',
	description: 'Description',
	partsUsed: 'Parts Used',
};

export const isValid = (type, pattern, value) => {
	if (type === 'text' && typeof pattern === 'object') {
		return pattern.test(value);
	}
};

export const VALIDATOR_OBJECT = {
	name: { min: 2, max: 50, pattern: '', patternText: '' },
	subject: { min: 2, max: 50, pattern: '', patternText: '' },
	firstName: { min: 2, max: 25, pattern: '', patternText: '' },
	lastName: { min: 2, max: 25, pattern: '', patternText: '' },
	commonName: { min: 2, max: 40, pattern: '', patternText: '' },
	botanicalName: { min: 2, max: 40, pattern: '', patternText: '' },
	description: { min: 2, max: 300, pattern: '', patternText: '' },
	partsUsed: { min: 2, max: 60, pattern: '', patternText: '' },
	email: {
		min: 6,
		max: 50,
		pattern: new RegExp(/^\w+([\\.-]?\w+)*@([a-z]{2,3})+\.[a-z]{2,3}/),
		patternText: 'Please enter a valid email address.',
	},
	message: { min: 3, max: 150, pattern: '', patternText: '' },
	password: {
		min: 6,
		max: 20,
		pattern: '',
		patternText: '',
	},
};

export const validatorText = (target, min, max) => {
	return `The ${FORM_FIELDS_DISPLAY[target]} field must between ${min} and ${max} characters.`;
};

// export const validatorText = (target: string, min: number, max: number) => {
// 	return `This must be between ${min} and ${max} characters.`;
// };

export const generateMessage = (pattern, patternText, key, min, max) => {
	return pattern ? patternText : validatorText(key, min, max);
};

export const formValidator = (formObject) => {
	const errorObject = {};
	const errorSet = new Set();
	let error = false;
	Object.entries(formObject).forEach(([key, value]) => {
		const validator = VALIDATOR_OBJECT[key] || { min: 0, max: 1 };
		const { min, max, pattern, patternText } = validator;
		let message = generateMessage(pattern, patternText, key, min, max);
		switch (key) {
			case 'name':
				if (typeof value === 'string')
					error = value.length < min || value.length > max;
				break;
			case 'firstName':
				if (typeof value === 'string')
					error = value.length < min || value.length > max;
				break;
			case 'lastName':
				if (typeof value === 'string')
					error = value.length < min || value.length > max;
				break;
			case 'commonName':
				if (typeof value === 'string')
					error = value.length < min || value.length > max;
				break;
			case 'botanicalName':
				if (typeof value === 'string')
					error = value.length < min || value.length > max;
				break;
			case 'description':
				if (typeof value === 'string')
					error = value.length < min || value.length > max;
				break;
			case 'partsUsed':
				if (typeof value === 'string')
					error = value.length < min || value.length > max;
				break;
			case 'subject':
				if (typeof value === 'string')
					error = value.length < min || value.length > max;
				break;
			case 'message':
				if (typeof value === 'string')
					error = value.length < min || value.length > max;
				break;
			case 'password':
				if (typeof value === 'string')
					error = value.length < min || value.length > max;
				break;
			case 'email':
				if (typeof value === 'string')
					error = pattern
						? !isValid('text', pattern, value)
						: value.length < min || value.length > max;
				break;
			default:
				message = '';
				error = false;
				break;
		}
		errorObject[key] = error ? message : '';
		errorSet.add(error);
	});
	return { error: errorSet.has(true), errorObject };
};
