import { loadAvailableWeapons } from '../actions/weapons-actions';

export var WeaponTemplate = {
	_id: false,
	category: "",  
	type: "", 
	name: "", 
	prof: 2, 
	damage: { die: '1d6', num: 1},
	price: 5, 
	weight: 2, 
	range: { low: 10, high: 20 },
  hands: 1
};

export var sortWeapons = (availableWeapons) => {
	availableWeapons.sort(function(a, b) {
		var nameA = a.name.toUpperCase(), nameB = b.name.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		} else {
			if (nameA > nameB) {
				return 1;
			}
		}
		return 0;
	});
	return availableWeapons;
}

