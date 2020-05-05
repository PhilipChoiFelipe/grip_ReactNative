//convert object to array
export const objToArray = (obj) => {
	let array = [];
	for (var key in obj) {
		
		array.push(obj[key]);
	}
	return array;
}
