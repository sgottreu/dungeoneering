const SortByKey = (key) => {
    return (a, b) => {
        var nameA = a[ key ].toUpperCase(), nameB = b[ key ].toUpperCase(); // ignore upper and lowercase
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