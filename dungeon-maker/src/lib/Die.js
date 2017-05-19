export var Die = 
{
    types: [
    { label : 'd4', num: 4},
    { label : 'd6', num: 6},
    { label : 'd8', num: 8},
    { label : 'd10', num: 10},
    { label : 'd12', num: 12},
    { label : 'd20', num: 20}
    ],

    dieRoll: (uBound, rnd=[]) => {
        let rolls = [];
        let len = (rnd.length == 0) ? 5 : rnd.length;
        for( var x=0;x<len;x++){
            let random = (rnd[x] !== undefined) ? rnd[x] : Die.getRandomRoll();
            rolls.push( ( Math.floor( random * uBound ) ) );
        }
        let median = Math.floor(Die.findMedian(rolls));

        return median;
    },

    getRandomRoll: () => {
        return Math.random();
    },

    findMedian: (data) => {

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
};