let host;
if(process !== undefined && process.env !== undefined && process.env.NODE_ENV === 'development'){
  host = 'http://localhost:4000';
} else {
  host = 'https://dungeoneering.herokuapp.com';
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
  toProperCase: function (txt) {
      return txt.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  },
  moveArray: function(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
  },
  multiLineHtml: function(arrHtml){
    return arrHtml.join('<br/>');
  },
  getSelectListStyle: (value, arr, isObj=false) => {
    let selectListStyle = { position: 'relative' };
    let selected = false;
    
    if(value){
      selected = true;
    }

    selectListStyle.top = (selected) ? '0px' : '-56px';
    selectListStyle = {};
    return selectListStyle;
  },
  addField: ( obj, field, value ) =>
  {
    // split the field into tokens
    var tokens = field.split( '.' );

    // if there's more than one token, this field is an object
    if( tokens.length > 1 )
    {
        var subObj = tokens[0];

        // define the object
        if( obj[ subObj ] === undefined ) obj[ subObj ] = {};

        // call addfield again on the embedded object
        var firstDot = field.indexOf( '.' );
        Variables.addField( obj[ subObj ], field.substr( firstDot + 1 ), value );

    }
    else
    {
        // no embedded objects, just field assignment
        obj[ field ] = value;
    }
    return obj;
  }
};

