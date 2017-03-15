var TileOptions = [
  {label: 'floor', id:'t1', overlay: false, entrance: false, exit: false},
  {label: 'stairs', id:'t2', overlay: false, entrance: false, exit: false},
  {label: 'gloop', id:'t5', overlay: false, entrance: false, exit: false},
  {label: 'spiky-pit', id:'t6', overlay: false, entrance: false, exit: false},
  {label: 'gravel', id:'t6a', overlay: false, entrance: false, exit: false},
  {label: 'entry', id:'t7', overlay: false, entrance: true, exit: false},
  {label: 'exit', id:'t8', overlay: false, entrance: false, exit: true},

  {label: 'portcullus_ew', id:'t10', overlay: false, entrance: false, exit: false, size: {width:1, height: 1} },
  {label: 'portcullus_ns', id:'t11', overlay: false, entrance: false, exit: false, size: {width:1, height: 1} },
  {label: 'chest_brick', id: 't9', overlay: false, entrance: false, exit: false, chest: true},
  {label: 'chest_gravel', id: 't9a', overlay: false, entrance: false, exit: false, chest: true},
  {label: 'door_ew', id:'t12', overlay: false, entrance: false, exit: false},
  {label: 'door_ns', id:'t13', overlay: false, entrance: false, exit: false},
];


export default TileOptions;