const SortByKey = (key) => {
    return (a, b) => {
        var nameA = a[ key ] === undefined ? '' : a[ key ].toUpperCase();
        var nameB = b[ key ] === undefined ? '' : b[ key ].toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		} else {
			if (nameA > nameB) {
				return 1;
			}
		}
		return 0;
    };
}

export default SortByKey;