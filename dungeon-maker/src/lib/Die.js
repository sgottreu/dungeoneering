export var Die = [
  { label : 'd4', num: 4},
  { label : 'd6', num: 6},
  { label : 'd8', num: 8},
  { label : 'd10', num: 10},
  { label : 'd12', num: 12},
  { label : 'd20', num: 20}
];

export var DieRoll = (uBound) => {
  let rolls = [];
  
  for( var x=0;x<5;x++){
    rolls.push( ( Math.floor( Math.random() * uBound ) ) );
  }
  let median = Math.floor(findMedian(rolls));

  return median;
}

function findMedian(data) {

    // extract the .values field and sort the resulting array
    data.sort(function(a, b) {
        return a - b;
    });

    var middle = Math.floor((data.length - 1) / 2); // NB: operator precedence
    if (data.length % 2) {
        return data[middle];
    } else {
        return Math.floor( (data[middle] + data[middle + 1]) / 2.0 );
    }
}