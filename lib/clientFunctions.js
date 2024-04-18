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
}