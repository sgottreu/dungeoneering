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
	}
};