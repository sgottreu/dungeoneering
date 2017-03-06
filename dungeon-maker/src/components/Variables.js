let host;
if(process !== undefined && process.env !== undefined && process.env.NODE_ENV === 'development'){
  host = 'http://localhost:4000';
} 

export var Variables = {
  host: host,
  clone: (data) => {
		return (data === undefined) ? {} : JSON.parse(JSON.stringify(data));
  },
  mapObj: function(obj){
	  let _Map = new Map(Object.entries(obj));
	  return [..._Map.entries()].map(function(obj, i) { return obj[0]; });
	},
  getSelectListStyle: (value, arr, isObj=false) => {
    let selectListStyle = { position: 'relative' };
    let selected = false;
    // if(isObj) {
    //   selected = arr.find(function(v, index) { return index === value });
    // } else {
    //   selected = arr.includes(value);
    // }
    
    if(value){
      selected = true;
    }

    selectListStyle.top = (selected) ? '0px' : '-56px';
    selectListStyle = {};
    return selectListStyle;
  }
};

